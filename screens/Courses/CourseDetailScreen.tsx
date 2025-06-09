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
  const { courseId } = route.params; 

  // TODO: 나중에는 courseId를 이용해 서버에서 데이터를 가져옵니다.
  const course = DUMMY_COURSE_DETAIL;

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
        </View>
      </ScrollView>
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
