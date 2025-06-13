import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// ⭐️ SafeAreaView를 import 합니다.
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import TabNavigator from '../navigation/TabNavigator';
import UserTypeSelectionScreen from '../screens/Auth/UserTypeSelectionScreen';
import LoginScreen from './login';
import RegisterScreen from './register';

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
      // ⭐️ 로딩 화면도 안전 영역 안에서 표시되도록 수정합니다.
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          {userType === 'visitor' ? (
            <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} />
          ) : (
            <Stack.Screen name="Tabs" component={TabNavigator} />
          )}
        </>
      ) : (
        <>
          {/* ⭐️ 로그인하지 않았을 때, TabNavigator 대신 LoginScreen을 먼저 보여주도록 순서를 조정할 수 있습니다.
               하지만 현재 _layout.tsx에서 강제 리디렉션을 하고 있으므로 이 순서는 큰 의미가 없습니다. */}
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

// ⭐️ 스타일을 추가합니다.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // 배경색을 지정해주는 것이 좋습니다.
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
