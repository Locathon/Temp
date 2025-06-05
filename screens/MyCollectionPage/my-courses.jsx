// app/my-courses.tsx
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 임시 코스 데이터
const dummyMyCourses = [
  { id: '1', name: '행궁동 사진찍기 좋은 길', placesCount: 5, imageUrl: 'https://placehold.co/300x150/ADD8E6/333?text=코스1', totalTime: '약 2시간' },
  { id: '2', name: '나만의 맛집 탐방 코스', placesCount: 3, imageUrl: 'https://placehold.co/300x150/90EE90/333?text=코스2', totalTime: '점심 반나절' },
];

export default function MyCoursesScreen() {
  const renderCourseItem = ({ item }: { item: {id: string; name: string; placesCount: number; imageUrl: string; totalTime: string;} }) => ( // item 타입 구체화
    <Link 
      href={{ // 객체 형태로 href 전달
        pathname: '/course-detail/[id]', 
        params: { id: item.id },
      }} 
      asChild
    >
      <TouchableOpacity style={styles.courseItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.courseImage} />
        <View style={styles.courseInfoOverlay}>
          <Text style={styles.courseName}>{item.name}</Text>
          <View style={styles.courseMeta}>
            <Ionicons name="location-outline" size={14} color="white" />
            <Text style={styles.courseMetaText}>{item.placesCount}개 장소</Text>
            <Ionicons name="time-outline" size={14} color="white" style={{ marginLeft: 10 }}/>
            <Text style={styles.courseMetaText}>{item.totalTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <>
      <Stack.Screen options={{ title: '내가 기록한 코스' }} />
      <FlatList
        data={dummyMyCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>아직 기록한 코스가 없어요.</Text>}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  courseItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: '100%',
    height: 150,
  },
  courseInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseMetaText: {
    fontSize: 13,
    color: 'white',
    marginLeft: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
});
