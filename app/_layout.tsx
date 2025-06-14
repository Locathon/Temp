import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
// 변경점 1: react-native-safe-area-context에서 SafeAreaView를 추가로 import 합니다.
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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
    
    // 변경점 2: 앱의 최상위 네비게이터를 SafeAreaView로 감싸줍니다.
    // 이렇게 하면 Stack 네비게이터 자체가 상단 상태 표시줄을 침범하지 않고
    // 안전한 영역에서부터 렌더링을 시작하게 됩니다.
    return (
        <SafeAreaView style={styles.container}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
            </Stack>
        </SafeAreaView>
    );
}

export default function RootLayout() {
  return (
    // SafeAreaProvider는 이미 올바르게 최상단을 감싸고 있습니다.
    <SafeAreaProvider>
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    </SafeAreaProvider>
  );
}

// 변경점 3: SafeAreaView가 전체 화면을 차지하도록 스타일을 추가합니다.
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
