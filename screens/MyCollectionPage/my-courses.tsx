import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type MyCourse = {
  id: string;
  title: string;
  placeCount: number;
  tags: string[];
  thumbnail: string;
};

export default function MyCoursesScreen({ navigation, route }: any) {
  const [selectedTab, setSelectedTab] = useState<'place' | 'course'>('place');
  const [places, setPlaces] = useState<MyCourse[]>([]);
  const [courses, setCourses] = useState<MyCourse[]>([]);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then(token => setJwtToken(token))
      .catch(err => console.error('JWT 토큰 불러오기 실패:', err));
  }, []);

  useEffect(() => {
    if (!jwtToken) return;

    axios
      .get('http://3.35.27.124:8080/places', {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then(res => {
        const placesFromApi = Array.isArray(res.data) ? res.data : Array.isArray(res.data.data) ? res.data.data : [];
        const apiPlaces: MyCourse[] = placesFromApi.map((place: any) => ({
          id: place.id.toString(),
          title: place.name ?? '이름 없음',
          placeCount: 1,
          tags: place.tags || ['#로컬추천'],
          thumbnail: place.imageUrls && place.imageUrls.length > 0 ? place.imageUrls[0] : 'https://placehold.co/400x300/CCCCCC/FFFFFF?text=No+Image',
        }));
        setPlaces(apiPlaces);
      })
      .catch(err => {
        console.error('장소 불러오기 실패:', err);
      });

    axios
      .get('http://3.35.27.124:8080/courses', {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then(res => {
        const coursesFromApi = Array.isArray(res.data) ? res.data : Array.isArray(res.data.data) ? res.data.data : [];
        const apiCourses: MyCourse[] = coursesFromApi.map((course: any) => ({
          id: course.id.toString(),
          title: course.name ?? '제목 없음',
          placeCount: course.placeCount ?? 0,
          tags: course.tags || ['#로컬추천'],
          thumbnail: course.imageUrls && course.imageUrls.length > 0 ? course.imageUrls[0] : 'https://placehold.co/400x300/CCCCCC/FFFFFF?text=No+Image',
        }));
        setCourses(apiCourses);
        if (apiCourses.length === 0) {
          setCourses([
            { id: 'temp1', title: '썸탈 때 데이트 코스', placeCount: 3, tags: ['#데이트', '#힐링'], thumbnail: 'https://placehold.co/100x100?text=코스1' },
            { id: 'temp2', title: '가족과 여행하기 좋은 힐링 코스', placeCount: 4, tags: ['#가족', '#여행'], thumbnail: 'https://placehold.co/100x100?text=코스2' },
          ]);
        }
      })
      .catch(err => {
        console.error('코스 불러오기 실패:', err);
      });
  }, [jwtToken]);

  useFocusEffect(
    useCallback(() => {
      const fetchCopiedCourses = async () => {
        try {
          const copied = await AsyncStorage.getItem('copiedCourses');
          const saved = await AsyncStorage.getItem('myCourses');
          if (saved) {
            const parsedSaved = JSON.parse(saved);
            const formattedSaved: MyCourse[] = (Array.isArray(parsedSaved) ? parsedSaved : [parsedSaved]).map((course: any, index: number) => ({
              id: course.id ?? `saved-${Date.now()}-${index}`,
              title: course.title ?? '저장된 코스',
              placeCount: course.placeCount ?? 0,
              tags: course.tags ?? ['#내코스'],
              thumbnail: course.thumbnail ?? 'https://placehold.co/100x100?text=저장됨',
            }));
            setCourses(prev => [...prev, ...formattedSaved]);
          }
        } catch (e) {
          console.error('복사된 코스 불러오기 오류:', e);
        }
      };
      fetchCopiedCourses();
    }, [])
  );

  const renderPlaceItem = ({ item }: { item: MyCourse }) => (
    <TouchableOpacity style={styles.gridCard} onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}>
      <View>
        <Image source={{ uri: item.thumbnail }} style={styles.gridThumbnail} />
        <Ionicons name="heart" size={20} color="#FF6B6B" style={styles.heartIcon} />
      </View>
      <View style={styles.gridContent}>
        <Text style={styles.gridTitle}>{item.title}</Text>
        <Text style={styles.gridSubtitle}>{item.tags.join(', ')}</Text>
        <Text style={styles.gridRating}>5.0 ⭐⭐⭐⭐⭐ <Text style={styles.gridReviewCount}>(34)</Text></Text>
      </View>
    </TouchableOpacity>
  );

  const renderCourseItem = ({ item }: { item: MyCourse }) => (
    <TouchableOpacity style={styles.courseRow} onPress={() => {
      if (item.title === '가족과 여행하기 좋은 힐링 코스') {
        navigation.navigate('MapCourseScreen', { courseId: item.id });
      } else {
        alert('준비 중입니다.');
      }
    }}>
      <Image source={{ uri: item.thumbnail }} style={styles.courseThumbnail} />
      <View style={styles.courseTextContainer}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseAuthor}>유은서</Text>
      </View>
      <Ionicons name="bookmark-outline" size={20} color="#BDBDBD" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}><Ionicons name="arrow-back" size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.headerTitle}>나의 찜 리스트</Text>
        <View style={styles.headerIcon} />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, selectedTab === 'place' && styles.activeTab]} onPress={() => setSelectedTab('place')}>
          <Text style={[styles.tabText, selectedTab === 'place' && styles.activeTabText]}>장소 ({places.length.toString().padStart(2, '0')})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, selectedTab === 'course' && styles.activeTab]} onPress={() => setSelectedTab('course')}>
          <Text style={[styles.tabText, selectedTab === 'course' && styles.activeTabText]}>코스 ({courses.length.toString().padStart(2, '0')})</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        key={selectedTab}
        data={selectedTab === 'place' ? places : courses}
        renderItem={selectedTab === 'place' ? renderPlaceItem : renderCourseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={selectedTab === 'place' ? 2 : 1}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{selectedTab === 'place' ? '찜한 장소가 없습니다.' : '찜한 코스가 없습니다.'}</Text>
            <Text style={styles.emptySubtext}>{selectedTab === 'place' ? '마음에 드는 장소를 찜해보세요!' : '마음에 드는 코스를 찜해보세요!'}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerIcon: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', flex: 1, color: '#222' },
  listContainer: { padding: 16 },
  tabContainer: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 8, backgroundColor: '#F6F6F6', borderRadius: 12, marginHorizontal: 16 },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: 'center', backgroundColor: '#E0E0E0', borderRadius: 12, marginHorizontal: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  activeTab: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 5 },
  tabText: { fontSize: 14, color: '#B0B0B0', fontWeight: '500' },
  activeTabText: { color: '#000000', fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '40%' },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#4F4F4F' },
  emptySubtext: { fontSize: 14, color: '#828282', marginTop: 8 },
  gridCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, margin: 8, overflow: 'hidden', elevation: 2 },
  gridThumbnail: { width: '100%', height: 100, backgroundColor: '#EEE' },
  heartIcon: { position: 'absolute', top: 8, right: 8 },
  gridContent: { padding: 10 },
  gridTitle: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  gridSubtitle: { fontSize: 12, color: '#888', marginVertical: 4 },
  gridRating: { fontSize: 12, color: '#000' },
  gridReviewCount: { color: '#555' },
  courseRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  courseThumbnail: { width: 56, height: 56, borderRadius: 8, marginRight: 12, backgroundColor: '#F2F2F2' },
  courseTextContainer: { flex: 1, justifyContent: 'center' },
  courseTitle: { fontSize: 14, fontWeight: 'bold', color: '#222', marginBottom: 4 },
  courseAuthor: { fontSize: 12, color: '#888' },
});