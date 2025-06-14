import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Post, posts } from '../../data/communityData';
import { users } from '../../data/userData';
import { CommunityStackParamList } from '../../navigation/CommunityNavigator';

const CommunityScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<CommunityStackParamList>>();
  const [activeFilter, setActiveFilter] = useState<'최근' | '인기' | '추천' | '동네소식'>('최근');
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    let filteredAndSortedPosts = [...posts];
    if (activeFilter === '동네소식') {
      filteredAndSortedPosts = filteredAndSortedPosts.filter(
        (post) => post.category === '동네소식'
      );
    } else if (activeFilter === '추천') {
      filteredAndSortedPosts = filteredAndSortedPosts.filter(
        (post) => post.isRecommended
      );
    }

    if (activeFilter === '인기') {
      filteredAndSortedPosts.sort((a, b) => b.likes - a.likes);
    } else {
      filteredAndSortedPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    
    setDisplayedPosts(filteredAndSortedPosts);
  }, [activeFilter, isFocused]);

  // 변경점: PostCard 컴포넌트 대신, 화면 내부에 렌더링 함수를 정의합니다.
  const renderPostCard = ({ item }: { item: Post }) => {
    const author = users.find(u => u.id === item.userId);
  
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
      >
        <View style={styles.cardHeader}>
          {author &&
              <TouchableOpacity 
                style={styles.authorInfo}
                onPress={() => navigation.navigate('UserProfile', { userId: item.userId })}
              >
                  <Image source={author.avatar} style={styles.avatar} />
                  <View>
                    <Text style={styles.authorName}>{author.name}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                  </View>
              </TouchableOpacity>
          }
          <View style={[ styles.categoryBadge ]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
         <View style={styles.cardBody}>
          <View style={styles.textContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content} numberOfLines={2}>{item.content}</Text>
          </View>
          {item.images && item.images.length > 0 && (
            <Image source={item.images[0]} style={styles.thumbnail} />
          )}
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.action}>
              <Ionicons name="heart-outline" size={16} color="#828282" />
              <Text style={styles.actionText}>{item.likes}</Text>
          </View>
          <View style={styles.action}>
              <Ionicons name="chatbubble-outline" size={16} color="#828282" />
              <Text style={styles.actionText}>{item.commentsCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.location}>
          <Text style={styles.locationText}>행궁동</Text>
          <Ionicons name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => navigation.navigate('Notification')}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sortTabs}>
        {(['최근', '인기', '추천', '동네소식'] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[styles.sortButton, activeFilter === filter && styles.activeSortButton]}
          >
            <Text style={[styles.sortText, activeFilter === filter && styles.activeSortText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={displayedPosts}
        // 변경점: 새로 정의한 렌더링 함수를 사용합니다.
        renderItem={renderPostCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Ionicons name="add" size={32} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingBottom: 8 },
    location: { flexDirection: 'row', alignItems: 'center' },
    locationText: { fontSize: 20, fontWeight: 'bold' },
    headerIcons: { flexDirection: 'row' },
    sortTabs: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, },
    sortButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F2', marginRight: 8, },
    activeSortButton: { backgroundColor: '#333333' },
    sortText: { fontSize: 15, fontWeight: '600', color: '#4F4F4F' },
    activeSortText: { color: '#FFFFFF' },
    listContainer: { paddingHorizontal: 16, paddingBottom: 80 },
    card: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#F0F0F0' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, },
    authorInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12, },
    authorName: { fontWeight: 'bold', fontSize: 14 },
    timestamp: { fontSize: 12, color: '#828282' },
    categoryBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: '#EFEFEF' },
    categoryText: { fontSize: 12, fontWeight: '500', color: '#4F4F4F' },
    cardBody: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, },
    textContent: { flex: 1, marginRight: 16, },
    title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    content: { fontSize: 14, color: '#4F4F4F', lineHeight: 20 },
    thumbnail: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#E0E0E0' },
    cardFooter: { flexDirection: 'row', alignItems: 'center', paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
    action: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
    actionText: { marginLeft: 4, color: '#828282', fontSize: 12 },
    fab: { position: 'absolute', right: 20, bottom: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#2F80ED', justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, },
});

export default CommunityScreen;

