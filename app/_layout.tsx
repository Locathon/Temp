import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
      <Stack /*initialRouteName="login"*/ screenOptions={{ headerShown: true ,headerTitle: "행:온"}}>
        <Stack.Screen name="login" options={{ title: '로그인' }} />
        <Stack.Screen name="register" options={{ title: '회원가입' }} />
      </Stack>
  );  
}

