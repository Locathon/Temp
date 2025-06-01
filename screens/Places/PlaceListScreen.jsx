import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PlaceListScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>오늘의 행궁 PICK</Text>

      <TouchableOpacity
        style={styles.writeButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('PlaceWrite')}
      >
        <Text style={styles.writeButtonText}>＋ 새로운 글 쓰기</Text>
      </TouchableOpacity>

      <View style={styles.listContainer}>
        {[1, 2, 3].map(i => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate('PlaceDetail')}
            activeOpacity={0.8}
          >
            <View style={styles.card}>
              <Text style={styles.cardTitle}>게시글 제목 {i}</Text>
              <Text style={styles.cardDescription}>간단한 설명 텍스트</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  writeButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  writeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    // 공간 띄워주기
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // iOS 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android 그림자
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color: '#222',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default PlaceListScreen;