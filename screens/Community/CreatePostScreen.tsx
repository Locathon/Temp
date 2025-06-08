import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreatePostScreen() {
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handlePickImage = async () => {
    // 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '게시글에 사진을 추가하려면 사진 라이브러리 접근 권한이 필요합니다.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 5, // 5장까지 선택 가능하도록 제한
    });

    if (!result.canceled) {
      setImages(result.assets.map(asset => asset.uri));
    }
  };

  const handleSubmit = () => {
    if (content.trim() === '') {
      Alert.alert('알림', '내용을 입력해주세요.');
      return;
    }
    // TODO: 실제 API로 게시글 데이터 전송
    console.log({ content, images });
    Alert.alert('성공', '게시글이 성공적으로 등록되었습니다.');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>글쓰기</Text>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>등록</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TextInput
          style={styles.textInput}
          placeholder="행궁동과 관련된 이야기를 공유해보세요..."
          multiline
          value={content}
          onChangeText={setContent}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagePreviewContainer}>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.previewImage} />
          ))}
        </ScrollView>
      </ScrollView>
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={handlePickImage}>
          <Ionicons name="image-outline" size={28} color="#828282" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    submitButton: { backgroundColor: '#2F80ED', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    submitButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
    textInput: { padding: 16, fontSize: 16, minHeight: 200, textAlignVertical: 'top' },
    toolbar: { flexDirection: 'row', padding: 16, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
    imagePreviewContainer: { paddingHorizontal: 16, paddingBottom: 16 },
    previewImage: { width: 100, height: 100, borderRadius: 8, marginRight: 8 },
});
