import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Image, ImageSourcePropType, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CourseStackParamList } from '../../navigation/CourseNavigator';

type Course = {
  id: string; title: string; subtitle: string;
  thumbnail: ImageSourcePropType; author: string; likes: number;
};
const DUMMY_COURSES: Course[] = [
  { id: '1', title: '행궁동 맛집 투어', subtitle: '화성행궁 → 수원 통닭거리 → 팔달문 시장', thumbnail: require('../../assets/images/chicken_street.jpg'), author: '느린행궁러버', likes: 120 },
  { id: '2', title: '예술 감성 산책 코스', subtitle: '수원화성박물관 → 공방거리 → 수원 아트스페이스', thumbnail: require('../../assets/images/mural_village.jpg'), author: '행궁동전문가', likes: 98 },
  { id: '3', title: '야경 명소 탐방', subtitle: '화홍문 → 방화수류정 → 연무대', thumbnail: require('../../assets/images/flying_suwon.jpg'), author: '밤산책가', likes: 250 },
];

type CourseHomeScreenNavigationProp = NativeStackNavigationProp<CourseStackParamList, 'CourseHomeScreen'>;

export default function CourseHomeScreen() {
  const navigation = useNavigation<CourseHomeScreenNavigationProp>();

  const renderCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CourseDetailScreen', { courseId: item.id })}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>
        <View style={styles.cardFooter}>
            <Text style={styles.author}>by {item.author}</Text>
            <View style={styles.likesContainer}>
                <Ionicons name="heart" size={14} color="#EB5757" />
                <Text style={styles.likesText}>{item.likes}</Text>
            </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>코스</Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => {/* TODO: Search */} }>
            <Ionicons name="search-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CourseCreateScreen')}>
            <Ionicons name="add-circle-outline" size={26} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={DUMMY_COURSES}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>오늘의 추천 코스</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CourseListScreen')}>
                    <Text style={styles.seeAllText}>전체보기 &gt;</Text>
                </TouchableOpacity>
            </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#EAEAEA' },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  iconGroup: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  listContainer: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 80 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAllText: { fontSize: 14, color: '#2F80ED' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3, },
  thumbnail: { width: '100%', height: 160, borderTopLeftRadius: 12, borderTopRightRadius: 12, },
  cardContent: { padding: 16 },
  cardTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: '#4F4F4F', marginBottom: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  author: { fontSize: 12, color: '#828282' },
  likesContainer: { flexDirection: 'row', alignItems: 'center' },
  likesText: { marginLeft: 4, fontSize: 13, color: '#4F4F4F' },
});
