import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { Post, posts } from '../../data/communityData';
import { currentUser } from '../../data/userData';

export default function CreatePostScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>(['정지영 커피 로스터즈', '에그궁']);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진을 추가하려면 사진 라이브러리 접근 권한이 필요합니다.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      setImages(result.assets.map(asset => ({ uri: asset.uri })));
    }
  };

  const handleSubmit = () => {
    if (content.trim() === '') {
      Alert.alert('알림', '내용을 입력해주세요.');
      return;
    }

    const newPost: Post = {
      id: `post${Date.now()}`,
      userId: currentUser.id,
      title,
      content,
      images,
      category: '잡담',
      timestamp: '방금 전',
      likes: 0,
      iLiked: false,
      commentsCount: 0,
      comments: [],
      distance: 0.1,
      createdAt: new Date(),
    };

    posts.unshift(newPost);

    //Alert.alert('등록 완료', '게시물이 성공적으로 등록되었습니다.');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>새 포스트</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        {/* 프로필 영역 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Ionicons name="person-circle" size={32} color="#48C8FF" />
          <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>
            {currentUser.name || '사용자'}
          </Text>
        </View>

        {/* 선택된 장소 */}
        {selectedLocation && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="location-outline" size={20} color="#48C8FF" />
            <Text style={{ marginLeft: 6, fontSize: 14, color: '#666' }}>{selectedLocation}</Text>
          </View>
        )}

        {/* 본문 입력 */}
        <TextInput
          style={styles.contentInput}
          placeholder="어떤 이야기를 하고 싶으신가요?"
          multiline
          value={content}
          onChangeText={setContent}
        />

        {/* 툴바 아이콘 (사진 선택, 위치 선택) */}
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={handlePickImage}>
            <Ionicons name="image-outline" size={28} color="#48C8FF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLocationModalVisible(true)}>
            <Ionicons name="location-outline" size={28} color="#48C8FF" style={{ marginLeft: 16 }} />
          </TouchableOpacity>
        </View>

        {/* 이미지 미리보기 */}
        {images.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imagePreviewContainer}
          >
            {images.map((img, index) => (
              <Image key={index} source={img} style={styles.previewImage} />
            ))}
          </ScrollView>
        )}
      </ScrollView>

      {/* 등록 버튼 하단 고정 */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            title.trim() === '' && content.trim() === '' && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={title.trim() === '' && content.trim() === ''}
        >
          <Text style={styles.submitButtonText}>등록하기</Text>
        </TouchableOpacity>
      </View>

      {/* 장소 선택 모달 */}
      {isLocationModalVisible && (
        <TouchableWithoutFeedback onPress={() => setLocationModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.dragBar} />
              <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#999" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="장소 이름을 입력해주세요"
                  value={searchKeyword}
                  onChangeText={setSearchKeyword}
                />
              </View>
              <ScrollView>
                {searchResults.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedLocation(item);
                      setLocationModalVisible(false);
                    }}
                    style={[
                      styles.resultItem,
                      selectedLocation === item && styles.selectedResultItem, // 선택 시 회색 배경
                    ]}
                  >
                    <Text style={{ fontSize: 16 }}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  selectedResultItem: {
    backgroundColor: '#F1F1F1',
  },
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  titleWrapper: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  contentInput: { padding: 16, fontSize: 16, minHeight: 100, textAlignVertical: 'top' },
  toolbar: {
    flexDirection: 'row',
    marginTop: 12,
    paddingHorizontal: 4,
    backgroundColor: '#FFFFFF',
  },
  imagePreviewContainer: { paddingLeft: 16, paddingBottom: 16 },
  previewImage: { width: 100, height: 100, borderRadius: 8, marginRight: 8 },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
  },
  submitButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  // 모달
  modalOverlay: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    height: 600,
    maxHeight: '90%',
  },
  dragBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});