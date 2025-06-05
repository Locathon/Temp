import { Ionicons } from '@expo/vector-icons';
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

const { height: screenHeight } = Dimensions.get('window');

export default function CourseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('CourseCreateScreen')}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>코스</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 지도 */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.289,
          longitude: 127.016,
          latitudeDelta: 0.000000001, 
          longitudeDelta:0.000000001,
        }}
      >
        <Marker coordinate={{ latitude: 37.289, longitude: 127.016 }} title="온멜로" />
        <Marker coordinate={{ latitude: 37.290, longitude: 127.018 }} title="방화수류정" />
        <Polyline
          coordinates={[
            { latitude: 37.289, longitude: 127.016 },
            { latitude: 37.290, longitude: 127.018 },
          ]}
          strokeColor="#007AFF"
          strokeWidth={3}
        />
      </MapView>

      {/* 코스 설명 카드 */}
      <ScrollView style={styles.card}>
        <Text style={styles.courseTitle}>📍 가족과 여행하기 좋은 힐링 코스</Text>
        <Text style={styles.courseSub}>온멜로 → 방화수류정 → 수원전통문화관</Text>

        <View style={styles.timeline}>
          {/* 첫 번째 장소 */}
          <View style={styles.timelineItem}>
            <Text style={styles.timelineStart}>Start!</Text>
            <Text style={styles.placeTitle}>온멜로 1호점</Text>
            <Text style={styles.placeAddress}>수원시 팔달구 화서문로32번길 4 2층</Text>
          </View>

          {/* 두 번째 장소 */}
          <View style={styles.timelineItem}>
            <Text style={styles.walkingInfo}>도보 14분 · 거리 약 1km</Text>
            <Text style={styles.placeTitle}>방화수류정</Text>
            <Text style={styles.placeAddress}>수원시 팔달구 수원천로392번길 44-6</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  map: {
    width: '100%',
    height: screenHeight * 0.4, // 화면의 40% 차지
  },
  card: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 5,
  },
  courseTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  courseSub: {
    color: '#666',
    fontSize: 14,
    marginBottom: 16,
  },
  timeline: {
    borderLeftWidth: 2,
    borderLeftColor: '#ccc',
    paddingLeft: 16,
  },
  timelineItem: {
    marginBottom: 24,
  },
  timelineStart: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  walkingInfo: {
    color: '#999',
    fontSize: 12,
    marginBottom: 6,
  },
  placeTitle: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeAddress: {
    color: '#666',
    fontSize: 13,
  },
});
