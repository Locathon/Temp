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
  name: '온멜로',
  tag: '디저트카페',
  images: [
    require('../../assets/images/onmelo_interior.jpg'),
    require('../../assets/images/onmelo_interior.jpg'),
    require('../../assets/images/onmelo_interior.jpg'),
    require('../../assets/images/onmelo_interior.jpg'),
  ],
  address: '수원시 팔달구 신풍로63번길 3-1 1층',
  phone: '0507-1335-9715',
  website: 'www.onmelo.com',
  rating: 4.5,
  reviewCount: 89,
  description: '달콤한 디저트와 커피가 있는 아늑한 공간입니다. 신선한 재료로 만든 수제 케이크와 다양한 음료를 즐겨보세요.',
  stats: {
    visitors: '1,234',
    likes: 456,
    reviews: 89,
  },
  openingHours: '월-금 10:00 - 20:00\n토-일 11:00 - 18:00',
};

export default function StoreHomeScreen() {
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
  // Always set qaList from route.params.qas on first mount
  useEffect(() => {
    if (route.params?.qas && Array.isArray(route.params.qas)) {
      console.log('초기 QAs 설정됨:', route.params.qas);
      setQaList(route.params.qas);
    } else {
      console.log('초기 QAs 없음, 빈 배열로 초기화');
      setQaList([]);
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

        {/* Edit Buttons */}
        <View style={styles.editButtonsRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate('EditStore', {
                name,
                description,
                tag,
                location,
                startHour,
                endHour,
                phone,
                website,
                holidays,
              })
            }
          >
            <Text style={styles.editButtonText}>스토어 편집</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate('QASetup', {
                qaList: qaList.map(({ question, answer }) => ({ question, answer })),
              })
            }
          >
            <Text style={styles.editButtonText}>Q&A 수정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sparkleButton} onPress={() => navigation.navigate('GenerateMarketing')}>
            <Image source={aiTransitionIcon} style={{ width: 24, height: 24, tintColor: 'white' }} />
          </TouchableOpacity>
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
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#333333', marginBottom: 8 }}>
              4.0 <Text style={{ color: '#000000' }}>★★★★★</Text>
            </Text>
            <View style={{ flexDirection: 'row', columnGap: 12, marginBottom: 12 }}>
              <Image source={DUMMY_STORE_DATA.images[0]} style={{ width: 150, height: 110, borderRadius: 12 }} />
              <Image source={DUMMY_STORE_DATA.images[1]} style={{ width: 150, height: 110, borderRadius: 12 }} />
            </View>
            <Text style={{ fontSize: 15, color: '#333333', fontWeight: '500', marginBottom: 6 }}>
              푸딩을 먹었는데 일본서먹던 깊은 맛이 나서 좋았어요!!!
            </Text>
            <Text style={{ fontSize: 13, color: '#828282' }}>25.06.05 · 1번째 방문</Text>
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
    marginHorizontal: 16,
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
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
