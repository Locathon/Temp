// C:\Users\mnb09\Desktop\Temp\app\login.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../services/api';

const LoginScreen = () => {
  const router = useRouter();
  const { login, loginAsGuest } = useAuth();

  const [email, setEmail] = useState('string');
  const [password, setPassword] = useState('string');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      // 1. 로그인 API를 단 한 번만 호출합니다.
      const loginResponse = await apiClient('/api/members/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      // 2. 백엔드 팀에서 확인해준 'token' 키를 사용하여 토큰을 추출합니다.
      const accessToken = loginResponse.token;
      
      // [핵심 수정] 로그인 응답에서 'role'을 직접 추출합니다.
      // 백엔드 응답에 role이 없다면 기본값 'visitor'를 사용합니다.
      const userType = loginResponse.role?.toLowerCase() || 'visitor';

      if (!accessToken) {
        console.error("Backend login response:", loginResponse);
        throw new Error('응답에 액세스 토큰이 없습니다. 백엔드 응답 구조를 확인해주세요.');
      }
      
      // [핵심 수정] 불필요한 두 번째 API 호출('/api/members/me')을 완전히 삭제합니다.

      // 3. 획득한 토큰과 사용자 타입을 상태 관리자에게 넘겨 로그인을 완료합니다.
      await login(accessToken, userType);

    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

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
    guestButton: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#2F80ED' },
    buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    errorText: { color: 'red', marginVertical: 10, textAlign: 'center' },
    registerText: { color: '#828282', marginTop: 20 },
    registerLink: { color: '#2F80ED', fontWeight: 'bold' },
});

export default LoginScreen;
