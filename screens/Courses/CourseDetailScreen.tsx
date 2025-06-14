import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { CourseStackParamList } from '../../navigation/CourseNavigator';

const { height: screenHeight } = Dimensions.get('window');

// 임시 데이터
const DUMMY_COURSE_DETAIL = {
    id: '1',
    title: '가족과 여행하기 좋은 힐링 코스',
    subtitle: '온멜로 → 방화수류정 → 수원전통문화관',
    places: [
        { name: '온멜로 1호점', address: '수원시 팔달구 화서문로32번길 4 2층', time: '도보 14분 · 거리 약 1km', coordinate: { latitude: 37.289, longitude: 127.016 } },
        { name: '방화수류정', address: '수원시 팔달구 수원천로392번길 44-6', coordinate: { latitude: 37.290, longitude: 127.018 } },
    ]
}

type CourseDetailRouteProp = RouteProp<CourseStackParamList, 'CourseDetailScreen'>;

export default function CourseDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<CourseDetailRouteProp>();
<<<<<<< Updated upstream
  const { courseId } = route.params; 

  // TODO: 나중에는 courseId를 이용해 서버에서 데이터를 가져옵니다.
  const course = DUMMY_COURSE_DETAIL;
=======
  
  // route.params가 없는 초기 렌더링 상태를 고려하여 courseId를 안전하게 가져옵니다.
  const { courseId } = route.params || {};

  // courseId가 없을 경우를 대비합니다.
  const course = useMemo(() => courseId ? courseDetailsMap.get(courseId) : undefined, [courseId]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // 데이터 원본을 기준으로 모든 상태를 동기화하는 함수
  const refreshStates = useCallback(() => {
    if (courseId) {
      const currentCourse = courseDetailsMap.get(courseId);
      if (currentCourse) {
        setIsSaved(savedCourses.some(c => c.id === courseId));
        setLikeCount(currentCourse.likes);
      }
    }
  }, [courseId]);

  // 화면이 보일 때마다 상태를 동기화합니다.
  useFocusEffect(refreshStates);

  const handleToggleSave = () => {
    if (course) {
      toggleSaveCourse(course);
      // [핵심 수정] UI를 수동으로 변경하는 대신, 데이터 원본을 다시 읽어 상태를 동기화합니다.
      refreshStates(); 
    }
  };

  const handleToggleLike = () => {
    if (course) {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1);
      // 임시로 데이터 객체를 직접 수정하여 좋아요 수를 반영합니다.
      course.likes = newIsLiked ? course.likes + 1 : course.likes - 1;
    }
  };

  const handleDelete = () => {
    if (course) {
      deleteCourse(courseId);
      setDeleteModalVisible(false);
      navigation.goBack();
      Alert.alert("코스가 삭제되었습니다.");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={handleToggleSave} style={styles.headerButton}>
            <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleLike} style={styles.headerButton}>
            <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color="white" />
          </TouchableOpacity>
          {course?.isMyCourse && (
            <TouchableOpacity onPress={() => setDeleteModalVisible(true)} style={styles.headerButton}>
              <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      ),
    });
  }, [navigation, isLiked, isSaved, course]);

  if (!course) {
    return (
      <SafeAreaView style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>코스 정보를 불러올 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const coordinates = course.places.map(p => p.coordinate);
>>>>>>> Stashed changes

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{course.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: course.places[0].coordinate.latitude,
          longitude: course.places[0].coordinate.longitude,
          latitudeDelta: 0.005, 
          longitudeDelta:0.005,
        }}
      >
        {course.places.map((place, index) => (
            <Marker key={index} coordinate={place.coordinate} title={place.name} />
        ))}
        <Polyline
          coordinates={course.places.map(p => p.coordinate)}
          strokeColor="#007AFF"
          strokeWidth={3}
        />
      </MapView>

      <ScrollView style={styles.card}>
        <Text style={styles.courseTitle}>📍 {course.title}</Text>
        <Text style={styles.courseSub}>{course.subtitle}</Text>

        <View style={styles.timeline}>
          {course.places.map((place, index) => (
             <View key={index} style={styles.timelineItem}>
                {index === 0 && <Text style={styles.timelineStart}>Start!</Text>}
                {place.time && <Text style={styles.walkingInfo}>{place.time}</Text>}
                <Text style={styles.placeTitle}>{place.name}</Text>
                <Text style={styles.placeAddress}>{place.address}</Text>
             </View>
          ))}
<<<<<<< Updated upstream
        </View>
      </ScrollView>
=======
        </MapView>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.subtitle}>{course.subtitle}</Text>
          <Text style={styles.description}>{course.description}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.author}>by {course.author}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="heart" size={16} color="#FF3B30" style={{ marginRight: 4 }} />
              <Text style={styles.likes}>{likeCount}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <Text style={styles.listTitle}>포함된 장소</Text>
          <View style={styles.placeListContainer}>
            {course.places.map((place, index) => (
              <React.Fragment key={place.id}>
                {index > 0 && <View style={styles.pathInfo}><Text style={styles.pathText}>{place.time || '15분'}</Text></View>}
                <View style={styles.placeItem}>
                  <View style={styles.placeNumber}><Text style={styles.placeNumberText}>{index + 1}</Text></View>
                  <View>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text style={styles.placeAddress}>{place.address}</Text>
                  </View>
                </View>
              </React.Fragment>
            ))}
          </View>
          {course.isMyCourse && (
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => navigation.navigate('CourseCreateScreen', { courseId: course.id })}
            >
              <Text style={styles.editButtonText}>이 코스 수정하기</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
       <Modal animationType="fade" transparent={true} visible={deleteModalVisible} onRequestClose={() => setDeleteModalVisible(false)} >
         <View style={styles.modalContainer}>
           <View style={styles.modalContent}>
             <Text style={styles.modalTitle}>코스 삭제</Text>
             <Text style={styles.modalMessage}>정말로 이 코스를 삭제하시겠어요? 삭제된 코스는 복구할 수 없어요.</Text>
             <View style={styles.modalActions}>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setDeleteModalVisible(false)}>
                    <Text style={styles.cancelButtonText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={handleDelete}>
                    <Text style={styles.confirmButtonText}>삭제</Text>
                </TouchableOpacity>
             </View>
           </View>
         </View>
       </Modal>
>>>>>>> Stashed changes
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 60, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#EAEAEA', paddingTop: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginHorizontal: 8, flex: 1, textAlign: 'center' },
  map: { width: '100%', height: screenHeight * 0.4 },
  card: { flex: 1, backgroundColor: '#f9f9f9', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 5 },
  courseTitle: { color: '#333', fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  courseSub: { color: '#666', fontSize: 14, marginBottom: 20 },
  timeline: { borderLeftWidth: 2, borderLeftColor: '#E0E0E0', paddingLeft: 20, },
  timelineItem: { marginBottom: 24, position: 'relative', paddingLeft: 10 },
  timelineStart: { color: '#007AFF', fontWeight: 'bold', fontSize: 14, marginBottom: 4, position: 'absolute', top: -20, left: 10 },
  walkingInfo: { color: '#999', fontSize: 12, marginBottom: 6 },
  placeTitle: { color: '#222', fontSize: 16, fontWeight: 'bold' },
  placeAddress: { color: '#666', fontSize: 13 },
});
