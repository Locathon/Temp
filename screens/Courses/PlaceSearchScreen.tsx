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
import { CourseStackParamList } from '../../navigation/CourseNavigator'; // ⭐️ 네비게이터의 약속을 가져옵니다.

// ⭐️ Place 타입에 위도(latitude), 경도(longitude)를 추가합니다. (다른 화면에서도 재사용 가능하도록 export)
export type Place = {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: ImageSourcePropType;
  latitude?: number;
  longitude?: number;
};

const DUMMY_PLACES: Place[] = [
    { id: '1', name: '행궁동 벽화마을', category: '문화/예술', description: '...', thumbnail: require('../../assets/images/mural_village.jpg'), latitude: 37.286, longitude: 127.014 },
    { id: '2', name: '플라잉수원 (헬륨기구)', category: '체험/활동', description: '...', thumbnail: require('../../assets/images/flying_suwon.jpg'), latitude: 37.280, longitude: 127.019 },
    { id: '3', name: '통닭거리', category: '음식점', description: '...', thumbnail: require('../../assets/images/chicken_street.jpg'), latitude: 37.281, longitude: 127.016 },
    { id: '4', name: '온멜로', category: '음식점', description: '...', thumbnail: require('../../assets/images/onmelo_food.jpg'), latitude: 37.289, longitude: 127.016 },
    { id: '5', name: '행궁파티', category: '음식점', description: '...', thumbnail: require('../../assets/images/onmelo_interior.jpg'), latitude: 37.287, longitude: 127.015 },
];

// ⭐️ 네비게이션에 CourseStackParamList 약속을 적용합니다.
type PlaceSearchNavigationProp = NativeStackNavigationProp<CourseStackParamList>;

export default function PlaceSearchScreen() {
  const navigation = useNavigation<PlaceSearchNavigationProp>();
  const [query, setQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(DUMMY_PLACES);

  useEffect(() => {
    const results = DUMMY_PLACES.filter(place =>
        place.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlaces(results);
  }, [query]);

  const handleSelectPlace = (place: Place) => {
    navigation.navigate('CourseCreateScreen', { newPlace: place });
  };

  const renderPlaceItem = ({ item }: { item: Place }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleSelectPlace(item)}>
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
                placeholder="코스에 추가할 장소를 검색하세요"
                value={query}
                onChangeText={setQuery}
                autoFocus={true}
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
  resultItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  thumbnail: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#E0E0E0' },
  resultTextContainer: { flex: 1, marginLeft: 12 },
  resultName: { fontSize: 16, fontWeight: '600' },
  resultCategory: { fontSize: 13, color: '#828282', marginTop: 2 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '40%' },
  emptyText: { fontSize: 16, color: 'gray' },
});
