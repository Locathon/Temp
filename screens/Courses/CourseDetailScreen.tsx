import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Callout } from 'react-native-maps';

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

const DUMMY_COURSE_DETAIL = [
  {
    id: '1',
    title: '행궁동 맛집 투어',
    subtitle: '운멜로 → 방화수류정 → 수원전통문화관',
    places: [
      {
        name: '운멜로 1호점',
        address: '수원시 팔달구 화서문로32번길 4 2층',
        coordinate: { latitude: 37.289, longitude: 127.016 },
      },
      {
        name: '방화수류정',
        address: '수원시 팔달구 수원천로392번길 44-6',
        time: '도보 8분 · 거리 약 600m',
        coordinate: { latitude: 37.290, longitude: 127.018 },
      },
      {
        name: '수원전통문화관',
        address: '수원시 팔달구 정조로 893',
        time: '도보 6분 · 거리 약 500m',
        coordinate: { latitude: 37.2865, longitude: 127.0195 },
      },
    ],
  },
  {
    id: '2',
    title: '예술 감성 산책 코스',
    subtitle: '수원화성박물관 → 공방거리 → 수원 아트스페이스 광교',
    places: [
      {
        name: '수원화성박물관',
        address: '경기도 수원시 팔달구 창룡대로 21 (매향동)',
        coordinate: { latitude: 37.2889, longitude: 127.0194 },
      },
      {
        name: '행궁동 공방거리',
        address: '경기도 수원시 팔달구 남창동 / 행궁로 48‑1 일대',
        time: '도보 10분 · 거리 약 700m',
        coordinate: { latitude: 37.2868, longitude: 127.0195 },
      },
      {
        name: '수원 아트스페이스이고',
        address: '경기도 수원시 팔달구 남수동 11-73',
        time: '도보 6분 · 거리 약 400m',
        coordinate: { latitude: 37.285, longitude: 127.017 },
      },
    ],
  },
  {
    id: '3',
    title: '야경 명소 탐방',
    subtitle: '화홍문 → 방화수류정 → 연무대',
    places: [
      {
        name: '화홍문',
        address: '수원시 팔달구 정조로 825',
        coordinate: { latitude: 37.287, longitude: 127.018 },
      },
      {
        name: '방화수류정',
        address: '수원시 팔달구 수원천로392번길 44-6',
        time: '도보 10분 · 거리 약 800m',
        coordinate: { latitude: 37.290, longitude: 127.018 },
      },
      {
        name: '연무대',
        address: '수원시 팔달구 연무로 1',
        time: '도보 12분 · 거리 약 900m',
        coordinate: { latitude: 37.285, longitude: 127.020 },
      },
    ],
  },
];

type CourseDetailRouteProp = RouteProp<CourseStackParamList, 'CourseDetailScreen'>;

export default function CourseDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<CourseDetailRouteProp>();
  const { courseId } = route.params;
  const course = DUMMY_COURSE_DETAIL.find((c) => c.id === courseId);

  if (!course) {
    return (
      <View style={styles.container}>
        <Text>코스를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  // 코스 내 모든 장소의 위도, 경도 리스트
  const latitudes = course.places.map(p => p.coordinate.latitude);
  const longitudes = course.places.map(p => p.coordinate.longitude);

  // 최소 최대 위도/경도 계산
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLon = Math.min(...longitudes);
  const maxLon = Math.max(...longitudes);

  // 지도에 장소들이 잘 보이도록 중앙 좌표와 확대 범위 계산
  const centerLat = (maxLat + minLat) / 2;
  const centerLon = (maxLon + minLon) / 2;

  // 간격에 1.5배 여유 줌
  const latitudeDelta = (maxLat - minLat) * 1.5 || 0.01;
  const longitudeDelta = (maxLon - minLon) * 1.5 || 0.01;

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {course.title}
        </Text>
        <View style={{ width: 28 }} />
      </View>

      {/* 지도 */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: centerLat,
          longitude: centerLon,
          latitudeDelta,
          longitudeDelta,
        }}
      >
        {course.places.map((place, index) => (
        <Marker
          key={index}
          coordinate={place.coordinate}
        >
          <View style={styles.customMarker}>
            <Text style={styles.markerText}>{index + 1}</Text>
          </View>
          <Callout>
            <View style={{ padding: 5, maxWidth: 200 }}>
              <Text style={{ fontWeight: 'bold' }}>{place.name}</Text>
              {place.address && <Text>{place.address}</Text>}
              {place.time && <Text style={{ color: '#666' }}>{place.time}</Text>}
            </View>
          </Callout>
        </Marker>
))}

        <Polyline
          coordinates={course.places.map(p => p.coordinate)}
          strokeColor="#FF5A5F"
          strokeWidth={4}
          lineDashPattern={[2, 4]}
        />
      </MapView>

      {/* 정보 카드 */}
      <ScrollView style={styles.card}>
        <Text style={styles.courseTitle}>📍 {course.title}</Text>
        <Text style={styles.courseSub}>{course.subtitle}</Text>

        <View style={styles.timeline}>
          {course.places.map((place, index) => (
            <View key={index} style={styles.timelineItem}>
              {index === 0 && (
                <Text style={styles.timelineStart}>Start!</Text>
              )}
              {place.time && (
                <Text style={styles.walkingInfo}>{place.time}</Text>
              )}
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
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DADADA',
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  map: { width: '100%', height: screenHeight * 0.4 },
  customMarker: {
    backgroundColor: '#FF5A5F',
    padding: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    minWidth: 32,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  courseTitle: { fontSize: 22, fontWeight: '600', color: '#333', marginBottom: 6 },
  courseSub: { fontSize: 14, color: '#888', marginBottom: 20 },
  timeline: {
    borderLeftWidth: 2,
    borderLeftColor: '#E0E0E0',
    paddingLeft: 20,
  },
  timelineItem: {
    marginBottom: 28,
    position: 'relative',
    paddingLeft: 6,
  },
  timelineStart: {
    color: '#007AFF',
    fontWeight: '500',
    fontSize: 13,
    marginBottom: 4,
    position: 'absolute',
    top: -20,
    left: 10,
  },
  walkingInfo: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  placeAddress: {
    fontSize: 13,
    color: '#666',
  },
});
