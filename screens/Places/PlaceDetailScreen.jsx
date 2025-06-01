import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PlaceDetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* 프로필 카드 */}
      <View style={styles.profileCard}>
        <Text style={styles.nickname}>닉네임</Text>
        <Text style={styles.badge}>행궁인장</Text>
      </View>

      {/* 본문 */}
      <Text style={styles.contentText}>
        게시글 본문 내용입니다. 이곳에 추천 장소에 대한 설명이 들어갑니다.
        한옥이 아름답고 조용해서 산책하기 좋아요. 주변에 카페도 많아요!
      </Text>

      {/* 이미지 갤러리 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
        {[
          'https://placekitten.com/200/200',
          'https://placekitten.com/201/200',
          'https://placekitten.com/202/200',
        ].map((uri, idx) => (
          <Image key={idx} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>

      {/* 액션 버튼 */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>❤️ 좋아요</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 댓글</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>📌 찜</Text>
        </TouchableOpacity>
      </View>

      {/* 댓글 */}
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
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  profileCard: {
    backgroundColor: '#f0f0f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  nickname: { fontSize: 18, fontWeight: 'bold' },
  badge: { color: '#777', marginTop: 4 },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#333',
  },
  imageScroll: {
    marginBottom: 20,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginRight: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  actionText: {
    fontSize: 14,
  },
  commentSection: {},
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
