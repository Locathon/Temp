import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen() {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [hours, setHours] = useState('');
  const [location, setLocation] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.headerText}>취소</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>프로필 편집</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.headerText}>완료</Text></TouchableOpacity>
      </View>

      <View style={styles.profileRow}>
        <View style={styles.profileImagePlaceholder} />
        <Text style={styles.storeName}>행온 ⭐</Text>
        <Text style={styles.storeCategory}>디저트 카페</Text>
      </View>

      <Text style={styles.label}>이름</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>소개</Text>
      <View style={styles.descriptionRow}>
        <TextInput style={[styles.input, { flex: 1 }]} value={description} onChangeText={setDescription} />
        <TouchableOpacity style={styles.aiButton}>
          <Text style={styles.aiButtonText}>AI 문장 변환</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>카테고리</Text>
      <View style={styles.categoryRow}>
        {['디저트카페', '베이커리', '카페', '음료', '브런치'].map((cat) => (
          <TouchableOpacity key={cat} style={styles.categoryButton}>
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>운영 시간</Text>
      <TextInput style={styles.input} value={hours} onChangeText={setHours} />

      <Text style={styles.label}>위치</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flexGrow: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  headerText: { fontSize: 16, color: '#007AFF' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  label: { marginTop: 12, marginBottom: 4, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 12 },
  profileRow: { alignItems: 'center', marginBottom: 24 },
  profileImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ddd',
    marginBottom: 8,
  },
  storeName: { fontSize: 18, fontWeight: 'bold' },
  storeCategory: { fontSize: 14, color: '#666' },
  descriptionRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  aiButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginLeft: 8,
  },
  aiButtonText: { fontSize: 12 },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
});