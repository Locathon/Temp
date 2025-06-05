// app/login.tsx
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext'; // useAuth 훅 import


// 테스트용 관리자 계정 정보
const ADMIN_EMAIL = '123@naver.com';
const ADMIN_PASSWORD = '1234';
const ADMIN_NICKNAME = '관리자_건호';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth(); // AuthContext에서 login 함수 가져오기

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 테스트 계정 확인
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      login(ADMIN_NICKNAME); // Context의 login 함수 호출 (닉네임 전달)
      Alert.alert('로그인 성공', `${ADMIN_NICKNAME}님, 환영합니다!`);
      router.replace('/mypage'); // 로그인 성공 시 마이페이지로 이동
    } else {
      // TODO: 실제 API 연동 시에는 API 응답에 따라 처리
      Alert.alert('로그인 실패', '이메일 또는 비밀번호가 일치하지 않습니다.');
      console.log('로그인 실패:', { email, password });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <TextInput
        style={styles.input}
        placeholder="이메일 주소 (123@naver.com)" // 테스트 계정 힌트
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호 (1234)" // 테스트 계정 힌트
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Link href="/register" style={styles.link}>
          <Text>계정이 없으신가요? 회원가입</Text>
        </Link>
      </View>
      <View style={styles.linkContainer}>
        <Link href="/" style={styles.link}>
          <Text>(임시) 홈으로 돌아가기</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 20,
  },
  link: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default LoginScreen;
