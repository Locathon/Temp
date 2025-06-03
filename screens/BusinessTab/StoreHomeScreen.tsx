import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type BusinessStackParamList = {
  EditProfileScreen: undefined;
  AutoQnAScreen: undefined;
  NewPostScreen: undefined;
};

export default function StoreHomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<BusinessStackParamList>>();
  return (
    <ScrollView style={styles.container}>
      {/* 상단 프로필 영역 */}
      <View style={styles.profileBox}>
        <Text style={styles.storeTitle}>소상공인 ***님의 스토어 페이지</Text>
        <Text style={styles.category}>디저트 카페</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfileScreen')}>
          <Text style={styles.editText}>프로필 수정</Text>
        </TouchableOpacity>
        {/* 위치, 시간, 해시태그 등 추가 */}
      </View>

      {/* 자동 Q&A */}
      <TouchableOpacity style={styles.qaButton} onPress={() => navigation.navigate('AutoQnAScreen')}>
        <Text style={styles.qaText}>자동 Q&A</Text>
      </TouchableOpacity>

      {/* 새 글 작성 */}
      <TouchableOpacity style={styles.newPostBar} onPress={() => navigation.navigate('NewPostScreen')}>
        <Text style={styles.newPostText}>새로운 글을 포스팅 하시겠습니까?</Text>
        <Text style={styles.plus}>＋</Text>
      </TouchableOpacity>

      {/* 등록된 포스트 미리보기 자리 */}
      <View style={styles.postPreviewBox}>
        <Text>게시물 미리보기 영역</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileBox: { padding: 20, alignItems: 'flex-start', position: 'relative' },
  storeTitle: { fontSize: 20, fontWeight: 'bold' },
  category: { marginTop: 5, color: '#888' },

  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  editText: {
    fontSize: 12,
    color: '#000',
  },

  qaButton: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  qaText: { fontWeight: '500' },

  newPostBar: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 15,
    alignItems: 'center',
  },
  newPostText: { fontSize: 14 },
  plus: { fontSize: 18, fontWeight: 'bold' },

  postPreviewBox: {
    margin: 20,
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});