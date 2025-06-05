import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CourseListScreen({ navigation }) {
  const dummyCourses = [
    { title: '행궁동 맛집 투어', subtitle: '화성행궁 → 수원 통닭거리 → 팔달문 시장' },
    { title: '예술 감성 산책 코스', subtitle: '수원화성박물관 → 공방거리 → 수원 아트스페이스' },
    { title: '야경 명소 탐방', subtitle: '화홍문 → 방화수류정 → 연무대' },
    { title: '한옥 감성 체험', subtitle: '남창동 한옥거리 → 무예24기 상설공연 → 전통찻집' },
    { title: '데이트 코스', subtitle: '팔달산 산책로 → 행리단길 카페 → 수원천 산책' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>행궁동 코스</Text>
        <View style={styles.iconGroup}>
          <Ionicons name="search" size={24} color="#333" />
          <TouchableOpacity onPress={() => navigation.navigate('CourseCreateScreen')}>
            <Ionicons name="add-circle-outline" size={28} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={dummyCourses}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('CourseDetailScreen', {
                title: item.title,
                subtitle: item.subtitle,
              })
            }
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(_, idx) => idx.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  iconGroup: { flexDirection: 'row', gap: 16 },
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});
