import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
// 1. react-native-safe-area-context에서 SafeAreaProvider를 import 합니다.
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

const RootLayoutNav = () => {
    const { isLoggedIn, isLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;
        
        const inAuthGroup = segments.length > 0 && (segments[0] === 'login' || segments[0] === 'register');

        if (!isLoggedIn && !inAuthGroup) {
            router.replace('/login');
        } else if (isLoggedIn && inAuthGroup) {
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
    // 2. AuthProvider의 바깥쪽을 <SafeAreaProvider>로 감싸줍니다.
    // 이렇게 하면 앱의 모든 화면이 '안전 영역' 정보를 올바르게 계산할 수 있게 됩니다.
    <SafeAreaProvider>
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    </SafeAreaProvider>
  );
}
