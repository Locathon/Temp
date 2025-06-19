import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
const aiTransitionIcon = require('../../assets/images/ai_transition.png');
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// Route params type for navigation
type StoreParams = {
  name?: string;
  description?: string;
  tag?: string;
  location?: string; // changed from address
  startHour?: string;
  endHour?: string;
  phone?: string;
  website?: string;
  holidays?: string[];
  profileImage?: string;
  menuImages?: (string | null)[];
  qas?: { question: string; answer: string }[];
};
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

// 임시 가게 데이터 (추후 API 연동)
const DUMMY_STORE_DATA = {
  name: '레몬트리',
  tag: '디저트카페',
  images: [
    require('../../assets/images/onmelo_interior.jpg'),
    require('../../assets/images/onmelo_interior.jpg'),
    require('../../assets/images/onmelo_interior.jpg'),
    require('../../assets/images/onmelo_interior.jpg'),
  ],
  address: '경기도 수원시 행궁동 238-234 경기빌딩 3층',
  phone: '1577-4851',
  website: 'http://kr.pinterest.com/pin',
  rating: 4.5,
  reviewCount: 89,
  description: '여행과 풍경의 기록, 느리게 걷는 발자국',
  stats: {
    visitors: '1,234',
    likes: 456,
    reviews: 89,
  },
  openingHours: '14:00 ~ 22:00',
};

const DEFAULT_QAS = [
  {
    question: '오늘 영업하나요?',
    answer: '네, 오늘 정상 영업합니다!',
  },
  {
    question: '주차장 있나요?',
    answer: '네, 건물 앞 주차장 이용 가능합니다.',
  },
  {
    question: '포장도 되나요?',
    answer: '네, 모든 메뉴 포장 가능합니다 :)',
  },
  {
    question: '예약 없이 가도 되나요?',
    answer: '네, 오늘은 오전 11시부터 오후 9시까지 영업합니다 :)',
  },
  {
    question: '메뉴판 어디서 볼 수 있나요?',
    answer: '프로필에 메뉴 링크가 있습니다! 또는 인스타 하이라이트도 참고해주세요.',
  },
  {
    question: '카드 결제 되나요?',
    answer: '네, 카드/간편결제 모두 가능합니다. 현금영수증도 발급돼요 :)',
  },
];

export default function StoreHomeScreen_user() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ params: StoreParams }, 'params'>>();
  const {
    name,
    description,
    tag,
    location,
    startHour,
    endHour,
    phone,
    website,
    holidays,
    profileImage,
    menuImages,
    qas,
  } = route.params || {};
  const openingHours =
    startHour && endHour
      ? `${startHour} ~ ${endHour}`
      : DUMMY_STORE_DATA.openingHours;
  const [activeTab, setActiveTab] = useState<'Home' | 'Review' | 'QA'>(() => {
    return 'Home';
  });
  const [liked, setLiked] = useState(false);
  // For Q&A expand/collapse
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  // Log initial qas param for debugging
  console.log('StoreHomeScreen 초기 route.params?.qas:', route.params?.qas);
  const [qaList, setQaList] = useState<{ question: string; answer: string }[]>([]);
  // Always set qaList from route.params.qas on first mount; fallback to DEFAULT_QAS
  useEffect(() => {
    if (route.params?.qas && Array.isArray(route.params.qas)) {
      console.log('초기 QAs 설정됨:', route.params.qas);
      setQaList(route.params.qas);
    } else {
      console.log('초기 QAs 없음, 기본 QAs로 설정');
      setQaList(DEFAULT_QAS);
    }
  }, []);
  useEffect(() => {
    console.log('Q&A 리스트:', qaList);
  }, [qaList]);
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>스토어</Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 100,
          flexGrow: 1,
        }}
      >
        {/* Store Images Grid */}
        <View style={styles.imageGrid}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : DUMMY_STORE_DATA.images[0]
            }
            style={styles.gridImage}
          />
        </View>

        {/* Store Info */}
        <View style={styles.storeInfoRow}>
          <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text style={styles.storeName}>{name || DUMMY_STORE_DATA.name}</Text>
          <Text style={styles.inlineStoreTag}>  {tag || DUMMY_STORE_DATA.tag}</Text>
        </View>
            <View style={styles.tagRow}>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingText}>{DUMMY_STORE_DATA.rating.toFixed(1)}</Text>
                <View style={{ flexDirection: 'row', marginLeft: 4 }}>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const score = DUMMY_STORE_DATA.rating;
                    let iconName = 'star-outline';
                    if (i < Math.floor(score)) {
                      iconName = 'star';
                    } else if (i < score) {
                      iconName = 'star-half';
                    }
                    return <Ionicons key={i} name={iconName as any} size={14} color="#F2C94C" />;
                  })}
                </View>
                <Text style={styles.reviewCount}>({DUMMY_STORE_DATA.reviewCount} 후기)</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => setLiked(!liked)} style={styles.likeButton}>
            <Ionicons name={liked ? "heart" : "heart-outline"} size={28} color={liked ? '#EB5757' : '#828282'} />
            <Text style={styles.likeText}>찜하기</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={{ marginHorizontal: 16, marginTop: 12 }}>
          <RenderHTML
            contentWidth={width}
            source={{ html: description || DUMMY_STORE_DATA.description }}
          />
        </View>



        {/* Bottom Tabs */}
        <View style={styles.bottomTabs}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Home' && styles.activeTab]}
            onPress={() => setActiveTab('Home')}
          >
            <Text style={[styles.tabText, activeTab === 'Home' && styles.activeTabText]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Review' && styles.activeTab]}
            onPress={() => setActiveTab('Review')}
          >
            <Text style={[styles.tabText, activeTab === 'Review' && styles.activeTabText]}>리뷰</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'QA' && styles.activeTab]}
            onPress={() => setActiveTab('QA')}
          >
            <Text style={[styles.tabText, activeTab === 'QA' && styles.activeTabText]}>Q&A</Text>
          </TouchableOpacity>
        </View>

        {/* Home Content Section */}
        {activeTab === 'Home' && (
          <>
            {/* Info Blocks */}
            <View style={styles.infoBlocks}>
              <View style={styles.infoBlock}>
                <Ionicons name="location-outline" size={24} color="#2F80ED" />
                <View style={styles.infoTextWrapper}>
                  <Text style={styles.infoTitle}>위치안내</Text>
                  <Text style={styles.infoContent}>{location || DUMMY_STORE_DATA.address}</Text>
                </View>
              </View>
              <View style={styles.infoBlock}>
                <Ionicons name="time-outline" size={24} color="#2F80ED" />
                <View style={styles.infoTextWrapper}>
                  <Text style={styles.infoTitle}>영업시간</Text>
                  <Text style={styles.infoContent}>{openingHours || DUMMY_STORE_DATA.openingHours}</Text>
                </View>
              </View>
              <View style={styles.infoBlock}>
                <Ionicons name="call-outline" size={24} color="#2F80ED" />
                <View style={styles.infoTextWrapper}>
                  <Text style={styles.infoTitle}>전화번호</Text>
                  <Text style={styles.infoContent}>{phone || DUMMY_STORE_DATA.phone}</Text>
                </View>
              </View>
              <View style={styles.infoBlock}>
                <Ionicons name="calendar-outline" size={24} color="#2F80ED" />
                <View style={styles.infoTextWrapper}>
                  <Text style={styles.infoTitle}>휴무일</Text>
                  <Text style={styles.infoContent}>
                    {(holidays && holidays.length > 0) ? holidays.join(', ') + ' 휴무' : '정보 없음'}
                  </Text>
                </View>
              </View>
              <View style={styles.infoBlock}>
                <MaterialCommunityIcons name="web" size={24} color="#2F80ED" />
                <View style={styles.infoTextWrapper}>
                  <Text style={styles.infoTitle}>웹사이트</Text>
                  <Text style={styles.infoContent}>{website || DUMMY_STORE_DATA.website}</Text>
                </View>
              </View>
            </View>

            {/* 메뉴 Section */}
            <Text style={styles.menuSectionTitle}>메뉴</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menuScroll}>
              {(menuImages && menuImages.length > 0 ? menuImages : [null]).map((img, idx) => (
                <Image
                  key={idx}
                  source={
                    img
                      ? { uri: img }
                      : DUMMY_STORE_DATA.images[idx % DUMMY_STORE_DATA.images.length]
                  }
                  style={styles.menuImage}
                />
              ))}
            </ScrollView>
          </>
        )}

        {activeTab === 'Review' && (
          <View style={{ marginTop: 24, marginHorizontal: 16 }}>
            {[
              {
                rating: 5.0,
                stars: '★★★★★',
                images: [DUMMY_STORE_DATA.images[0], DUMMY_STORE_DATA.images[1]],
                text: '푸딩을 먹었는데 일본서먹던 깊은 맛이 나서 좋았어요!!!',
              },
              {
                rating: 5.0,
                stars: '★★★★★',
                images: [],
                text: '커피 맛이 좋고 분위기가 아늑해서 자주 방문할 것 같아요~',
              },
              {
                rating: 5.0,
                stars: '★★★★★',
                images: [DUMMY_STORE_DATA.images[2]],
                text: '토마토 파스타랑 귀여운 머그컵까지 완벽했어요!',
              },
            ].map((review, idx) => (
              <View key={idx} style={{ marginBottom: 44 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#333333', marginBottom: 10 }}>
                  {review.rating.toFixed(1)}{' '}
                  <Text style={{ color: '#F2C94C', fontSize: 16 }}>{review.stars}</Text>
                </Text>
                {review.images.length > 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    {review.images.length === 1
                      ? review.images.map((img, i) => (
                          <Image
                            key={i}
                            source={img}
                            resizeMode="cover"
                            style={{
                              width: '100%',
                              height: 180,
                              borderRadius: 16,
                            }}
                          />
                        ))
                      : review.images.map((img, i) => (
                          <Image
                            key={i}
                            source={img}
                            style={{
                              width: 165,
                              height: 120,
                              borderRadius: 16,
                            }}
                          />
                        ))}
                  </View>
                )}
                <Text style={{ fontSize: 15, color: '#333333', fontWeight: '500', marginBottom: 8 }}>
                  {review.text}
                </Text>
                <Text style={{ fontSize: 13, color: '#828282' }}>25.06.05 · 1번째 방문</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'QA' && (
          <View style={{ marginTop: 24, marginHorizontal: 16 }}>
            {(qaList && qaList.length > 0) ? (
              qaList.map((qa, idx) => (
                <View key={idx} style={{ marginBottom: 24 }}>
                  <TouchableOpacity
                    onPress={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#1C1C1E', marginBottom: 10 }}>
                      {qa.question}
                    </Text>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>{expandedIndex === idx ? '˄' : '˅'}</Text>
                  </TouchableOpacity>
                  {expandedIndex === idx && (
                    <View style={{ backgroundColor: '#F2F4F7', padding: 14, borderRadius: 12 }}>
                      <Text style={{ fontSize: 14, color: '#4F4F4F', lineHeight: 20 }}>{qa.answer}</Text>
                    </View>
                  )}
                </View>
              ))
            ) : (
              <Text style={{ color: '#999' }}>등록된 Q&amp;A가 없습니다.</Text>
            )}
          </View>
        )}

        {/* 리뷰 and Q&A tabs can be implemented later */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerIcon: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  imageGrid: {
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  storeInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginTop: 8,
  },
  storeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
  },
  inlineStoreTag: {
    fontSize: 14,
    color: '#828282',
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    textAlignVertical: 'center',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  storeTag: {
    fontSize: 14,
    color: '#828282',
    borderWidth: 1,
    borderColor: '#2F80ED',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#4F4F4F',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#828282',
    marginLeft: 6,
  },
  likeButton: {
    alignItems: 'center',
  },
  likeText: {
    fontSize: 12,
    color: '#828282',
    marginTop: 2,
  },
  storeDescription: {
    marginHorizontal: 16,
    marginTop: 12,
    fontSize: 14,
    color: '#4F4F4F',
    lineHeight: 20,
  },
  editButtonsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  editButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2F80ED',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    marginHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F80ED',
  },
  sparkleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2F80ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    padding: 8,
  },
  bottomTabs: {
    flexDirection: 'row',
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2F80ED',
  },
  tabText: {
    fontSize: 16,
    color: '#828282',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#2F80ED',
  },
  infoBlocks: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  infoTextWrapper: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  infoContent: {
    fontSize: 14,
    color: '#4F4F4F',
    lineHeight: 20,
  },
  menuSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  menuScroll: {
    paddingLeft: 16,
    marginBottom: 32,
  },
  menuImage: {
    width: 140,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
});
