// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext'; // AuthProvider import 경로 확인!

export default function RootLayoutNav() {
  return (
    // 👇 AuthProvider로 전체 Stack 네비게이터를 감싸줍니다.
    <AuthProvider>
      <Stack initialRouteName="index">
        {/* 기본 진입 및 인증 관련 화면 */}
        <Stack.Screen name="index" options={{ title: 'Locathon 홈', headerShown: false }} />
        <Stack.Screen name="login" options={{ title: '로그인' }} />
        <Stack.Screen name="register" options={{ title: '회원가입' }} />

        {/* 마이페이지 및 관련 하위 화면 */}
        <Stack.Screen name="mypage" options={{ title: '마이페이지' }} />
        <Stack.Screen name="edit-profile" options={{ title: '내 정보 수정' }} />
        <Stack.Screen name="my-reviews" options={{ title: '내가 남긴 후기' }} />
        <Stack.Screen name="my-places" options={{ title: '내가 기록한 장소' }} />
        <Stack.Screen name="my-courses" options={{ title: '내가 기록한 코스' }} />

        {/* 설정 및 기타 정적 페이지 */}
        <Stack.Screen name="settings" options={{ title: '앱 설정' }} />
        <Stack.Screen name="account-settings" options={{ title: '계정 관리' }} />
        <Stack.Screen name="terms" options={{ title: '이용약관' }} />
        <Stack.Screen name="privacy" options={{ title: '개인정보 처리방침' }} />
        <Stack.Screen name="guide" options={{ title: '행궁 사용 설명서' }} />

        {/* 팀원 작업 화면 (예시 경로, 실제 파일명과 일치해야 함) */}
        <Stack.Screen name="places" options={{ title: '장소' }} />
        <Stack.Screen name="business" options={{ title: '소상공인' }} />
        
        {/* 동적 경로 선언 (상세 페이지 등) */}
        <Stack.Screen name="place-detail/[id]" options={{ title: '장소 상세' }} />
        <Stack.Screen name="course-detail/[id]" options={{ title: '코스 상세' }} />
      </Stack>
    </AuthProvider>
  );
}

