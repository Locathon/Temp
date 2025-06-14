// C:\Users\mnb09\Desktop\Temp\contexts\AuthContext.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

// 백엔드 API의 Role('RESIDENT', 'BUSINESS_OWNER')과 프론트엔드 타입을 맞춥니다.
type UserType = 'resident' | 'business_owner' | 'admin' | 'visitor';

interface AuthContextType {
  isLoggedIn: boolean;
  userType: UserType;
  isLoading: boolean;
  login: (jwt: string, type: UserType) => Promise<void>;
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
  // 백엔드 API 명세에 따라 'business' 대신 'business_owner'를 사용합니다.
  const [userType, setUserType] = useState<UserType>('visitor'); 
  const [isLoading, setIsLoading] = useState(true);

  // [핵심 수정] 앱 시작 시 자동 로그인 로직을 완전히 제거합니다.
  useEffect(() => {
    // 앱이 로드되었음을 알리기만 하고, 아무것도 하지 않아 로딩 화면이 사라지고
    // isLoggedIn 상태는 false로 유지됩니다.
    setIsLoading(false);
  }, []);

  const login = async (jwt: string, type: UserType) => {
    try {
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
    // UserTypeSelectionScreen에서 사용될 함수는 그대로 둡니다.
    // 'business'를 'business_owner'로 수정합니다.
    if (type === 'business_owner' || type === 'resident') {
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
