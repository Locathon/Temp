import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function NewPostScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [content, setContent] = useState('');

  const handlePhotoSelect = () => {
    navigation.navigate('PhotoPicker');
  };

  const handlePostSubmit = () => {
    navigation.navigate('BusinessProfileScreen' as never);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Text style={styles.navButton}>취소</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>새로운 글 쓰기</Text>
        <TouchableOpacity onPress={handlePostSubmit}>
          <Text style={styles.navButton}>완료</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerRow}>
        <View style={styles.avatarPlaceholder} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>000</Text>
          <Text style={styles.subText}>&gt; 오늘의 추천 메뉴</Text>
        </View>
      </View>

      <TextInput
        style={styles.textArea}
        placeholder="오늘의 추천 메뉴를 작성해보세요"
        multiline
        numberOfLines={6}
        value={content}
        onChangeText={setContent}
      />

      <TouchableOpacity style={styles.aiButton}>
        <Text style={styles.aiButtonText}>AI 문구 변환</Text>
      </TouchableOpacity>

      <View style={styles.photoPreviewRow}>
        <TouchableOpacity style={styles.photoPlaceholder} onPress={handlePhotoSelect}>
          <Text style={styles.plusSign}>＋</Text>
        </TouchableOpacity>
        <View style={styles.photoPlaceholder} />
        <View style={styles.photoPlaceholder} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    marginBottom: 8,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  photoButton: {
    backgroundColor: '#ff9800',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  photoButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  submitButton: {
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 6,
  },
  submitButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginRight: 12,
  },
  userInfo: { flexDirection: 'column' },
  username: { fontWeight: 'bold', fontSize: 16 },
  subText: { color: '#888', fontSize: 12 },
  aiButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  aiButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  photoPreviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  plusSign: { fontSize: 24, color: '#999' },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navButton: {
    color: '#007aff',
    fontSize: 16,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});