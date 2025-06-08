import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
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

export default function MyCoursesScreen() {
  const navigation = useNavigation();

  const renderCourseItem = ({ item }: { item: MyCourse }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>장소 {item.placeCount}개</Text>
        <View style={styles.tagContainer}>
          {item.tags.map(tag => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내가 기록한 코스</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <FlatList
        data={DUMMY_MY_COURSES}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>아직 기록한 코스가 없어요.</Text>
                <Text style={styles.emptySubtext}>나만의 코스를 만들어보세요!</Text>
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
});
