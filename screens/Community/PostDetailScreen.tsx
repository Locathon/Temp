import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Post 타입 정의 (iLiked 추가)
type Post = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  images: ImageSourcePropType[];
  likes: number;
  iLiked: boolean; // 내가 '좋아요'를 눌렀는지 여부
  comments: number;
  timestamp: string;
};

// 임시 데이터 (iLiked 속성 추가)
const DUMMY_POSTS: Post[] = [
  {
    id: '1', author: '행궁동 전문가', avatar: 'https://placehold.co/100x100/EFEFEF/AAAAAA?text=User',
    content: '요즘 행궁동에서 가장 핫한 카페는 어디인가요? 저는 개인적으로 온멜로 추천합니다! 분위기가 정말 좋아요.',
    images: [require('../../assets/images/onmelo_food.jpg'), require('../../assets/images/onmelo_interior.jpg')],
    likes: 15, iLiked: false, comments: 4, timestamp: '5분 전',
  },
  {
    id: '2', author: '느린행궁러버', avatar: 'https://placehold.co/100x100/EFEFEF/AAAAAA?text=User',
    content: '방화수류정에서 피크닉하실 분 구해요~ 날씨가 너무 좋네요!',
    images: [], likes: 22, iLiked: true, comments: 8, timestamp: '30분 전',
  },
];

type Comment = {
  id: string; author: string; avatar: string;
  content: string; timestamp: string;
};

const DUMMY_COMMENTS: { [key: string]: Comment[] } = {
  '1': [
    { id: 'c1', author: '맛잘알', avatar: 'https://placehold.co/100x100/AABBCC/FFFFFF?text=M', content: '와 여기 진짜 맛있죠! 저도 가봤어요. 풍기 크림 파스타 추천!', timestamp: '3분 전' },
    { id: 'c2', author: '행궁동주민', avatar: 'https://placehold.co/100x100/CCAABB/FFFFFF?text=H', content: '분위기가 정말 최고에요 👍 데이트 장소로 강추합니다.', timestamp: '1분 전' },
  ],
  '2': [
    { id: 'c3', author: '피크닉매니아', avatar: 'https://placehold.co/100x100/BBAACC/FFFFFF?text=P', content: '저요! 어디서 만날까요? 김밥 싸갈게요!', timestamp: '10분 전' },
  ],
};

type PostDetailRouteProp = RouteProp<{ PostDetail: { postId: string } }, 'PostDetail'>;

const PostCard = ({ post, handleToggleLike }: { post: Post; handleToggleLike: (postId: string) => void; }) => {
  const { width } = Dimensions.get('window');
  const imageWidth = width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<ImageSourcePropType>>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / imageWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.author}>{post.author}</Text>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
      </View>
      <Text style={styles.content}>{post.content}</Text>
      {post.images && post.images.length > 0 && (
        <View style={styles.imageSliderContainer}>
          <FlatList
            ref={flatListRef} data={post.images}
            renderItem={({ item }) => <Image source={item} style={[styles.postImage, { width: imageWidth }]} />}
            keyExtractor={(_, index) => index.toString()}
            horizontal pagingEnabled showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
          />
          <View style={styles.paginationContainer}>
            {post.images.map((_, index) => (
              <View key={index} style={[styles.dot, index === currentIndex ? styles.activeDot : {}]} />
            ))}
          </View>
        </View>
      )}
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.footerAction} onPress={() => handleToggleLike(post.id)}>
          <Ionicons name={post.iLiked ? 'heart' : 'heart-outline'} size={20} color={post.iLiked ? '#EB5757' : '#828282'} />
          <Text style={[styles.footerText, post.iLiked && { color: '#EB5757' }]}>{post.likes}</Text>
        </TouchableOpacity>
        <View style={styles.footerAction}>
          <Ionicons name="chatbubble-outline" size={20} color="#828282" />
          <Text style={styles.footerText}>{post.comments}</Text>
        </View>
      </View>
    </View>
  );
};

export default function PostDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<PostDetailRouteProp>();
  const { postId } = route.params;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const foundPost = DUMMY_POSTS.find(p => p.id === postId);
    if (foundPost) {
      setPost(foundPost);
      setComments(DUMMY_COMMENTS[postId] || []);
    }
  }, [postId]);

  const handleToggleLike = (postId: string) => {
    setPost(currentPost => {
      if (currentPost && currentPost.id === postId) {
        return {
          ...currentPost,
          iLiked: !currentPost.iLiked,
          likes: currentPost.iLiked ? currentPost.likes - 1 : currentPost.likes + 1,
        };
      }
      return currentPost;
    });
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const newCommentObject: Comment = {
      id: `c${Date.now()}`,
      author: '나(사용자)',
      avatar: 'https://placehold.co/100x100/1E90FF/FFFFFF?text=Me',
      content: newComment,
      timestamp: '방금 전',
    };
    setComments(prevComments => [...prevComments, newCommentObject]);
    setNewComment('');
    Alert.alert('성공', '댓글이 등록되었습니다.');
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentBubble}>
        <Text style={styles.commentAuthor}>{item.author}</Text>
        <Text style={styles.commentContent}>{item.content}</Text>
        <Text style={styles.commentTimestamp}>{item.timestamp}</Text>
      </View>
    </View>
  );

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>게시물을 불러오는 중...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>게시글</Text>
        <View style={{ width: 24 }} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<PostCard post={post} handleToggleLike={handleToggleLike} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChangeText={setNewComment}
            placeholderTextColor="#828282"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#FFFFFF', paddingBottom: 16, marginBottom: 8 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingHorizontal: 16, paddingTop: 16,},
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  author: { fontWeight: 'bold' },
  timestamp: { fontSize: 12, color: '#828282' },
  content: { fontSize: 16, lineHeight: 24, marginBottom: 12, paddingHorizontal: 16,},
  imageSliderContainer: { marginBottom: 12 },
  postImage: { height: undefined, aspectRatio: 3 / 4, resizeMode: 'cover' },
  paginationContainer: { position: 'absolute', bottom: 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginHorizontal: 4 },
  activeDot: { backgroundColor: '#FFFFFF' },
  cardFooter: { flexDirection: 'row', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F2F2F2', marginHorizontal: 16,},
  footerAction: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  footerText: { marginLeft: 6, color: '#828282' },
  commentContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F2F2F2'},
  commentAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 12 },
  commentBubble: { flex: 1, backgroundColor: '#F2F2F7', borderRadius: 10, padding: 12, },
  commentAuthor: { fontWeight: 'bold', marginBottom: 4 },
  commentContent: {},
  commentTimestamp: { fontSize: 10, color: '#828282', marginTop: 4, alignSelf: 'flex-end' },
  commentInputContainer: { flexDirection: 'row', alignItems: 'center', padding: 8, borderTopWidth: 1, borderTopColor: '#E0E0E0', backgroundColor: '#FFFFFF' },
  commentInput: { flex: 1, backgroundColor: '#F2F2F7', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 16, marginRight: 8, fontSize: 16, },
  sendButton: { backgroundColor: '#2F80ED', borderRadius: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
});
