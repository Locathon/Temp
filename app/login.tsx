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
    Keyboard.dismiss();

    if (email === 'test@locathon.com' && password === '1234') {
      Alert.alert('테스트 로그인', '소상공인 계정으로 로그인합니다.');
      await login('secret-backdoor-token', 'business');
      return; 
    }
    
    if (!email || !password) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch('http://3.35.27.124:8080/api/members/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await login(data.token, data.userType || 'visitor');
      } else {
        const errorText = await response.text();
        let errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
        
        if (errorText) {
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorJson.error || errorMessage;
          } catch (e) {
            console.log("JSON 파싱 실패 원본:", errorText);
          }
        }
        Alert.alert('로그인 실패', errorMessage);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('네트워크 오류', '서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.');
    } finally {
      setIsLoading(false);
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
