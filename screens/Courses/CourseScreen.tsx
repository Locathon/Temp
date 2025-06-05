import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function CourseScreen() {
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>코스</Text>
        <View style={{ width: 24 }} /> {/* 오른쪽 여백 확보용 빈 View */}
      </View>

      {/* 지도 */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.289,
          longitude: 127.016,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: 37.289, longitude: 127.016 }} title="온멜로" />
        <Marker coordinate={{ latitude: 37.290, longitude: 127.018 }} title="방화수류정" />
        <Polyline
          coordinates={[
            { latitude: 37.289, longitude: 127.016 },
            { latitude: 37.290, longitude: 127.018 },
          ]}
          strokeColor="#000"
          strokeWidth={2}
        />
      </MapView>

      {/* 코스 설명 */}
      <ScrollView style={styles.card}>
        <Text style={styles.courseTitle}>| 가족과 여행하기 좋은 힐링 코스</Text>
        <Text style={styles.courseSub}>온멜로 - 방화수류정 - 수원전통문화관</Text>

        <View style={styles.timeline}>
          {/* 첫 번째 장소 */}
          <View style={styles.timelineItem}>
            <Text style={styles.timelineStart}>Start!</Text>
            <Text style={styles.placeTitle}>온멜로 1호점</Text>
            <Text style={styles.placeAddress}>수원시 팔달구 화서문로32번길 4 2층</Text>
          </View>

          {/* 두 번째 장소 */}
          <View style={styles.timelineItem}>
            <Text style={styles.walkingInfo}>도보 14분, 거리 약 4분</Text>
            <Text style={styles.placeTitle}>방화수류정</Text>
            <Text style={styles.placeAddress}>수원시 팔달구 수원천로392번길 44-6</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 180,
  },
  card: {
    flex: 1,
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  courseTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  courseSub: {
    color: '#aaa',
    marginBottom: 16,
  },
  timeline: {
    borderLeftWidth: 2,
    borderLeftColor: '#888',
    paddingLeft: 16,
  },
  timelineItem: {
    marginBottom: 20,
  },
  timelineStart: {
    color: '#fff',
    fontWeight: 'bold',
  },
  walkingInfo: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 4,
  },
  placeTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  placeAddress: {
    color: '#ccc',
    fontSize: 13,
  },
});
