// app/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="compass-outline" size={60} color="#007AFF" style={styles.logo} />
      <Text style={styles.title}>Locathon 프로젝트 시작</Text>
      <Text style={styles.subtitle}>아래 메뉴를 통해 각 화면으로 이동할 수 있습니다.</Text>

      <View style={styles.menuContainer}>
        <Link href="/mypage" asChild>
          <TouchableOpacity style={styles.menuButton}>
            <View style={styles.iconWrapper}>
              <Ionicons name="person-circle-outline" size={24} color="white" />
            </View>
            <Text style={styles.menuButtonText}>마이페이지 가기</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/login" asChild>
          <TouchableOpacity style={[styles.menuButton, styles.secondaryButton]}>
            <View style={styles.iconWrapper}>
              <Ionicons name="log-in-outline" size={24} color="#007AFF" />
            </View>
            <Text style={[styles.menuButtonText, styles.secondaryButtonText]}>로그인 화면</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/register" asChild>
          <TouchableOpacity style={[styles.menuButton, styles.secondaryButton]}>
            <View style={styles.iconWrapper}>
              <Ionicons name="create-outline" size={24} color="#007AFF" />
            </View>
            <Text style={[styles.menuButtonText, styles.secondaryButtonText]}>회원가입 화면</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/places" asChild>
          <TouchableOpacity style={[styles.menuButton, styles.tertiaryButton]}>
            <View style={styles.iconWrapper}>
              <Ionicons name="location-outline" size={24} color="#34C759" />
            </View>
            <Text style={[styles.menuButtonText, styles.tertiaryButtonText]}>장소 목록 보기 (팀원 구현)</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/business" asChild>
          <TouchableOpacity style={[styles.menuButton, styles.tertiaryButton]}>
            <View style={styles.iconWrapper}>
              <Ionicons name="storefront-outline" size={24} color="#34C759" />
            </View>
            <Text style={[styles.menuButtonText, styles.tertiaryButtonText]}>소상공인 기능 (팀원 구현)</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 30,
  },
  menuContainer: {
    width: '100%',
  },
  menuButton: {
    flexDirection: 'row', // 아이콘과 텍스트를 가로로 배열
    alignItems: 'center',  // 세로 중앙 정렬
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20, // 양쪽 여백 동일하게
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  iconWrapper: {
    // 아이콘을 감싸는 View를 추가하여 아이콘과 텍스트 사이 간격 확보
    marginRight: 12, // 아이콘과 텍스트 사이 간격
  },
  menuButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    // textAlign: 'center', // 아이콘이 왼쪽에 있으므로, 텍스트는 flex:1로 남은 공간 차지
    flex: 1, // 텍스트가 남은 공간을 채우도록
  },
  // menuIcon 스타일은 iconWrapper로 대체 또는 조정
  // menuIcon: {
  //   marginRight: 10,
  //   // position: 'absolute', // 아이콘 위치 고정 제거
  //   // left: 20,
  // },
  secondaryButton: {
    backgroundColor: '#e9ecef',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  tertiaryButton: {
    backgroundColor: '#e6ffed',
  },
  tertiaryButtonText: {
    color: '#28a745',
  },
});
