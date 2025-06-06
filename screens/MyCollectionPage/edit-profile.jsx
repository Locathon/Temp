// app/edit-profile.tsx
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import * as ImagePicker from 'expo-image-picker'; // 이미지 선택 기능에 필요

export default function EditProfileScreen() {
  const router = useRouter();
  const [nickname, setNickname] = useState('현재닉네임'); // TODO: 실제 사용자 닉네임으로 초기화
  const [profileImage, setProfileImage] = useState(null); // TODO: 실제 프로필 이미지 URI로 초기화

  // const pickImage = async () => {
  //   // TODO: 이미지 피커 권한 요청 및 이미지 선택 로직
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setProfileImage(result.assets[0].uri);
  //   }
  // };

  const handleSaveChanges = () => {
    // TODO: 변경된 프로필 정보 저장 로직 (API 호출 등)
    console.log('변경된 닉네임:', nickname);
    console.log('변경된 프로필 이미지 URI:', profileImage);
    Alert.alert('저장 완료', '프로필 정보가 성공적으로 업데이트되었습니다.');
    router.back(); // 이전 화면으로 돌아가기
  };

  return (
    <>
      <Stack.Screen options={{ title: '내 정보 수정' }} />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Alert.alert("이미지 선택", "프로필 이미지 변경 기능은 준비 중입니다.")/*pickImage*/}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Ionicons name="camera-outline" size={40} color="#8A8A8E" />
              <Text style={styles.profileImagePlaceholderText}>사진 변경</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>닉네임</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="새로운 닉네임을 입력하세요"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>변경사항 저장</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2F2F7',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    backgroundColor: '#E0E0E0',
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E9E9EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImagePlaceholderText: {
    color: '#8A8A8E',
    marginTop: 5,
    fontSize: 12,
  },
  label: {
    fontSize: 16,
    color: '#3C3C43',
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});
