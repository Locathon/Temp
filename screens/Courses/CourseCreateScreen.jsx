import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function CourseCreateScreen({ navigation }) {
  const places = [
    {
      name: '온멜로 1호점',
      address: '수원시 팔달구 화서문로32번길 4 2층',
      time: '도보 14분, 차량 4분',
    },
    {
      name: '방화수류정',
      address: '수원시 팔달구 수원천로392번길 44-6',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('CourseListScreen')}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>새로운 코스 만들기</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CourseScreen')}>
          <Ionicons name="add-circle-outline" size={28} />
        </TouchableOpacity>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>| 가족과 여행하기 좋은 힐링 코스</Text>
      <Text style={styles.description}>2개 이상의 장소를 선택해주세요.</Text>
      <Text style={styles.description}>Start!</Text>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {places.map((place, index) => (
          <View key={index} style={styles.placeRow}>
            {/* 타임라인 점 */}
            <View style={styles.timelineColumn}>
              <View style={styles.circle} />
              {index !== places.length - 1 && <View style={styles.line} />}
            </View>

            {/* 장소 정보 */}
            <View style={styles.placeCard}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeAddress}>{place.address}</Text>
              {place.time && <Text style={styles.timeInfo}>{place.time}</Text>}
            </View>

            {/* 토글 버튼 자리 (예시용 circle) */}
            <TouchableOpacity style={styles.toggleButton}>
              <View style={styles.toggleCircle} />
            </TouchableOpacity>
          </View>
        ))}

        {/* 추가 버튼 */}
        <View style={styles.addButtonRow}>
          <View style={styles.timelineColumn}>
            <View style={styles.circle} />
          </View>
          <TouchableOpacity style={styles.plusButton}>
            <Ionicons name="add" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  description: { fontSize: 13, color: '#555' },

  scrollArea: { paddingVertical: 16 },
  placeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  timelineColumn: {
    width: 24,
    alignItems: 'center',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginTop: 6,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#000',
    marginTop: 2,
  },
  placeCard: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
  },
  placeName: { fontWeight: 'bold', fontSize: 14 },
  placeAddress: { fontSize: 12, color: '#444', marginTop: 4 },
  timeInfo: { fontSize: 11, color: '#888', marginTop: 4 },

  toggleButton: {
    width: 30,
    height: 30,
    marginLeft: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },

  addButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  plusButton: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
