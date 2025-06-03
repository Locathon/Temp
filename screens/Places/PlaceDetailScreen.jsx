import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PlaceDetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* 대표 이미지 */}
      <Image
        source={{ uri: 'https://placekitten.com/600/400' }}
        style={styles.mainImage}
      />

      <View style={styles.titleRow}>
        <Text style={styles.title}>화서문 한옥 골목길</Text>
        <Text style={styles.nickname}>by 닉네임</Text>
      </View>
      
      <Text style={styles.locationText}>경기 수원시 팔달구 정조로</Text>
      
      {/* 본문 */}
      <Text style={styles.contentText}>
        게시글 본문 내용입니다. 이곳에 추천 장소에 대한 설명이 들어갑니다.
        한옥이 아름답고 조용해서 산책하기 좋아요. 주변에 카페도 많아요!
      </Text>

      {/* 이미지 썸네일 갤러리 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
        {[
          'https://placekitten.com/200/200',
          'https://placekitten.com/201/200',
          'https://placekitten.com/202/200',
        ].map((uri, idx) => (
          <Image key={idx} source={{ uri }} style={styles.thumbnail} />
        ))}
      </ScrollView>

      {/* 액션 버튼 (이모지만, 오른쪽 정렬) */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>📌</Text>
        </TouchableOpacity>
      </View>

      {/* 댓글 섹션 */}
      <View style={styles.commentSection}>
        <Text style={styles.commentTitle}>댓글</Text>
        {[
          { user: '사용자1', text: '좋은 정보 감사합니다!' },
          { user: '사용자2', text: '여기 꼭 가보고 싶어요~' },
        ].map((c, i) => (
          <View key={i} style={styles.commentBox}>
            <Text style={styles.commentUser}>{c.user}</Text>
            <Text>{c.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  mainImage: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: '#f0f0f5',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  titleRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  marginTop: 16,
},
title: {
  fontSize: 22,
  fontWeight: '700',
  flex: 1,
},
nickname: {
  fontSize: 14,
  color: '#888',
  marginLeft: 10,
},
locationText: {
  fontSize: 14,
  color: '#999',
  paddingHorizontal: 16,
  marginBottom: 10,
},
  badge: { color: '#777', marginTop: 4 },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: 16,
    marginBottom: 20,
    color: '#333',
  },
  imageScroll: {
    marginBottom: 20,
    paddingLeft: 16,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginRight: 16,
    marginBottom: 24,
  },
  iconButton: {
    padding: 6,
  },
  icon: {
    fontSize: 22,
  },
  commentSection: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  commentBox: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  commentUser: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default PlaceDetailScreen;
