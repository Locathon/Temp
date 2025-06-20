import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// 내가 남긴 후기 화면 (임시)
export default function MyReviewsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#121212" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내가 남긴 후기</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 준비 중 안내 */}
      <View style={styles.container}>
        <Ionicons name="construct-outline" size={64} color="#A8B5BB" />
        <Text style={styles.messageText}>준비 중인 기능입니다.</Text>
        <Text style={styles.subMessageText}>멋진 후기 기능을 만들고 있어요!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEEEF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#121212',
    fontFamily: 'Pretendard-Regular',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  messageText: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: '600',
    color: '#3A4043',
    fontFamily: 'Pretendard-SemiBold',
  },
  subMessageText: {
    marginTop: 8,
    fontSize: 16,
    color: '#93A2A9',
    fontFamily: 'Pretendard-Regular',
  }
});
