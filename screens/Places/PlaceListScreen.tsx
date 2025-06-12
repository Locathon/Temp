import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
  description: string;
  thumbnail: ImageSourcePropType | string; // URL일 수도 있음
};

// 임시 장소 데이터
const DUMMY_PLACES: Place[] = [
  {
    id: '1',
    name: '행궁동 벽화마을',
    description: '골목골목 예쁜 벽화가 가득한 사진 명소',
    thumbnail: require('../../assets/images/mural_village.jpg'), 
  },
  {
    id: '2',
    name: '플라잉수원 (헬륨기구)',
    description: '수원 화성의 아름다운 전경을 하늘에서 감상',
    thumbnail: require('../../assets/images/flying_suwon.jpg'),
  },
  {
    id: '3',
    name: '통닭거리',
    description: '수원 왕갈비 통닭의 원조, 맛집이 모여있는 거리',
    thumbnail: require('../../assets/images/chicken_street.jpg'),
  },
];

type PlaceStackParamList = {
  PlaceWrite: undefined;
  PlaceDetail: { placeId: string };
  PlaceSearch: undefined;
};

type PlaceListNavigationProp = NativeStackNavigationProp<PlaceStackParamList>;

export default function PlaceListScreen() {
  const navigation = useNavigation<PlaceListNavigationProp>();
  const [places, setPlaces] = useState<Place[]>([]);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  // AsyncStorage에서 JWT 토큰을 불러오기
  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then(token => {
        setJwtToken(token);
      })
      .catch(err => {
        console.error('JWT 토큰 불러오기 실패:', err);
      });
  }, []);

  useEffect(() => {
    if (!jwtToken) return; // 토큰 없으면 요청 안함

    axios
      .get('http://3.35.27.124:8080/places', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        console.log('백엔드 응답:', JSON.stringify(res.data, null, 2));

        const placesFromApi = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];

       const apiPlaces: Place[] = placesFromApi.map((place: any) => {
        console.log('place.imageUrls[0]:', place.imageUrls ? place.imageUrls[0] : '없음');

        return {
          id: `api_${place.latitude}_${place.longitude}`,
          name: place.name ?? '이름 없음',
          description: place.content ?? '',
          thumbnail:
            place.imageUrls && place.imageUrls.length > 0 && place.imageUrls[0]
              ? { uri: place.imageUrls[0] }
              : require('../../assets/images/flying_suwon.jpg'),
        };
      });

        setPlaces(apiPlaces);
        console.log('setPlaces 후 places:', apiPlaces);
      })
      .catch((err) => {
        console.error('장소 불러오기 실패:', err);
      });
  }, [jwtToken]);


  const renderPlaceItem = ({ item }: { item: Place }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}>
      <Image source={typeof item.thumbnail === 'string' ? { uri: item.thumbnail } : item.thumbnail} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  // DUMMY + 실제 데이터 합치기
  const combinedPlaces = [...DUMMY_PLACES, ...places];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>장소</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PlaceSearch')}>
          <Ionicons name="search-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={[...DUMMY_PLACES, ...places]}
        renderItem={renderPlaceItem}
        keyExtractor={(item) => item.id}
        extraData={places}
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
  // 기존 스타일 유지
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#EAEAEA' },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  listContainer: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 80 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3 },
  thumbnail: { width: '100%', height: 180, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  cardContent: { padding: 16 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  cardDescription: { fontSize: 14, color: '#4F4F4F' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '40%' },
  emptyText: { fontSize: 16, color: 'gray' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#2F80ED', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 },
});
