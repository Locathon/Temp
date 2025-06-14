// C:\Users\mnb09\Desktop\Temp\app\index.tsx

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import TabNavigator from '../navigation/TabNavigator';
import UserTypeSelectionScreen from '../screens/Auth/UserTypeSelectionScreen';

// app/index.tsx는 더 이상 네비게이터가 아닙니다.
// 로그인 후 보여줄 화면을 결정하는 단순한 컴포넌트입니다.
export default function Index() {
  const { userType } = useAuth();

  // 백엔드로부터 받은 userType이 아직 visitor이면 유형 선택 화면을 보여줍니다.
  if (userType === 'visitor') {
    return <UserTypeSelectionScreen />;
  }

  // userType이 resident 또는 business_owner 등으로 설정되었다면,
  // 메인 탭 네비게이터를 보여줍니다.
  return <TabNavigator />;
}
