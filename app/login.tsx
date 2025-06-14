import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router'; // ⭐️ 회원가입 화면으로 이동하기 위해 Link를 import 합니다.
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
  try {
    const response = await fetch('http://3.35.27.124:8080/api/members/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      const { token, email: userEmail } = result;

      if (!token) {
        Alert.alert('로그인 실패', '서버로부터 토큰을 받지 못했습니다.');
        return;
      }

      await AsyncStorage.setItem('jwt', token);
      await AsyncStorage.setItem('userEmail', userEmail || email);

      Alert.alert('로그인 성공', `${userEmail || email}님 환영합니다.`);
      console.log('로그인 성공:', result);

      router.replace('/(tabs)/Courses');
    } else {
      const message = result.message || '이메일 또는 비밀번호 오류';
      Alert.alert('로그인 실패', message);
      console.warn('로그인 실패:', result);
    }
  } catch (err) {
    console.error('로그인 오류:', err);
    Alert.alert('오류', '서버에 연결할 수 없습니다.');
  }
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text style={styles.title}>느린행궁</Text>
            <Text style={styles.subtitle}>로그인하고 행궁동을 즐겨보세요</Text>
            <TextInput
                style={styles.input}
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
                {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.buttonText}>로그인</Text>
                )}
            </TouchableOpacity>

            {/* ⭐️ 회원가입으로 이동하는 링크를 추가합니다. */}
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>아직 회원이 아니신가요? </Text>
                <Link href="/register" asChild>
                    <TouchableOpacity>
                        <Text style={styles.link}>회원가입</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
};

// ⭐️ 스타일을 추가/수정합니다.
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FFFFFF' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2F80ED', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#828282', textAlign: 'center', marginBottom: 40 },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#F2F2F7',
    fontSize: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#2F80ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#828282',
  },
  link: {
    fontSize: 16,
    color: '#2F80ED',
    fontWeight: 'bold',
  },
});

export default LoginScreen;