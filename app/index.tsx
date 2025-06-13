import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import TabNavigator from '../navigation/TabNavigator';
import UserTypeSelectionScreen from '../screens/Auth/UserTypeSelectionScreen';
import LoginScreen from './login';
import RegisterScreen from './register';
// AdminNavigator import는 제거합니다.

// 네비게이션 스택 타입에서 AdminRoot를 제거합니다.
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UserTypeSelection: undefined;
  Tabs: { screen?: string, params?: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isLoggedIn, userType, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // --- 로그인 상태일 때 ---
        <>
          {userType === 'visitor' ? (
            // 사용자 유형을 선택하지 않았다면 '유형 선택' 화면을 보여줍니다.
            <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} />
          ) : (
            // ⭐️ 'admin'을 포함한 모든 인증된 사용자는 메인 탭 화면으로 이동합니다.
            <Stack.Screen name="Tabs" component={TabNavigator} />
          )}
        </>
      ) : (
        // --- 로그아웃 상태일 때 ---
        <>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return <RootNavigator />;
}
