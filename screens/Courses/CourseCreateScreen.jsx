import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CourseCreateScreen({  navigation }:Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>새로운 코스 만들기</Text>
      <Text style={styles.sub}>2개 이상의 장소를 선택해주세요</Text>

      <ScrollView style={styles.timeline}>
        <View style={styles.pointLine}>
          <Text style={styles.start}>Start!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PlaceSearchScreen')}>
            <Text style={styles.add}>+ 장소 추가</Text>
          </TouchableOpacity>
        </View>

        {/* 여러 개의 추가 버튼 */}
        <TouchableOpacity onPress={() => navigation.navigate('PlaceSearchScreen')}>
          <Text style={styles.add}>+ 장소 추가</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  sub: { color: '#888', marginBottom: 16 },
  timeline: { paddingLeft: 16, borderLeftWidth: 2, borderLeftColor: '#ccc' },
  pointLine: { marginBottom: 20 },
  start: { fontWeight: 'bold' },
  add: { color: '#1e90ff', marginVertical: 10 },
})