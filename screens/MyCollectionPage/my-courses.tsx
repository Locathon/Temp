import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// 내가 만든 코스의 타입 정의
type MyCourse = {
  id: string;
  title: string;
  placeCount: number;
  tags: string[];
  thumbnail: string;
};

// 임시 데이터 (나중에 실제 유저 데이터와 연동)
const DUMMY_MY_COURSES: MyCourse[] = [
  {
    id: 'course1',
    title: '행궁동 사진 맛집 코스',
    placeCount: 3,
    tags: ['#인생샷', '#감성카페', '#데이트'],
    thumbnail: 'https://placehold.co/400x300/CCCCCC/FFFFFF?text=Course+1',
  },
  {
    id: 'course2',
    title: '혼자 걷기 좋은 산책길',
    placeCount: 2,
    tags: ['#산책', '#힐링', '#자연'],
    thumbnail: 'https://placehold.co/400x300/AABBCC/FFFFFF?text=Course+2',
  },
];

const DUMMY_MY_PLACES: MyCourse[] = [
  {
    id: 'place1',
    title: '레몬트리',
    placeCount: 1,
    tags: ['#디저트카페'],
    thumbnail: 'https://placehold.co/400x300/FFCC00/000000?text=Place+1',
  },
  {
    id: 'place2',
    title: '감성 포토존',
    placeCount: 1,
    tags: ['#인생샷', '#포토존'],
    thumbnail: 'https://placehold.co/400x300/FF9999/000000?text=Place+2',
  },
];

export default function MyCoursesScreen({ navigation }: any) {
  const [selectedTab, setSelectedTab] = useState<'place' | 'course'>('place');

  const renderPlaceItem = ({ item }: { item: MyCourse }) => (
    <TouchableOpacity style={styles.gridCard}>
      <View>
        <Image source={{ uri: item.thumbnail }} style={styles.gridThumbnail} />
        <Ionicons
          name="heart"
          size={20}
          color="#FF6B6B"
          style={styles.heartIcon}
        />
      </View>
      <View style={styles.gridContent}>
        <Text style={styles.gridTitle}>{item.title}</Text>
        <Text style={styles.gridSubtitle}>디저트카페</Text>
        <Text style={styles.gridRating}>
          5.0 ⭐⭐⭐⭐⭐ <Text style={styles.gridReviewCount}>(34)</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderCourseItem = ({ item }: { item: MyCourse }) => (
    <TouchableOpacity style={styles.rowCard}>
      <Image source={{ uri: item.thumbnail }} style={styles.rowThumbnail} />
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>{item.title}</Text>
        <Text style={styles.rowSubtitle}>유은서</Text>
      </View>
      <Ionicons name="bookmark-outline" size={20} color="#BDBDBD" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'place' && styles.activeTab]}
          onPress={() => setSelectedTab('place')}
        >
          <Text style={[styles.tabText, selectedTab === 'place' && styles.activeTabText]}>
            장소 ({DUMMY_MY_PLACES.length.toString().padStart(2, '0')})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'course' && styles.activeTab]}
          onPress={() => setSelectedTab('course')}
        >
          <Text style={[styles.tabText, selectedTab === 'course' && styles.activeTabText]}>
            코스 ({DUMMY_MY_COURSES.length.toString().padStart(2, '0')})
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        key={selectedTab}
        data={selectedTab === 'place' ? DUMMY_MY_PLACES : DUMMY_MY_COURSES}
        renderItem={selectedTab === 'place' ? renderPlaceItem : renderCourseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={selectedTab === 'place' ? 2 : 1}
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {selectedTab === 'place' ? '찜한 장소가 없습니다.' : '찜한 코스가 없습니다.'}
                </Text>
                <Text style={styles.emptySubtext}>
                  {selectedTab === 'place'
                    ? '마음에 드는 장소를 찜해보세요!'
                    : '마음에 드는 코스를 찜해보세요!'}
                </Text>
            </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  listContainer: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3, },
  thumbnail: { width: '100%', height: 150, borderTopLeftRadius: 12, borderTopRightRadius: 12, backgroundColor: '#F2F2F7', },
  cardContent: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardSubtitle: { fontSize: 14, color: '#828282', marginTop: 4 },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  tag: { backgroundColor: '#F2F2F7', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8, marginBottom: 8 },
  tagText: { color: '#4F4F4F', fontSize: 12 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '40%' },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#4F4F4F' },
  emptySubtext: { fontSize: 14, color: '#828282', marginTop: 8 },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    marginHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  tabText: {
    fontSize: 14,
    color: '#B0B0B0',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rowThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F2F2F7',
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  rowSubtitle: {
    fontSize: 13,
    color: '#828282',
  },
  gridCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  gridThumbnail: {
    width: '100%',
    height: 100,
    backgroundColor: '#EEE',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  gridContent: {
    padding: 10,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  gridSubtitle: {
    fontSize: 12,
    color: '#888',
    marginVertical: 4,
  },
  gridRating: {
    fontSize: 12,
    color: '#000',
  },
  gridReviewCount: {
    color: '#555',
  },
});
