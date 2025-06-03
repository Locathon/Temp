import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const dummyPosts = [
  {
    id: '1',
    title: '행궁 야경 맛집',
    description: '밤에 보면 더 예쁜 뷰 포인트!',
    imageUri: 'https://placekitten.com/400/300',
  },
  {
    id: '2',
    title: '골목 갤러리',
    description: '감성 가득 골목 속 작은 전시관',
    imageUri: 'https://placekitten.com/401/300',
  },
  {
    id: '3',
    title: '카페 투어 명소',
    description: '커피와 분위기 모두 최고!',
    imageUri: 'https://placekitten.com/402/300',
  },
];

const CARD_WIDTH = Dimensions.get('window').width * 0.8;

const PlaceListScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PlaceDetail')}
      activeOpacity={0.85}
      style={styles.cardWrapper}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.imageUri }} style={styles.cardImage} />
        <View style={styles.cardOverlay}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 행궁 PICK</Text>

      <FlatList
        data={dummyPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      <TouchableOpacity
        style={styles.writeButton}
        onPress={() => navigation.navigate('PlaceWrite')}
        activeOpacity={0.85}
      >
        <Text style={styles.writeButtonText}>＋ 글쓰기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  horizontalList: {
    paddingBottom: 80, // 글쓰기 버튼 공간 확보
  },
  cardWrapper: {
    marginRight: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: 320,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#eee',
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    width: '100%',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  cardDescription: {
    color: '#eee',
    fontSize: 15,
    marginTop: 4,
  },
  writeButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  writeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PlaceListScreen;
