import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

// 네비게이션 타입 정의
type NavigationProp = {
  navigate: (screen: string, params?: any) => void;
};

const UserTypeSelectionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { selectUserType } = useAuth(); // AuthContext에서 함수 가져오기

  // 주민 인증하기 버튼 클릭 시 호출될 함수
  const handleResidentPress = async () => {
    console.log('주민 인증하기 선택');
    await selectUserType('resident'); // 비동기로 처리
  };

  // 소상공인으로 시작하기 버튼 클릭 시 호출될 함수
  const handleBusinessPress = async () => {
    console.log('소상공인으로 시작하기 선택');
    await selectUserType('business');
    navigation.navigate('Tabs', { screen: '소상공인', params: { screen: 'RegisterStore' } });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/splash-icon.png')} // 로고 이미지 경로
          style={styles.logo}
        />
        <Text style={styles.title}>느린행궁에 오신 것을 환영합니다!</Text>
        <Text style={styles.subtitle}>
          어떤 유형으로 행궁동을 즐겨볼까요?{'\n'}주민 인증 시 더 많은 혜택이 기다리고 있어요.
        </Text>

        <TouchableOpacity style={[styles.button, styles.residentButton]} onPress={handleResidentPress}>
          <Ionicons name="person-outline" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>주민 인증하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.businessButton]} onPress={handleBusinessPress}>
          <Ionicons name="storefront-outline" size={24} color="#2F80ED" />
          <Text style={[styles.buttonText, { color: '#2F80ED' }]}>소상공인으로 시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '85%',
    alignItems: 'center',
    paddingBottom: 50,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    color: '#828282',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  residentButton: {
    backgroundColor: '#2F80ED',
  },
  businessButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2F80ED',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default UserTypeSelectionScreen;
