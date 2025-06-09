import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// PlaceListScreen과 동일한 데이터 타입 및 임시 데이터 사용
type Place = {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: ImageSourcePropType;
};

const DUMMY_PLACES: Place[] = [
  {
    id: '1', name: '행궁동 벽화마을', category: '문화/예술',
    description: '골목골목 예쁜 벽화가 가득한 사진 명소',
    thumbnail: require('../../assets/images/mural_village.jpg'), 
  },
  {
    id: '2', name: '플라잉수원 (헬륨기구)', category: '체험/활동',
    description: '수원 화성의 아름다운 전경을 하늘에서 감상',
    thumbnail: require('../../assets/images/flying_suwon.jpg'),
  },
  {
    id: '3', name: '통닭거리', category: '음식점',
    description: '수원 왕갈비 통닭의 원조, 맛집이 모여있는 거리',
    thumbnail: require('../../assets/images/chicken_street.jpg'),
  },
];

type PlaceStackParamList = {
    PlaceDetail: { placeId: string };
};
type PlaceSearchNavigationProp = NativeStackNavigationProp<PlaceStackParamList>;

export default function PlaceSearchScreen() {
  const navigation = useNavigation<PlaceSearchNavigationProp>();
  const [query, setQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(DUMMY_PLACES);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredPlaces(DUMMY_PLACES); // 검색어가 없으면 전체 목록 보여주기
    } else {
      const results = DUMMY_PLACES.filter(place =>
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlaces(results);
    }
  }, [query]);

  const renderPlaceItem = ({ item }: { item: Place }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.resultTextContainer}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#828282" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="장소나 카테고리를 검색해보세요"
                value={query}
                onChangeText={setQuery}
                autoFocus={true} // 화면에 들어오자마자 키보드 활성화
            />
        </View>
      </View>
      
      <FlatList
        data={filteredPlaces}
        renderItem={renderPlaceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>검색 결과가 없어요.</Text>
                <Text style={styles.emptySubtext}>다른 키워드로 검색해보세요.</Text>
            </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#EAEAEA' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, backgroundColor: '#F2F2F7', borderRadius: 10, marginLeft: 12 },
  searchIcon: { marginHorizontal: 10 },
  searchInput: { flex: 1, height: 40, fontSize: 16 },
  listContainer: { padding: 16 },
  resultItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  thumbnail: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#E0E0E0' },
  resultTextContainer: { flex: 1, marginLeft: 12 },
  resultName: { fontSize: 16, fontWeight: '600' },
  resultCategory: { fontSize: 13, color: '#828282', marginTop: 2 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '40%' },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#4F4F4F' },
  emptySubtext: { fontSize: 14, color: '#828282', marginTop: 8 },
});
