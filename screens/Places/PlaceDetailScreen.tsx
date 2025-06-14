import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

Geocoder.init('AIzaSyA38Wx1aAoueHqiOsWVlTYSIAvRtO6RW6g'); // 실제 앱 배포 시에는 환경 변수로 관리

type Place = {
  id: string;
  name: string;
  description: string;
  imageUrls: string[];
  address?: string;
  latitude?: number;
  longitude?: number;
};

type RootStackParamList = {
  PlaceDetail: { placeId: string };
};

type PlaceDetailRouteProp = RouteProp<RootStackParamList, 'PlaceDetail'>;

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
        console.error('초기화 중 오류:', err);
        setErrorMsg('초기화 오류가 발생했습니다.');
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
        if (response.status === 401) {
          setErrorMsg('인증 실패: 로그인 후 다시 시도해주세요.');
        } else {
          setErrorMsg(`서버 오류: ${response.status}`);
        }
        return;
      }

      const data: Place = await response.json();

      // 주소가 없고 위도/경도만 있다면 Geocoding으로 주소 가져오기
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

      setPlace(data);
    } catch (err) {
      console.error('장소 데이터 로드 실패:', err);
      setErrorMsg('장소 데이터를 불러오는 데 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
        <Text>로딩 중...</Text>
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>뒤로 가기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!place) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Text>장소 정보를 찾을 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
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
        {place.imageUrls && place.imageUrls.length > 0 ? (
          <Image source={{ uri: place.imageUrls[0] }} style={styles.mainImage} />
        ) : (
          <View style={[styles.mainImage, styles.centeredContainer]}>
            <Text>이미지가 없습니다</Text>
          </View>
        )}

        <View style={styles.contentContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{place.name}</Text>
            <Text style={styles.description}>{place.description}</Text>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color="#4F4F4F" />
              <Text style={styles.infoText}>{place.address ?? '주소 정보 없음'}</Text>
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
                  latitudeDelta: 0.002,
                  longitudeDelta: 0.002,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    marginTop: 20,
  },
  backText: {
    color: 'blue',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  infoSection: {
    marginTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoText: {
    marginLeft: 8,
    color: '#4F4F4F',
  },
  mapSection: {
    height: 200,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    color: '#4F4F4F',
  },
});
