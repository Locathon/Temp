// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayoutNav() {
  return (
    <Stack
      // initialRouteName을 "index"로 명시하거나 생략 (기본값이 index)
      // 이렇게 하면 app/index.tsx가 가장 먼저 실행됩니다.
      initialRouteName="index"
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Locathon 홈', headerShown: false }} // index 화면은 헤더를 숨길 수 있습니다.
      />
      <Stack.Screen
        name="mypage"
        options={{ title: '마이페이지' }}
      />
      <Stack.Screen
        name="login"
        options={{ title: '로그인' }}
      />
      <Stack.Screen
        name="register"
        options={{ title: '회원가입' }}
      />
      {/* TODO: 팀원들이 실제로 사용하는 장소 및 소상공인 화면 경로를 여기에 추가해야 합니다. */}
      {/* 예시: 실제 파일이 app/places.tsx 라면 */}
      <Stack.Screen
        name="places"
        options={{ title: '장소 목록' }}
      />
      <Stack.Screen
        name="business"
        options={{ title: '소상공인' }}
      />
      {/* mapTest 화면은 이제 연결하지 않습니다. */}
      {/* <Stack.Screen name="mapTest" options={{ title: '지도 테스트 (사용 안 함)' }} /> */}
    </Stack>
  );
}
