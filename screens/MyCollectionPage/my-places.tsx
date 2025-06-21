import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// 장소 데이터 타입을 피그마 디자인에 맞춰 수정합니다.
type MyPlace = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  thumbnail: any; // require()의 반환 타입을 위해 any로 설정
};

// [핵심 수정] 데이터를 로컬 이미지 경로로 변경하고, 평점/리뷰 수를 추가합니다.
const DUMMY_MY_PLACES: MyPlace[] = [
  {
    id: 'place1',
    name: '레몬트리',
    category: '디저트카페',
    rating: 5.0,
    reviewCount: 34,
    thumbnail: require('../../assets/images/desserts/cafe_profile.png'),
  },
  {
    id: 'place2',
    name: '온멜로',
    category: '음식점',
    rating: 4.8,
    reviewCount: 72,
    thumbnail: require('../../assets/images/onmelo_interior.jpg'),
  },
  {
    id: 'place3',
    name: '수원시립아이파크미술관',
    category: '문화공간',
    rating: 4.6,
    reviewCount: 102,
    thumbnail: require('../../assets/images/ipark_museum.jpg'),
  },
  {
    id: 'place4',
    name: '방화수류정',
    category: '공원',
    rating: 4.9,
    reviewCount: 580,
    thumbnail: require('../../assets/images/banghwasuryujeong.jpg'),
  },
];

// 별점 표시를 위한 헬퍼 컴포넌트
const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Ionicons
        key={i}
        name="star"
        size={12}
        color={i <= rating ? '#FFBB29' : '#DCE2E4'}
      />
    );
  }
  return <View style={styles.starContainer}>{stars}</View>;
};

export default function MyPlacesScreen() {
  const navigation = useNavigation<any>();

  // [핵심 수정] 카드 UI를 피그마 디자인에 맞춰 재구성합니다.
  const renderPlaceItem = ({ item }: { item: MyPlace }) => (
    <TouchableOpacity 
      style={styles.cardWrapper}
      // [핵심 수정] 클릭 시 PlaceDetailScreen으로 placeId를 전달하며 이동합니다.
      onPress={() => navigation.navigate('PlaceDetail', { id: item.id })}
    >
      <View style={styles.card}>
        <Image source={item.thumbnail} style={styles.thumbnail} />
        <View style={styles.heartIconContainer}>
          <Ionicons name="heart" size={18} color="#F15140" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingNumber}>{item.rating.toFixed(1)}</Text>
            <StarRating rating={item.rating} />
            <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#121212" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>나의 찜 리스트</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 장소/코스 탭 */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabButton, styles.tabButtonActive]}>
          <Text style={[styles.tabText, styles.tabTextActive]}>장소 ({DUMMY_MY_PLACES.length})</Text>
        </TouchableOpacity>
      </View>
      
      {/* 장소 목록 */}
      <FlatList
        data={DUMMY_MY_PLACES}
        renderItem={renderPlaceItem}
        keyExtractor={item => item.id}
        numColumns={2} // [핵심 수정] 2열 그리드로 설정
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>아직 찜한 장소가 없어요.</Text>
            </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FEFEFE' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    height: 44,
    backgroundColor: '#FEFEFE',
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
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#EBEEEF',
    borderRadius: 100,
    padding: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 100,
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: '#BBC6CA',
    fontFamily: 'Pretendard-Regular',
  },
  tabTextActive: {
    color: '#3A4043',
    fontWeight: '500',
    fontFamily: 'Pretendard-Medium',
  },
  listContainer: { 
    paddingHorizontal: 10,
  },
  cardWrapper: {
    flex: 1 / 2,
    padding: 6,
  },
  card: {
    backgroundColor: '#FEFEFE', 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCD4D8',
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 112,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: { 
    fontSize: 14, 
    fontWeight: '500',
    color: '#121212',
    fontFamily: 'Pretendard-Medium',
    marginBottom: 2,
  },
  cardCategory: {
    fontSize: 12, 
    color: '#7E8B91',
    fontFamily: 'Pretendard-Regular',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starContainer: {
    flexDirection: 'row',
  },
  ratingNumber: {
    fontSize: 12,
    color: '#7E8B91',
    fontFamily: 'Pretendard-Regular',
  },
  reviewCount: {
    fontSize: 12,
    color: '#7E8B91',
    fontFamily: 'Pretendard-Regular',
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: '50%' 
  },
  emptyText: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#4F4F4F' 
  },
});
