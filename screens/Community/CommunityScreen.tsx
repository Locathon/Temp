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
import { useAuth } from '../../contexts/AuthContext'; // AuthContext 훅 import

// --- 기존 Post, ParamList 타입 정의 (변경 없음) ---
type Post = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  images: ImageSourcePropType[];
  likes: number;
  iLiked: boolean;
  comments: number;
  timestamp: string;
};

const DUMMY_POSTS: Post[] = [
  {
    id: '1',
    author: '행궁동 전문가',
    avatar: 'https://placehold.co/100x100/EFEFEF/AAAAAA?text=User',
    content: '요즘 행궁동에서 가장 핫한 카페는 어디인가요? 저는 개인적으로 온멜로 추천합니다! 분위기가 정말 좋아요.',
    images: [
      require('../../assets/images/onmelo_food.jpg'),
      require('../../assets/images/onmelo_interior.jpg'),
    ],
    likes: 15,
    iLiked: false,
    comments: 4,
    timestamp: '5분 전',
  },
  {
    id: '2',
    author: '느린행궁러버',
    avatar: 'https://placehold.co/100x100/EFEFEF/AAAAAA?text=User',
    content: '방화수류정에서 피크닉하실 분 구해요~ 날씨가 너무 좋네요!',
    images: [],
    likes: 22,
    iLiked: true,
    comments: 8,
    timestamp: '30분 전',
  },
];

type RootStackParamList = {
  PostDetail: { postId: string };
  CreatePost: undefined;
  Login: undefined; // 로그인 화면으로 이동하기 위해 추가
};
type CommunityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// --- 기존 PostCard 컴포넌트 (변경 없음) ---
const PostCard = ({ post, handleToggleLike }: { post: Post; handleToggleLike: (postId: string) => void }) => {
  const navigation = useNavigation<CommunityScreenNavigationProp>();
  const { width } = Dimensions.get('window');
  const cardWidth = width - 32;
  const imageWidth = cardWidth;

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<ImageSourcePropType>>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / imageWidth);
    setCurrentIndex(index);
  };

  const scrollToNext = () => {
    if (currentIndex < post.images.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  return (
    <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: post.id })}>
            <View style={styles.cardHeader}>
                <Image source={{ uri: post.avatar }} style={styles.avatar} />
                <View>
                <Text style={styles.author}>{post.author}</Text>
                <Text style={styles.timestamp}>{post.timestamp}</Text>
                </View>
            </View>
            <Text style={styles.content}>{post.content}</Text>
        </TouchableOpacity>

      {post.images && post.images.length > 0 && (
        <View style={styles.imageSliderContainer}>
          <FlatList
            ref={flatListRef} data={post.images}
            renderItem={({ item }) => <Image source={item} style={[styles.postImage, { width: imageWidth }]} />}
            keyExtractor={(_, index) => index.toString()}
            horizontal pagingEnabled showsHorizontalScrollIndicator={false}
            onScroll={handleScroll} scrollEventThrottle={16}
            getItemLayout={(_, index) => ({ length: imageWidth, offset: imageWidth * index, index, })}
          />
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
          <View style={styles.paginationContainer}>
            {post.images.map((_, index) => (
              <View key={index} style={[styles.dot, index === currentIndex ? styles.activeDot : {}]} />
            ))}
          </View>
        </View>
      )}

      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.footerAction} onPress={() => handleToggleLike(post.id)}>
          <Ionicons
            name={post.iLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={post.iLiked ? '#EB5757' : '#828282'}
          />
          <Text style={[styles.footerText, post.iLiked && { color: '#EB5757' }]}>{post.likes}</Text>
        </TouchableOpacity>
  <TouchableOpacity style={styles.footerAction} onPress={() => navigation.navigate('PostDetail', { postId: post.id })}>
    <Ionicons name="chatbubble-outline" size={20} color="#828282" />
    <Text style={styles.footerText}>{post.comments}</Text>
  </TouchableOpacity>
      </View>
    </View>
  );
};


// ⭐️ 로그인하지 않았을 때 보여줄 화면 컴포넌트
const NotLoggedInView = () => {
    const navigation = useNavigation<CommunityScreenNavigationProp>();
    return (
      <View style={styles.notLoggedInContainer}>
        <Ionicons name="people-circle-outline" size={80} color="#BDBDBD" />
        <Text style={styles.notLoggedInTitle}>함께 여행을 떠나볼까요?</Text>
        <Text style={styles.notLoggedInSubtitle}>로그인이 필요한 서비스에요.</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>로그인/회원가입</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
// ⭐️ 메인 커뮤니티 화면 컴포넌트
export default function CommunityScreen() {
  const navigation = useNavigation<CommunityScreenNavigationProp>();
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const { isLoggedIn } = useAuth(); // AuthContext에서 로그인 상태 가져오기

  const handleToggleLike = (postId: string) => {
    setPosts(currentPosts =>
      currentPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            iLiked: !post.iLiked,
            likes: post.iLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>커뮤니티</Text>
      </View>

      {/* ⭐️ 로그인 상태에 따라 다른 내용을 보여줍니다. */}
      {isLoggedIn ? (
        <>
          <FlatList
            data={posts}
            renderItem={({ item }) => <PostCard post={item} handleToggleLike={handleToggleLike} />}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
          <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreatePost')}>
            <Ionicons name="add" size={32} color="#FFFFFF" />
          </TouchableOpacity>
        </>
      ) : (
        <NotLoggedInView />
      )}
    </SafeAreaView>
  );
}

// ⭐️ 스타일시트에 로그인 유도 화면 관련 스타일 추가
const styles = StyleSheet.create({
    notLoggedInContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        backgroundColor: '#F2F2F7',
    },
    notLoggedInTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#4F4F4F',
    },
    notLoggedInSubtitle: {
        fontSize: 16,
        color: '#828282',
        marginTop: 8,
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: '#2F80ED',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: { flex: 1, backgroundColor: '#F2F2F7' },
    header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#E0E0E0', backgroundColor: '#FFFFFF' },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    card: { backgroundColor: '#FFFFFF', padding: 16, marginVertical: 8, marginHorizontal: 16, borderRadius: 10 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
    author: { fontWeight: 'bold' },
    timestamp: { fontSize: 12, color: '#828282' },
    content: { fontSize: 16, lineHeight: 24, marginBottom: 12 },
    imageSliderContainer: { borderRadius: 10, overflow: 'hidden', marginBottom: 12 },
    postImage: { height: undefined, aspectRatio: 3 / 4, resizeMode: 'cover' },
    arrow: { position: 'absolute', top: '50%', marginTop: -22, backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 22, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    arrowLeft: { left: 10 },
    arrowRight: { right: 10 },
    paginationContainer: { position: 'absolute', bottom: 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginHorizontal: 4 },
    activeDot: { backgroundColor: '#FFFFFF' },
    cardFooter: { flexDirection: 'row', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F2F2F2' },
    footerAction: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
    footerText: { marginLeft: 6, color: '#828282' },
    fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#2F80ED', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
});
