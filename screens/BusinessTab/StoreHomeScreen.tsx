import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type BusinessStackParamList = {
  EditProfileScreen: undefined;
  AutoQnAScreen: undefined;
  NewPostScreen: { newPost?: { content: string; images: string[] } };
  RegisterStore: undefined; // ⭐️ 네비게이션 타입에 RegisterStore 추가
};

export default function StoreHomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<BusinessStackParamList>>();
  const route = useRoute<RouteProp<BusinessStackParamList, 'NewPostScreen'>>();
  const [posts, setPosts] = React.useState<{ content: string; images: string[] }[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const newPost = route.params?.newPost;
            setPosts(prev => {
        if (!newPost) return prev;
        const exists = prev.some(
          post =>
            post.content === newPost.content &&
            JSON.stringify(post.images) === JSON.stringify(newPost.images)
        );
        return exists ? prev : [newPost, ...prev];
      });
    });

    return unsubscribe;
  }, [navigation, route.params?.newPost]);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setCurrentImageIndex(index);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 상단 프로필 영역 */}
      <View style={styles.profileBox}>
        <View style={styles.profileRow}>
          <View style={styles.profileImagePlaceholder} />
          <View>
            <Text style={styles.storeName}>000 ⭐</Text>
            <Text style={styles.category}>디저트 카페</Text>
          </View>
        </View>

        {/* ⭐️ 프로필 수정 및 가게 등록 버튼 컨테이너 */}
        <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfileScreen')}>
              <Ionicons name="create-outline" size={14} color="#333" />
              <Text style={styles.editText}>프로필 수정</Text>
            </TouchableOpacity>
            {/* ⭐️ '가게 등록' 버튼을 여기에 추가합니다! */}
            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('RegisterStore')}>
              {/* ⭐️ 아이콘 이름을 'business-outline'으로 수정 */}
              <Ionicons name="business-outline" size={14} color="#FFF" />
              <Text style={styles.registerText}>가게 등록</Text>
            </TouchableOpacity>
        </View>


        <View style={styles.infoRow}>
          <Text>📍 위치 정보</Text>
          <Text>⏰ 운영 시간</Text>
          <Text>#해시태그</Text>
        </View>
      </View>

      {/* 자동 Q&A 버튼 */}
      <TouchableOpacity style={styles.qaButton} onPress={() => navigation.navigate('AutoQnAScreen')}>
        <Text style={styles.qaText}>자동 Q&A</Text>
      </TouchableOpacity>

      {/* 새 글 작성 */}
      <TouchableOpacity
        style={styles.newPostBar}
        onPress={() =>
          navigation.navigate('NewPostScreen', {
            newPost: { content: '', images: [] },
          })
        }
      >
        <View style={styles.newPostIcon} />
        <Text style={styles.newPostText}>새로운 글을 포스팅 하시겠습니까?</Text>
        <Text style={styles.plus}>＋</Text>
      </TouchableOpacity>

      {/* 게시물 미리보기 카드 */}
      {posts.map((post, postIndex) => (
        <View key={postIndex} style={styles.postCard}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.imageScroll}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {post.images.map((uri: string, index: number) => (
              <View key={index} style={{ width: Dimensions.get('window').width - 65 }}>
                <Image source={{ uri }} style={styles.postImage} />
              </View>
            ))}
          </ScrollView>
          <View style={styles.dotContainer}>
            {post.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentImageIndex ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
          <View style={styles.postContentBox}>
            <Text style={styles.postTitle}>{post.content}</Text>
            <TouchableOpacity>
              <Text style={styles.heart}>🤍</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileBox: { padding: 20, alignItems: 'flex-start', position: 'relative', borderBottomWidth: 1, borderBottomColor: '#F2F2F2' },
  category: { marginTop: 5, color: '#888' },

  // ⭐️ 버튼 그룹 스타일 추가
  buttonGroup: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  editText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 4,
  },
  // ⭐️ 가게 등록 버튼 스타일 추가
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#2F80ED',
    borderRadius: 15,
  },
  registerText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 4,
  },

  qaButton: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  qaText: { fontWeight: '500' },

  newPostBar: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 15,
  },
  newPostText: { fontSize: 14 },
  plus: { fontSize: 18, fontWeight: 'bold' },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoRow: {
    marginTop: 15, // 버튼 그룹과 겹치지 않도록 간격 조정
    gap: 4,
  },
  newPostIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#ccc',
    borderRadius: 6,
  },
  postCard: {
    margin: 20,
    backgroundColor: '#eee',
    borderRadius: 12,
    padding: 12,
  },
  imageScroll: {
    height: 400,
  },
  postImage: {
    width: Dimensions.get('window').width - 50,
    height: 400,
    resizeMode: 'cover',
  },
  postContentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  heart: {},
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#aaa',
  },
});
