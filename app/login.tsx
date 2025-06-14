// C:\Users\mnb09\Desktop\Temp\app\login.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = () => {
  const router = useRouter();
  const { login, loginAsGuest } = useAuth(); // [핵심 추가] loginAsGuest 함수 가져오기

  const [email, setEmail] = useState('test@locathon.com');
  const [password, setPassword] = useState('1234');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // ... 이전과 동일한 실제 로그인 로직 ...
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const loginResponse = await fetch('http://3.35.27.124:8080/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const loginData = await loginResponse.json();
      if (!loginResponse.ok) { throw new Error(loginData.message || '로그인에 실패했습니다.'); }
      const { accessToken } = loginData.data;
      const userResponse = await fetch('http://3.35.27.124:8080/api/v1/users/me', {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      const userData = await userResponse.json();
      if (!userResponse.ok) { throw new Error(userData.message || '사용자 정보를 가져오는데 실패했습니다.'); }
      const userType = userData.data.role?.toLowerCase() || 'visitor';
      await login(accessToken, userType);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // [핵심 추가] 비회원 둘러보기 버튼 클릭 시 호출될 함수
  const handleGuestLogin = () => {
    loginAsGuest();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/images/splash-icon.png')} style={styles.logo} />
        <Text style={styles.title}>로그인</Text>
        <TextInput style={styles.input} placeholder="이메일" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>로그인</Text>}
        </TouchableOpacity>

        {/* [핵심 추가] 비회원으로 둘러보기 버튼 UI */}
        <TouchableOpacity style={[styles.button, styles.guestButton]} onPress={handleGuestLogin}>
            <Text style={[styles.buttonText, { color: '#2F80ED' }]}>비회원으로 둘러보기</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.registerText}>계정이 없으신가요? <Text style={styles.registerLink}>회원가입</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
    content: { width: '85%', alignItems: 'center' },
    logo: { width: 100, height: 100, marginBottom: 30 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    input: { width: '100%', height: 50, backgroundColor: '#F2F2F7', borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, fontSize: 16 },
    button: { width: '100%', paddingVertical: 15, borderRadius: 12, backgroundColor: '#2F80ED', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    // [핵심 추가] 비회원 버튼 스타일
    guestButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#2F80ED',
    },
    buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    errorText: { color: 'red', marginVertical: 10, textAlign: 'center' },
    registerText: { color: '#828282', marginTop: 20 },
    registerLink: { color: '#2F80ED', fontWeight: 'bold' },
});

export default LoginScreen;
