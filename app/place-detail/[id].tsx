// app/place-detail/[id].tsx
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 임시 데이터 또는 API 호출 함수
const fetchPlaceDetails = async (id: string) => {
  console.log(`Fetching details for place ID: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 700));
  if (id === 'p1' || id === '1') {
    return {
      name: '방화수류정 (연못)',
      category: '역사유적',
      imageUrl: 'https://placehold.co/600x400/A2D2FF/333?text=방화수류정',
      address: '수원시 팔달구 수원천로392번길 44',
      description: '방화수류정은 조선 후기에 건립된 정자로, 아름다운 연못과 어우러져 사계절 내내 멋진 풍경을 자랑합니다. 특히 봄에는 벚꽃, 여름에는 푸르른 녹음, 가을에는 단풍, 겨울에는 설경이 아름답습니다. 사진 찍기 좋은 명소로 유명하며, 여유로운 산책을 즐기기에도 좋습니다.',
      rating: 4.7,
      reviewCount: 125,
      operatingHours: '상시 개방 (단, 야간에는 조명 제한적)',
      phoneNumber: '031-228-4420 (수원문화재단)',
      website: 'http://www.swcf.or.kr',
      tags: ['#수원화성', '#뷰맛집', '#피크닉', '#데이트코스', '#사진스팟'],
      facilities: ['주차 가능 (인근 공영주차장)', '화장실 있음'],
    };
  }
  return null;
};

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [place, setPlace] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPlaceDetails(id).then(data => {
        if (data) {
          setPlace(data);
        } else {
          Alert.alert("오류", "장소 정보를 불러올 수 없습니다.", [{ text: "확인", onPress: () => router.back() }]);
        }
        setLoading(false);
      });
    } else {
      Alert.alert("오류", "잘못된 접근입니다.", [{ text: "확인", onPress: () => router.back() }]);
      setLoading(false);
    }
  }, [id]);

  const handleOpenURL = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("오류", `다음 URL을 열 수 없습니다: ${url}`);
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!place) {
    return (
      <>
        <Stack.Screen options={{ title: '정보 없음' }} />
        <View style={styles.loaderContainer}><Text>장소 정보를 찾을 수 없습니다.</Text></View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: place.name || '장소 상세' }} />
      <ScrollView style={styles.container}>
        <Image source={{ uri: place.imageUrl }} style={styles.image} />
        
        <View style={styles.mainInfoContainer}>
          <Text style={styles.category}>{place.category}</Text>
          <Text style={styles.name}>{place.name}</Text>
          
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={20} color="#FFC700" />
            <Text style={styles.ratingText}>{place.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCountText}>({place.reviewCount}개의 리뷰)</Text>
          </View>
          
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={18} color="#4F4F4F" />
            <Text style={styles.addressText}>{place.address}</Text>
          </View>
        </View>

        <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert("행궁인장", "행궁인장 찍기 기능 준비 중")}>
                <Ionicons name="qr-code-outline" size={20} color="#007AFF" />
                <Text style={styles.actionButtonLabel}>행궁인장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert("후기작성", "후기작성 기능 준비 중")}>
                <Ionicons name="pencil-outline" size={20} color="#007AFF" />
                <Text style={styles.actionButtonLabel}>후기작성</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert("코스에 담기", "코스에 담기 기능 준비 중")}>
                <Ionicons name="add-circle-outline" size={20} color="#007AFF" />
                <Text style={styles.actionButtonLabel}>코스에 담기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert("저장", "저장 기능 준비 중")}>
                <Ionicons name="bookmark-outline" size={20} color="#007AFF" />
                <Text style={styles.actionButtonLabel}>저장</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailInfoContainer}>
            <Text style={styles.sectionTitle}>장소 소개</Text>
            <Text style={styles.descriptionText}>{place.description}</Text>

            {place.operatingHours && (
                <>
                    <Text style={styles.sectionTitle}>운영 시간</Text>
                    <Text style={styles.infoTextContent}>{place.operatingHours}</Text>
                </>
            )}
             {place.phoneNumber && (
                <>
                    <Text style={styles.sectionTitle}>연락처</Text>
                    <TouchableOpacity onPress={() => handleOpenURL(`tel:${place.phoneNumber}`)}>
                        <Text style={[styles.infoTextContent, styles.linkText]}>{place.phoneNumber}</Text>
                    </TouchableOpacity>
                </>
            )}
             {place.website && (
                <>
                    <Text style={styles.sectionTitle}>웹사이트</Text>
                    <TouchableOpacity onPress={() => handleOpenURL(place.website)}>
                        <Text style={[styles.infoTextContent, styles.linkText]}>{place.website}</Text>
                    </TouchableOpacity>
                </>
            )}

            {place.facilities && place.facilities.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>편의시설</Text>
                    {place.facilities.map((facility: string, index: number) => (
                        <Text key={index} style={styles.infoTextContent}>- {facility}</Text>
                    ))}
                </>
            )}
            
            {place.tags && place.tags.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>태그</Text>
                    <View style={styles.tagsContainer}>
                    {place.tags.map((tag: string, index: number) => (
                        <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                    </View>
                </>
            )}
        </View>
        
        <View style={styles.detailInfoContainer}>
            <Text style={styles.sectionTitle}>방문자 후기 ({place.reviewCount})</Text>
            <Text style={styles.infoTextContent}>후기 목록은 여기에 표시됩니다. (구현 예정)</Text>
             <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreButtonText}>모든 후기 보기</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  image: {
    width: '100%',
    height: 280,
  },
  mainInfoContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    color: '#1C1C1E',
  },
  reviewCountText: {
    fontSize: 14,
    color: '#8A8A8E',
    marginLeft: 6,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 15,
    color: '#4F4F4F',
    marginLeft: 6,
    flexShrink: 1,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 12,
    marginBottom: 8,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#E0E0E0'
  },
  actionButton: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  actionButtonLabel: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
  },
  separator: {
    height: 8,
    backgroundColor: '#F2F2F7',
  },
  detailInfoContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#3C3C43',
    marginBottom: 16,
  },
  infoTextContent: {
    fontSize: 16,
    lineHeight: 22,
    color: '#3C3C43',
    marginBottom: 10,
  },
  linkText: {
    color: '#007AFF',
    // textDecorationLine: 'underline', // 필요시 추가
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#007AFF1A',
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#007AFF',
    fontSize: 13,
    fontWeight: '500',
  },
   moreButton: {
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  moreButtonText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
  },
});
