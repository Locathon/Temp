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
import { useAuth } from '../contexts/AuthContext'; // ⭐️ AuthContext의 useAuth 훅을 가져옵니다.

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    Keyboard.dismiss();

    // ⭐️ [비밀 아이디(뒷길) 추가]
    // 특정 아이디와 비밀번호를 입력하면, 서버 통신 없이 바로 로그인 처리합니다.
    // 소상공인 탭 테스트를 위해 userType을 'business'로 설정합니다.
    if (email === 'test@locathon.com' && password === '1234') {
      Alert.alert('테스트 로그인', '소상공인 계정으로 로그인합니다.');
      await login('secret-backdoor-token', 'business');
      return; // 뒷길로 로그인했으면, 여기서 함수를 종료합니다.
    }
    
    // --- 아래는 일반 사용자를 위한 기존 로그인 로직입니다. ---

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
        </View>
    </TouchableWithoutFeedback>
  );
};

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
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default LoginScreen;
