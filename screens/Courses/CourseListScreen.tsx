import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CourseStackParamList } from '../../navigation/CourseNavigator';

// CourseScreen과 동일한 데이터 타입 사용
type Course = {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: ImageSourcePropType;
  author: string;
  likes: number;
};

// 임시 전체 코스 데이터 (더 많은 데이터를 가정)
const DUMMY_ALL_COURSES: Course[] = [
    { id: '1', title: '행궁동 맛집 투어', subtitle: '화성행궁 → 수원 통닭거리 → 팔달문 시장', thumbnail: require('../../assets/images/chicken_street.jpg'), author: '느린행궁러버', likes: 120 },
    { id: '2', title: '예술 감성 산책 코스', subtitle: '수원화성박물관 → 공방거리 → 수원 아트스페이스', thumbnail: require('../../assets/images/mural_village.jpg'), author: '행궁동전문가', likes: 98 },
    { id: '3', title: '야경 명소 탐방', subtitle: '화홍문 → 방화수류정 → 연무대', thumbnail: require('../../assets/images/flying_suwon.jpg'), author: '밤산책가', likes: 250 },
    { id: '4', title: '혼자 걷기 좋은 길', subtitle: '서장대 → 서노대 → 화서문', thumbnail: require('../../assets/images/onmelo_interior.jpg'), author: '사색가', likes: 77 },
];

type CourseListNavigationProp = NativeStackNavigationProp<CourseStackParamList, 'CourseListScreen'>;


export default function CourseListScreen() {
    const navigation = useNavigation<CourseListNavigationProp>();

  const renderCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CourseDetailScreen', { courseId: item.id })}
    >
        <Image source={item.thumbnail} style={styles.thumbnail}/>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>전체 코스</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={DUMMY_ALL_COURSES}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardContent: {
      flex: 1,
      padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});
