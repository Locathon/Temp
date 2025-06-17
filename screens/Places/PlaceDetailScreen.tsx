import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps';

Geocoder.init('AIzaSyA38Wx1aAoueHqiOsWVlTYSIAvRtO6RW6g');

type Place = {
  id: string;
  name: string;
  content: string;
  imageUrls: string[];
  address?: string;
  latitude?: number;
  longitude?: number;
};

type RootStackParamList = {
  PlaceDetail: { placeId: string };
};

type PlaceDetailRouteProp = RouteProp<RootStackParamList, 'PlaceDetail'>;

const screenWidth = Dimensions.get('window').width;

export default function PlaceDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<PlaceDetailRouteProp>();
  const { placeId } = route.params;

  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (!token) {
          setErrorMsg('로그인이 필요합니다.');
          return;
        }
        setJwtToken(token);
        await fetchPlace(placeId, token);
      } catch (err) {
        console.error(err);
        setErrorMsg('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [placeId]);

  const fetchPlace = async (id: string, token: string) => {
    try {
      const response = await fetch(`http://3.35.27.124:8080/places/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        setErrorMsg(`서버 오류: ${response.status}`);
        return;
      }

      const data = await response.json();

      if (!data.address && data.latitude && data.longitude) {
        try {
          const geo = await Geocoder.from(data.latitude, data.longitude);
          const addr = geo.results[0]?.formatted_address;
          data.address = addr ?? '주소 정보 없음';
        } catch (geoError) {
          console.warn('주소 변환 실패:', geoError);
          data.address = '주소 정보 없음';
        }
      }

      let urls: string[] = [];
      if (typeof data.imageUrls === 'string') {
        urls = [data.imageUrls];
      } else if (Array.isArray(data.imageUrls)) {
        urls = data.imageUrls;
      }

      const uniqueFiltered = Array.from(new Set(urls)).filter(
        (url) => typeof url === 'string' && url.trim() !== ''
      );

      data.imageUrls = uniqueFiltered;
      setPlace(data);
    } catch (err) {
      console.error(err);
      setErrorMsg('장소 데이터를 불러오는 데 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>로딩 중...</Text>
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>뒤로 가기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!place) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>장소 정보를 찾을 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{place.name}</Text>
        <TouchableOpacity>
          <Ionicons name="share-social-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {place.imageUrls.length > 0 ? (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.imageCarousel}
          >
            {place.imageUrls.map((url, index) => (
              <Image
                key={index}
                source={{ uri: url }}
                style={styles.carouselImage}
                onError={() => console.warn(`이미지 로드 실패: ${url}`)}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={[styles.carouselImage, styles.centered]}>
            <Text>이미지가 없습니다</Text>
          </View>
        )}

        <View>
          {/* 장소 소개 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>장소 소개</Text>
            <Text style={styles.content}>
              {place.content && place.content.trim().length > 0
                ? place.content
                : '설명 정보가 없습니다.'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>기본 정보</Text>

            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} />
              <Text style={styles.infoText}>{place.address ?? '주소 정보 없음'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={16} />
              <Text style={styles.infoText}>운영 시간 정보가 필요해요</Text>
            </View>
          </View>

          {place.latitude && place.longitude && (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                  latitudeDelta: 0.002,
                  longitudeDelta: 0.002,
                }}
              >
                <Marker coordinate={{ latitude: place.latitude, longitude: place.longitude }} />
              </MapView>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  imageCarousel: {
    width: '100%',
    height: 240,
    backgroundColor: '#e5e7eb',
  },
  carouselImage: {
    width: screenWidth,
    height: 240,
    resizeMode: 'cover',
  },
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4b5563',
  },
  mapContainer: {
    height: 200,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  backText: {
    fontSize: 16,
  },
});
