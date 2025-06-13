import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

const RootLayoutNav = () => {
    const { isLoggedIn, isLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;
        
        // 현재 경로가 로그인/회원가입 관련 화면인지 확인합니다.
        // segments[0]는 현재 URL의 첫 번째 부분을 나타냅니다. (예: 'login')
        const inAuthGroup = segments.length > 0 && (segments[0] === 'login' || segments[0] === 'register');

        if (!isLoggedIn && !inAuthGroup) {
            // 로그인 상태가 아니고, 현재 인증 화면에 있지도 않다면 로그인 화면으로 보냅니다.
            router.replace('/login');
        } else if (isLoggedIn && inAuthGroup) {
            // 로그인 상태인데, 여전히 인증 화면에 있다면 메인 화면으로 보냅니다.
            // ('/'는 app/index.tsx를 가리킵니다.)
            router.replace('/');
        }
    }, [isLoggedIn, isLoading, segments]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    
    // [오류 수정]
    // <Stack> 내부에 <Stack.Screen>을 명시적으로 선언하여
    // Expo Router와 TypeScript가 라우트 목록을 정확하게 인지하도록 합니다.
    // 이렇게 하면 'never' 타입 오류가 해결됩니다.
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
        </Stack>
    );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
