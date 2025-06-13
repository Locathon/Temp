import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 임시 가게 데이터 (추후 API 연동)
const DUMMY_STORE_DATA = {
  name: '온멜로',
  image: require('../../assets/images/onmelo_interior.jpg'), // 로컬 이미지 사용
  address: '수원시 팔달구 신풍로63번길 3-1 1층',
  phone: '0507-1335-9715',
  stats: {
    visitors: '1,234',
    likes: 456,
    reviews: 89,
  },
};

export default function StoreHomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>내 가게</Text>
        </View>

        {/* 가게 정보 카드 */}
        <View style={styles.card}>
            <View style={styles.storeHeader}>
                <Text style={styles.storeName}>{DUMMY_STORE_DATA.name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EditStore')}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="#828282" />
                </TouchableOpacity>
            </View>
            <Image source={DUMMY_STORE_DATA.image} style={styles.storeImage} />
            <View style={styles.storeInfo}>
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={16} color="#828282" />
                    <Text style={styles.infoText}>{DUMMY_STORE_DATA.address}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="call-outline" size={16} color="#828282" />
                    <Text style={styles.infoText}>{DUMMY_STORE_DATA.phone}</Text>
                </View>
            </View>
        </View>

        {/* 가게 현황 통계 */}
        <View style={styles.statsContainer}>
            <View style={styles.statBox}>
                <Text style={styles.statValue}>{DUMMY_STORE_DATA.stats.visitors}</Text>
                <Text style={styles.statLabel}>방문자</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statValue}>{DUMMY_STORE_DATA.stats.likes}</Text>
                <Text style={styles.statLabel}>관심</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statValue}>{DUMMY_STORE_DATA.stats.reviews}</Text>
                <Text style={styles.statLabel}>후기</Text>
            </View>
        </View>

        {/* 기능 버튼 메뉴 */}
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('NewPostScreen')}>
                <Ionicons name="create-outline" size={28} color="#2F80ED" />
                <Text style={styles.menuButtonText}>새 소식 작성</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('QASetup')}>
                <Ionicons name="help-circle-outline" size={28} color="#2F80ED" />
                <Text style={styles.menuButtonText}>자동응답 Q&A 설정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('GenerateMarketing')}>
                <Ionicons name="megaphone-outline" size={28} color="#2F80ED" />
                <Text style={styles.menuButtonText}>마케팅 문구 생성</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  storeImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 16,
  },
  storeInfo: {},
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4F4F4F'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F80ED',
  },
  statLabel: {
    fontSize: 14,
    color: '#828282',
    marginTop: 4,
  },
  menuContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  menuButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
    color: '#333333'
  },
});
