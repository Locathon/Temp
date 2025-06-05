// contexts/AuthContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userNickname: string | null;
  login: (nickname: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNickname, setUserNickname] = useState<string | null>(null);

  const login = (nickname: string) => {
    setIsLoggedIn(true);
    setUserNickname(nickname);
    // TODO: 실제 앱에서는 여기에 토큰 저장 등의 로직 추가
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserNickname(null);
    // TODO: 실제 앱에서는 여기에 토큰 삭제 등의 로직 추가
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userNickname, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
