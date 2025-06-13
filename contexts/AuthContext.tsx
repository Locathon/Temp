import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

// ⭐️ 사용자 타입 정의에 'admin'만 추가합니다.
type UserType = 'resident' | 'business' | 'visitor' | 'admin';

// 컨텍스트가 관리할 상태의 타입 정의 (이전과 동일)
interface AuthContextType {
  isLoggedIn: boolean;
  userType: UserType;
  isLoading: boolean;
  login: (jwt: string, type?: UserType) => Promise<void>;
  logout: () => Promise<void>;
  selectUserType: (type: UserType) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType>('visitor');
  const [isLoading, setIsLoading] = useState(true);

  // 앱 시작 시 AsyncStorage에서 로그인 정보 확인 (로직 변경 없음)
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let storedUserType;
      try {
        userToken = await AsyncStorage.getItem('jwt');
        // ⭐️ 백엔드 로그인 응답에 따라 userType이 'admin'으로 저장될 수 있습니다.
        storedUserType = await AsyncStorage.getItem('userType') as UserType;
      } catch (e) {
        console.error("AsyncStorage에서 토큰을 읽어오는데 실패했습니다.", e);
      }

      if (userToken) {
        setIsLoggedIn(true);
        if(storedUserType) {
            setUserType(storedUserType);
        }
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  // 로그인/로그아웃/타입선택 함수 (로직 변경 없음)
  const login = async (jwt: string, type: UserType = 'visitor') => {
    try {
      // ⭐️ 로그인 시 백엔드가 준 userType(예: 'admin')을 저장하게 됩니다.
      await AsyncStorage.setItem('jwt', jwt);
      await AsyncStorage.setItem('userType', type);
      setIsLoggedIn(true);
      setUserType(type);
    } catch (e) {
      console.error("AsyncStorage에 토큰 저장 실패", e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('jwt');
      await AsyncStorage.removeItem('userType');
      setIsLoggedIn(false);
      setUserType('visitor');
    } catch (e) {
        console.error("AsyncStorage에서 토큰 삭제 실패", e);
    }
  };

  const selectUserType = async (type: UserType) => {
    if (type !== 'visitor') {
        try {
            await AsyncStorage.setItem('userType', type);
            setUserType(type);
        } catch (e) {
            console.error("AsyncStorage에 사용자 유형 저장 실패", e);
        }
    }
  };

  const value = {
    isLoggedIn,
    userType,
    isLoading,
    login,
    logout,
    selectUserType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
