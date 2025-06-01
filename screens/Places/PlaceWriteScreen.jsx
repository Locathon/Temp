import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PlaceWriteScreen = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>닉네임 ▸ 장소 추가</Text>

      <TextInput
        placeholder="행궁동의 추천 스팟을 알려주세요!"
        value={content}
        onChangeText={setContent}
        style={styles.textInput}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('PhotoSelect')}
        style={styles.photoAddButton}
        activeOpacity={0.7}
      >
        <Text style={styles.photoAddButtonText}>＋ 사진 추가</Text>
      </TouchableOpacity>

      {photos.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoList}>
          {photos.map((uri, idx) => (
            <Image key={idx} source={{ uri }} style={styles.photo} />
          ))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
        <Text style={styles.submitButtonText}>작성 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 20,
    color: '#222',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    backgroundColor: '#fafafa',
    marginBottom: 20,
    elevation: 3, // Android 그림자
  },
  photoAddButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  photoAddButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  photoList: {
    marginBottom: 30,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  submitButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default PlaceWriteScreen;
