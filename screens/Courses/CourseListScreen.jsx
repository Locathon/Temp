import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CourseListScreen({ navigation }) {
  const dummyCourses = Array(5).fill({ title: '코스 제목', subtitle: '장소 요약' });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>행궁동 코스</Text>
        <View style={styles.iconGroup}>
          <Ionicons name="search" size={24} />
          <TouchableOpacity onPress={() => navigation.navigate('CourseCreateScreen')}>
            <Ionicons name="add-circle-outline" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={dummyCourses}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>
            <Text>{item.subtitle}</Text>
          </View>
        )}
        keyExtractor={(_, idx) => idx.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
  iconGroup: { flexDirection: 'row', gap: 16 },
  card: { padding: 16, backgroundColor: '#eee', marginVertical: 8, borderRadius: 10 },
});