import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// 장소 데이터 타입 정의
type Place = {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: ImageSourcePropType;
};

// 임시 장소 데이터
const DUMMY_PLACES: Place[] = [
  {
    id: '1',
    name: '행궁동 벽화마을',
    category: '문화/예술',
    description: '골목골목 예쁜 벽화가 가득한 사진 명소',
    thumbnail: require('../../assets/images/mural_village.jpg'), 
  },
  {
    id: '2',
    name: '플라잉수원 (헬륨기구)',
    category: '체험/활동',
    description: '수원 화성의 아름다운 전경을 하늘에서 감상',
    thumbnail: require('../../assets/images/flying_suwon.jpg'),
  },
   {
    id: '3',
    name: '통닭거리',
    category: '음식점',
    description: '수원 왕갈비 통닭의 원조, 맛집이 모여있는 거리',
    thumbnail: require('../../assets/images/chicken_street.jpg'),
  },
];

type PlaceStackParamList = {
    PlaceWrite: undefined;
    PlaceDetail: { placeId: string };
    PlaceSearch: undefined; // 검색 화면으로 이동할 수 있도록 경로 타입 추가
};

type PlaceListNavigationProp = NativeStackNavigationProp<PlaceStackParamList>;

export default function PlaceListScreen() {
  const navigation = useNavigation<PlaceListNavigationProp>();

  const renderPlaceItem = ({ item }: { item: Place }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
            <Text style={styles.cardCategory}>{item.category}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>장소</Text>
        {/* ⭐️ 검색 아이콘을 눌렀을 때 PlaceSearch 화면으로 이동하도록 수정 */}
        <TouchableOpacity onPress={() => navigation.navigate('PlaceSearch')}>
            <Ionicons name="search-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={DUMMY_PLACES}
        renderItem={renderPlaceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>아직 등록된 장소가 없어요.</Text>
            </View>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('PlaceWrite')}>
        <Ionicons name="add-outline" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#EAEAEA' },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  listContainer: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 80 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3 },
  thumbnail: { width: '100%', height: 180, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  cardContent: { padding: 16 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardCategory: { fontSize: 12, color: '#2F80ED', backgroundColor: '#EAF2FF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontWeight: '600', overflow: 'hidden' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  cardDescription: { fontSize: 14, color: '#4F4F4F' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '40%' },
  emptyText: { fontSize: 16, color: 'gray' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#2F80ED', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 },
});
