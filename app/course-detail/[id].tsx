// app/course-detail/[id].tsx
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 임시 데이터 또는 API 호출 함수
const fetchCourseDetails = async (id: string) => {
  console.log(`Fetching details for course ID: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 700));
  // TODO: 실제 API를 호출하여 ID에 해당하는 코스 상세 정보를 가져옵니다.
  if (id === 'c1' || id === '1') { // my-courses.tsx에서 id '1'로 올 수 있음
    return {
      name: '행궁동 감성 사진 코스',
      creatorNickname: '여행가이드수원',
      creatorImageUrl: 'https://placehold.co/40x40/777/FFF?text=USER', // 작성자 프로필 이미지 (임시)
      coverImageUrl: 'https://placehold.co/600x300/B0E0E6/333?text=행궁동+감성코스', // 피그마 참고
      description: '수원 행궁동의 숨겨진 포토 스팟과 아기자기한 카페, 공방들을 둘러보는 감성 충만 도보 코스입니다. 친구, 연인과 함께 아름다운 추억을 만들어보세요. 각 장소마다 특별한 이야기를 담고 있습니다.',
      totalTime: '약 3시간',
      totalDistance: '2.5km', // 피그마에 없지만 추가
      themeTags: ['#사진맛집', '#골목투어', '#카페투어', '#데이트', '#힐링산책'],
      places: [
        { id: 'p1', name: '방화수류정', type: '명소', imageUrl: 'https://placehold.co/100x80/FFE4B5/333?text=장소1', shortDescription: '아름다운 연못과 정자' },
        { id: 'p2', name: '행궁동 공방거리', type: '거리/쇼핑', imageUrl: 'https://placehold.co/100x80/98FB98/333?text=장소2', shortDescription: '개성있는 수공예품' },
        { id: 'p3', name: '느린행궁 카페', type: '카페/맛집', imageUrl: 'https://placehold.co/100x80/ADD8E6/333?text=장소3', shortDescription: '한옥의 정취와 커피' },
        { id: 'p4', name: '화성행궁 후문 돌담길', type: '산책로', imageUrl: 'https://placehold.co/100x80/E6E6FA/333?text=장소4', shortDescription: '고즈넉한 분위기' },
      ],
      // 피그마의 '코스에담기', '코스저장', '리뷰보기' 버튼 기능은 추후 구현
      likeCount: 128, // 피그마에 없지만 추가
    };
  }
  return null;
};

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCourseDetails(id).then(data => {
        if (data) {
          setCourse(data);
        } else {
          Alert.alert("오류", "코스 정보를 불러올 수 없습니다.", [{ text: "확인", onPress: () => router.back() }]);
        }
        setLoading(false);
      });
    } else {
      Alert.alert("오류", "잘못된 접근입니다.", [{ text: "확인", onPress: () => router.back() }]);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <View style={styles.loaderContainer}><ActivityIndicator size="large" color="#007AFF" /></View>;
  }

  if (!course) {
    return (
      <>
        <Stack.Screen options={{ title: '정보 없음' }} />
        <View style={styles.loaderContainer}><Text>코스 정보를 찾을 수 없습니다.</Text></View>
      </>
    );
  }

  const renderPlaceItem = ({ item }: { item: { id: string; name: string; type: string; imageUrl: string; shortDescription: string;} }) => (
    <Link href={{ pathname: '/place-detail/[id]', params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.placeCard}>
        <Image source={{ uri: item.imageUrl }} style={styles.placeImage} />
        <View style={styles.placeTextContainer}>
          <Text style={styles.placeName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.placeType} numberOfLines={1}>{item.type}</Text>
          <Text style={styles.placeShortDescription} numberOfLines={2}>{item.shortDescription}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <>
      <Stack.Screen options={{ title: course.name || '코스 상세' }} />
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
            <Image source={{ uri: course.coverImageUrl }} style={styles.headerImage} />
            <View style={styles.headerOverlay} />
            <View style={styles.headerTextContainer}>
                <Text style={styles.courseTitle}>{course.name}</Text>
                <View style={styles.creatorInfo}>
                    <Image source={{ uri: course.creatorImageUrl}} style={styles.creatorImage} />
                    <Text style={styles.creatorNickname}>{course.creatorNickname}</Text>
                </View>
            </View>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.metaInfoRow}>
            <View style={styles.metaChip}><Ionicons name="time-outline" size={16} color="#4F4F4F" /> <Text style={styles.metaChipText}>{course.totalTime}</Text></View>
            <View style={styles.metaChip}><Ionicons name="walk-outline" size={16} color="#4F4F4F" /> <Text style={styles.metaChipText}>{course.totalDistance}</Text></View>
            <View style={styles.metaChip}><Ionicons name="location-outline" size={16} color="#4F4F4F" /> <Text style={styles.metaChipText}>{course.places.length}개 장소</Text></View>
            <View style={styles.metaChip}><Ionicons name="heart-outline" size={16} color="#4F4F4F" /> <Text style={styles.metaChipText}>{course.likeCount}개</Text></View>
          </View>

          <Text style={styles.sectionTitle}>코스 소개</Text>
          <Text style={styles.description}>{course.description}</Text>

          <View style={styles.actionButtonsBar}>
            {/* TODO: 실제 기능 연결 */}
            <TouchableOpacity style={styles.barButton} onPress={() => Alert.alert("코스 저장", "코스 저장 기능 준비 중")}>
                <Ionicons name="bookmark-outline" size={24} color="#007AFF" />
                <Text style={styles.barButtonText}>코스 저장</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.barButton} onPress={() => Alert.alert("리뷰 보기", "리뷰 보기 기능 준비 중")}>
                <Ionicons name="chatbubbles-outline" size={24} color="#007AFF" />
                <Text style={styles.barButtonText}>리뷰 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.barButton} onPress={() => Alert.alert("공유하기", "공유하기 기능 준비 중")}>
                <Ionicons name="share-social-outline" size={24} color="#007AFF" />
                <Text style={styles.barButtonText}>공유하기</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>포함된 장소</Text>
          {/* TODO: 피그마의 지도 경로 부분은 react-native-maps 등으로 실제 지도 구현 필요 */}
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>[지도 및 경로 표시 영역]</Text>
            <Ionicons name="map-outline" size={50} color="#BDBDBD" />
          </View>

          <FlatList
            data={course.places}
            renderItem={renderPlaceItem}
            keyExtractor={(item) => item.id}
            // horizontal // 피그마 디자인은 세로 목록에 가까움
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.placesListContainer}
            scrollEnabled={false} // 전체 스크롤뷰가 있으므로 내부 스크롤 비활성화
          />
          
          {course.themeTags && course.themeTags.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>코스 테마</Text>
              <View style={styles.tagsContainer}>
                {course.themeTags.map((tag: string, index: number) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
          <TouchableOpacity style={styles.startCourseButton} onPress={() => Alert.alert("코스 시작", "이 코스 따라가기 기능 준비 중")}>
            <Text style={styles.startCourseButtonText}>이 코스 시작하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  headerContainer: { height: 220, position: 'relative' },
  headerImage: { width: '100%', height: '100%' },
  headerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  headerTextContainer: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  courseTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 4 },
  creatorInfo: { flexDirection: 'row', alignItems: 'center' },
  creatorImage: { width: 24, height: 24, borderRadius: 12, marginRight: 8, borderWidth: 1, borderColor: 'white' },
  creatorNickname: { fontSize: 14, color: 'white', fontWeight: '500' },
  
  contentContainer: { paddingBottom: 20 }, // 전체 컨텐츠 패딩
  metaInfoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // 작은 화면에서 줄바꿈
    justifyContent: 'space-between', // 공간 분배
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8, // 칩 간 간격
    marginBottom: 8, // 줄바꿈 시 간격
  },
  metaChipText: { fontSize: 13, marginLeft: 5, color: '#4F4F4F', fontWeight: '500'},
  
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1C1C1E', marginBottom: 12, marginTop: 16, paddingHorizontal: 16, },
  description: { fontSize: 16, lineHeight: 24, color: '#3C3C43', marginBottom: 20, paddingHorizontal: 16, },

  actionButtonsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#E0E0E0',
    marginBottom: 8,
    marginTop: 8,
  },
  barButton: { alignItems: 'center', flex: 1 },
  barButtonText: { fontSize: 12, color: '#007AFF', marginTop: 2, fontWeight: '500' },

  mapPlaceholder: {
    height: 200,
    backgroundColor: '#E9E9EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  mapPlaceholderText: { color: '#8A8A8E', marginBottom: 8 },

  placesListContainer: { paddingHorizontal: 16 },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  placeImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  placeTextContainer: { flex: 1 },
  placeName: { fontSize: 16, fontWeight: '600', color: '#1C1C1E'},
  placeType: { fontSize: 13, color: '#8A8A8E', marginTop: 2 },
  placeShortDescription: { fontSize: 13, color: '#666', marginTop: 4},

  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, marginBottom: 20 },
  tag: { backgroundColor: '#007AFF1A', borderRadius: 15, paddingVertical: 6, paddingHorizontal: 12, marginRight: 8, marginBottom: 8 },
  tagText: { color: '#007AFF', fontSize: 13, fontWeight: '500' },

  startCourseButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
  },
  startCourseButtonText: { color: 'white', fontSize: 17, fontWeight: '600' },
});
