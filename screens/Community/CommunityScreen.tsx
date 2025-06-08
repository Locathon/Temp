import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ImageSourcePropType,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// ⭐️ 게시글 데이터의 타입을 정의합니다.
type Post = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  // ⭐️ image 프로퍼티를 images 배열로 변경합니다.
  images: ImageSourcePropType[];
  likes: number;
  comments: number;
  timestamp: string;
};

// 임시 데이터 (나중에 API로 대체)
const DUMMY_POSTS: Post[] = [
  {
    id: '1',
    author: '행궁동 전문가',
    avatar: 'https://placehold.co/100x100/EFEFEF/AAAAAA?text=User',
    content: '요즘 행궁동에서 가장 핫한 카페는 어디인가요? 저는 개인적으로 온멜로 추천합니다! 분위기가 정말 좋아요.',
    // ⭐️ images 배열에 두 개의 이미지를 모두 추가합니다.
    images: [
      require('../../assets/images/onmelo_food.jpg'),
      require('../../assets/images/onmelo_interior.jpg'),
    ],
    likes: 15,
    comments: 4,
    timestamp: '5분 전',
  },
  {
    id: '2',
    author: '느린행궁러버',
    avatar: 'https://placehold.co/100x100/EFEFEF/AAAAAA?text=User',
    content: '방화수류정에서 피크닉하실 분 구해요~ 날씨가 너무 좋네요!',
    // ⭐️ 이미지가 없는 게시글은 빈 배열로 처리합니다.
    images: [],
    likes: 22,
    comments: 8,
    timestamp: '30분 전',
  },
];

type RootStackParamList = {
  PostDetail: { postId: string };
  CreatePost: undefined;
};

type CommunityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PostCard = ({ post }: { post: Post }) => {
  const navigation = useNavigation<CommunityScreenNavigationProp>();
  // ⭐️ 화면 너비를 가져와 이미지 크기 계산
  const { width } = Dimensions.get('window');
  const cardWidth = width - 32; // 양쪽 margin(16*2)
  const imageWidth = cardWidth;

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<ImageSourcePropType>>(null);

  // ⭐️ 사용자가 이미지를 스크롤할 때 현재 페이지를 계산하는 함수
  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / imageWidth);
    setCurrentIndex(index);
  };

  // ⭐️ 다음 이미지로 스크롤하는 함수
  const scrollToNext = () => {
    if (currentIndex < post.images.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  // ⭐️ 이전 이미지로 스크롤하는 함수
  const scrollToPrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PostDetail', { postId: post.id })}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.author}>{post.author}</Text>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
      </View>
      <Text style={styles.content}>{post.content}</Text>

      {/* ⭐️ 이미지 슬라이더(캐러셀) 구현 */}
      {post.images && post.images.length > 0 && (
        <View style={styles.imageSliderContainer}>
          <FlatList
            ref={flatListRef}
            data={post.images}
            renderItem={({ item }) => (
              <Image source={item} style={[styles.postImage, { width: imageWidth }]} />
            )}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            getItemLayout={(_, index) => ({
              length: imageWidth,
              offset: imageWidth * index,
              index,
            })}
          />
          {/* ⭐️ 좌우 이동 화살표 */}
          {currentIndex > 0 && (
            <TouchableOpacity style={[styles.arrow, styles.arrowLeft]} onPress={scrollToPrev}>
              <Ionicons name="chevron-back-outline" size={30} color="#fff" />
            </TouchableOpacity>
          )}
          {currentIndex < post.images.length - 1 && (
            <TouchableOpacity style={[styles.arrow, styles.arrowRight]} onPress={scrollToNext}>
              <Ionicons name="chevron-forward-outline" size={30} color="#fff" />
            </TouchableOpacity>
          )}

          {/* ⭐️ 페이지네이션(점) 표시 */}
          <View style={styles.paginationContainer}>
            {post.images.map((_, index) => (
              <View key={index} style={[styles.dot, index === currentIndex ? styles.activeDot : {}]} />
            ))}
          </View>
        </View>
      )}

      <View style={styles.cardFooter}>
        <View style={styles.footerAction}>
          <Ionicons name="heart-outline" size={20} color="#828282" />
          <Text style={styles.footerText}>{post.likes}</Text>
        </View>
        <View style={styles.footerAction}>
          <Ionicons name="chatbubble-outline" size={20} color="#828282" />
          <Text style={styles.footerText}>{post.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function CommunityScreen() {
  const navigation = useNavigation<CommunityScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>커뮤니티</Text>
      </View>
      <FlatList
        data={DUMMY_POSTS}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreatePost')}>
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#E0E0E0', backgroundColor: '#FFFFFF' },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  card: { backgroundColor: '#FFFFFF', padding: 16, marginVertical: 8, marginHorizontal: 16, borderRadius: 10 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  author: { fontWeight: 'bold' },
  timestamp: { fontSize: 12, color: '#828282' },
  content: { fontSize: 16, lineHeight: 24, marginBottom: 12 },
  // ⭐️ 이미지 슬라이더 관련 스타일 추가
  imageSliderContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  postImage: {
    // ⭐️ width는 FlatList에서 동적으로 설정하고, aspectRatio를 이용해 3:4 비율을 만듭니다.
    height: undefined,
    aspectRatio: 3 / 4,
    resizeMode: 'cover',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    marginTop: -22, // 아이콘 크기에 맞게 조정
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLeft: {
    left: 10,
  },
  arrowRight: {
    right: 10,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
  },
  //
  cardFooter: { flexDirection: 'row', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F2F2F2' },
  footerAction: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  footerText: { marginLeft: 6, color: '#828282' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#2F80ED', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
});
