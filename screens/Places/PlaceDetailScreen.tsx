import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// --- 이 파일은 서버 통신 없이, 오직 미리 정의된 더미 데이터만 사용합니다. ---

// 댓글 타입을 정의합니다.
type Comment = {
  id: string;
  user: {
    name: string;
    avatar: any; 
  };
  text: string;
  timestamp: string;
  stats: {
    likes: number;
    comments: number;
    bookmarks: number;
  };
  replies?: Comment[]; 
};

// 상세 데이터 타입을 정의합니다.
type PlaceDetail = {
    id: string;
    name: string;
    image: any;
    tags: string[];
    description: string;
    stats: { likes: number; comments: number; bookmarks: number; };
    comments: Comment[];
};

type PlaceId = 'place1' | 'place2' | 'place3' | 'place4';

const DUMMY_DETAILS: Record<PlaceId, PlaceDetail> = {
  place1: {
    id: 'place1',
    name: '레몬트리',
    image: require('../../assets/images/desserts/cafe_menu.jpg'),
    tags: ['#행궁인장', '#디저트'],
    description:
      '드디어 레몬트리가 행궁인장을 받았어요! 행궁인장 기념 10% 세일 이벤트 열었으니 확인해보세요~!',
    stats: { likes: 14, comments: 3, bookmarks: 7 },
    comments: [
        {
          id: 'comment1',
          user: { name: '다주', avatar: require('../../assets/images/avatar1.jpg') },
          text: '여기 커피 맛있죠^^ 다만 알바생이 좀 불친절....',
          timestamp: '1분 전',
          stats: { likes: 5, comments: 1, bookmarks: 7 },
          replies: [
            {
              id: 'reply1',
              user: { name: '다주', avatar: require('../../assets/images/avatar1.jpg') },
              text: '그래도 커피는 추천드립니다',
              timestamp: '1분 전',
              stats: { likes: 5, comments: 0, bookmarks: 7 },
            },
          ],
        },
        {
          id: 'comment2',
          user: { name: '빛의 전사', avatar: require('../../assets/images/avatar2.jpg') },
          text: '저도 어제 여기 갔었는데!!!!',
          timestamp: '1분 전',
          stats: { likes: 5, comments: 0, bookmarks: 7 },
          replies: [],
        },
      ],
  },
  place2: {
    id: 'place2',
    name: '온멜로',
    image: require('../../assets/images/onmelo_food.jpg'),
    tags: ['#파스타', '#데이트'],
    description: '분위기 좋은 이탈리안 레스토랑입니다. 특별한 날 방문하기 좋아요.',
    stats: { likes: 152, comments: 34, bookmarks: 88 },
    comments: [],
  },
  place3: {
    id: 'place3',
    name: '수원시립아이파크미술관',
    image: require('../../assets/images/ipark_museum.jpg'),
    tags: ['#전시', '#문화생활'],
    description: '현대미술을 중심으로 다양한 기획 전시를 선보이는 곳입니다.',
    stats: { likes: 230, comments: 45, bookmarks: 120 },
    comments: [],
  },
  place4: {
    id: 'place4',
    name: '방화수류정',
    image: require('../../assets/images/banghwasuryujeong.jpg'),
    tags: ['#산책', '#야경'],
    description: '수원 화성의 동북각루로, 연못과 어우러진 경치가 아름답습니다.',
    stats: { likes: 987, comments: 120, bookmarks: 450 },
    comments: [],
  },
};

const ActionRow = ({ stats }: { stats: Comment['stats'] }) => (
  <View style={styles.actionRow}>
    <TouchableOpacity style={styles.actionButton}>
      <Ionicons name="chatbubble-outline" size={16} color="#555" />
      <Text style={styles.actionText}>{stats.comments}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.actionButton}>
      <Ionicons name="heart-outline" size={16} color="#555" />
      <Text style={styles.actionText}>{stats.likes}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.actionButton}>
      <Ionicons name="bookmark-outline" size={16} color="#555" />
      <Text style={styles.actionText}>{stats.bookmarks}</Text>
    </TouchableOpacity>
  </View>
);

const CommentItem = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => {
    return (
        <View style={{ marginLeft: isReply ? 30 : 0, marginTop: 16 }}>
            <View style={styles.commentContainer}>
                <Image source={comment.user.avatar} style={styles.avatar} />
                <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                        <Text style={styles.commentUser}>{comment.user.name}</Text>
                        <Text style={styles.commentTime}>{comment.timestamp}</Text>
                        <TouchableOpacity>
                            <Ionicons name="ellipsis-horizontal" size={16} color="#888" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.commentText}>{comment.text}</Text>
                    <ActionRow stats={comment.stats} />
                </View>
            </View>
            {comment.replies?.map((reply: Comment) => ( 
                <CommentItem key={reply.id} comment={reply} isReply={true} />
            ))}
        </View>
    );
};

export default function PlaceDetailScreen({ route }: any) {
  const navigation = useNavigation();
  const { id } = route.params as { id: PlaceId };
  const place = DUMMY_DETAILS[id] || DUMMY_DETAILS['place1']; 

  // [핵심] 서버에 데이터를 요청하는 fetch 로직을 모두 제거했습니다.

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                <Ionicons name="arrow-back" size={24} color="#121212" />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{place.name}</Text>
                <Ionicons name="star" size={20} color="#FFBB29" />
            </View>
            <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="ellipsis-horizontal" size={24} color="#121212" />
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Image source={place.image} style={styles.image} />
            <View style={styles.tagContainer}>
            {place.tags.map((tag: string) => (
                <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                </View>
            ))}
            </View>
            <Text style={styles.description}>{place.description}</Text>
            <ActionRow stats={place.stats} />
            <View style={styles.separator} />
            {place.comments.map((comment: Comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FEFEFE',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: '#EBEEEF',
    },
    headerButton: {
        padding: 4,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Pretendard-SemiBold',
        color: '#121212',
    },
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    tagContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 16,
        marginHorizontal: 16,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#F0F8FF',
        borderRadius: 12,
    },
    tagText: {
        color: '#48C8FF',
        fontSize: 12,
        fontWeight: '500',
        fontFamily: 'Pretendard-Medium'
    },
    description: {
        fontSize: 15,
        color: '#3A4043',
        lineHeight: 22,
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 16,
        fontFamily: 'Pretendard-Regular'
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
        gap: 16
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    actionText: {
        fontSize: 14,
        color: '#555',
        fontFamily: 'Pretendard-Regular'
    },
    separator: {
        height: 8,
        backgroundColor: '#F8F9FA',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EBEEEF',
    },
    commentContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        paddingBottom: 16, // 댓글 아래 간격 추가
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,
    },
    commentContent: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentUser: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Pretendard-SemiBold',
        color: '#121212',
    },
    commentTime: {
        fontSize: 12,
        color: '#A8B5BB',
        marginLeft: 8,
        fontFamily: 'Pretendard-Regular'
    },
    commentText: {
        fontSize: 14,
        color: '#3A4043',
        marginTop: 4,
        marginBottom: 8,
        lineHeight: 20,
        fontFamily: 'Pretendard-Regular'
    }
});
