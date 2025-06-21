import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const MyCollectionScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#121212" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>나의 찜 리스트</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 메인 컨텐츠 (두 개의 버튼) */}
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {/* 장소 버튼 */}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('my-places')}
          >
            <Ionicons name="location-outline" size={48} color="#48C8FF" />
            <Text style={styles.menuButtonText}>내가 찜한 장소</Text>
          </TouchableOpacity>

          {/* 코스 버튼 */}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('my-courses')}
          >
            <Ionicons name="map-outline" size={48} color="#48C8FF" />
            <Text style={styles.menuButtonText}>내가 찜한 코스</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    paddingHorizontal: 16,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  menuButton: {
    width: '42%', // 요청하신 40%와 유사하게 설정
    aspectRatio: 1, // 정사각형으로 만듭니다.
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBEEEF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  menuButtonText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#3A4043',
    fontFamily: 'Pretendard-Medium',
  },
});

export default MyCollectionScreen;
