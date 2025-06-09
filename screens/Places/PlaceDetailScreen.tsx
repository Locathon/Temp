import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


// --- 임시 데이터 (PlaceListScreen과 동일한 구조) ---
type Place = {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  address?: string;
  latitude?: number;
  longitude?: number;
};

const DUMMY_PLACES: Place[] = [
  {
    id: '1',
    name: '행궁동 벽화마을',
    category: '문화/예술',
    description: '골목골목 예쁜 벽화가 가득한 사진 명소. 조용한 평일 오전에 방문하면 여유롭게 둘러볼 수 있어요. 인생샷을 남기고 싶다면 추천!',
    thumbnail: 'https://placehold.co/800x600/FFE4B5/333333?text=Mural',
    address: '수원시 팔달구 행궁로',
    latitude: 37.286,
    longitude: 127.014,
  },
  {
    id: '2',
    name: '플라잉수원 (헬륨기구)',
    category: '체험/활동',
    description: '수원 화성의 아름다운 전경을 하늘에서 감상할 수 있는 특별한 경험. 특히 해질녘 노을이 정말 아름다워요.',
    thumbnail: 'https://placehold.co/800x600/ADD8E6/333333?text=Flying',
    address: '수원시 팔달구 경수대로 697',
    latitude: 37.280,
    longitude: 127.019,
  },
   {
    id: '3',
    name: '통닭거리',
    category: '음식점',
    description: '수원 왕갈비 통닭의 원조, 맛집이 모여있는 거리. 바삭한 통닭과 시원한 맥주 조합은 언제나 최고!',
    thumbnail: 'https://placehold.co/800x600/FFDAB9/333333?text=Chicken',
    address: '수원시 팔달구 팔달문로3번길 42',
    latitude: 37.281,
    longitude: 127.016,
  },
];
// --- 데이터 끝 ---


type PlaceDetailRouteProp = RouteProp<{ PlaceDetail: { placeId: string } }, 'PlaceDetail'>;

export default function PlaceDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<PlaceDetailRouteProp>();
  const { placeId } = route.params;

  const [place, setPlace] = useState<Place | null>(null);

  useEffect(() => {
    const foundPlace = DUMMY_PLACES.find(p => p.id === placeId);
    if (foundPlace) {
      setPlace(foundPlace);
    }
  }, [placeId]);

  if (!place) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>장소 정보를 불러오는 중...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{place.name}</Text>
        <TouchableOpacity>
            <Ionicons name="share-social-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Image source={{ uri: place.thumbnail }} style={styles.mainImage} />
        
        <View style={styles.contentContainer}>
            <View style={styles.titleSection}>
                <Text style={styles.category}>{place.category}</Text>
                <Text style={styles.title}>{place.name}</Text>
                <Text style={styles.description}>{place.description}</Text>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={16} color="#4F4F4F" />
                    <Text style={styles.infoText}>{place.address}</Text>
                </View>
                 <View style={styles.infoRow}>
                    <Ionicons name="time-outline" size={16} color="#4F4F4F" />
                    <Text style={styles.infoText}>운영 시간 정보가 필요해요</Text>
                </View>
            </View>
            
            {place.latitude && place.longitude && (
                <View style={styles.mapSection}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: place.latitude,
                            longitude: place.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        scrollEnabled={false}
                    >
                        <Marker coordinate={{ latitude: place.latitude, longitude: place.longitude }} />
                    </MapView>
                </View>
            )}

            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="heart-outline" size={24} color="#4F4F4F" />
                    <Text style={styles.actionText}>좋아요</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="bookmark-outline" size={24} color="#4F4F4F" />
                    <Text style={styles.actionText}>저장</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubble-outline" size={24} color="#4F4F4F" />
                    <Text style={styles.actionText}>후기쓰기</Text>
                </TouchableOpacity>
            </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EAEAEA' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginHorizontal: 8 },
  mainImage: { width: '100%', height: 250 },
  contentContainer: { padding: 20 },
  titleSection: { marginBottom: 24 },
  category: { fontSize: 14, color: '#2F80ED', fontWeight: '600', marginBottom: 8 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 16, color: '#4F4F4F', lineHeight: 24 },
  infoSection: { marginBottom: 24, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#F2F2F2', paddingVertical: 16 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  infoText: { marginLeft: 12, fontSize: 15 },
  mapSection: { marginBottom: 24 },
  map: { width: '100%', height: 180, borderRadius: 10 },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderColor: '#F2F2F2' },
  actionButton: { alignItems: 'center' },
  actionText: { marginTop: 4, fontSize: 12, color: '#4F4F4F' },
});
