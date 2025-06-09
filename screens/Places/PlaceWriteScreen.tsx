import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const PlaceWriteScreen = ({ navigation, route }) => {
  const [nickname, setNickname] = useState(''); // 백엔드 연동 시 불러올 닉네임
  const [placeName, setPlaceName] = useState('');
  const [address, setAddress] = useState(''); // 카카오 API로 받아올 주소
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState('');

  // 사진 선택 후 돌아왔을 때 params로부터 받아오기
  useEffect(() => {
    if (route.params?.photos) {
      setPhotos(route.params.photos);
    }
  }, [route.params?.photos]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        닉네임 ▸ {nickname || '닉네임'}
      </Text>

      {/* 게시글 제목 입력 */}
      <TextInput
        placeholder="게시글 제목을 입력해주세요"
        value={title}
        onChangeText={title => {
          setTitle(title);
        }}
        style={styles.input}
      />

      {/* 설명 입력 */}
      <TextInput
        placeholder="행궁동의 추천 스팟을 알려주세요!"
        value={content}
        onChangeText={setContent}
        style={styles.textArea}
        multiline
        textAlignVertical="top"
      />

      {/* 장소 이름 입력 */}
      <TextInput
        placeholder="장소 이름을 입력해주세요"
        value={placeName}
        onChangeText={text => {
          setPlaceName(text);
          // 여기에 Kakao Map API 연동해서 주소 가져오는 로직 추가 예정
        }}
        style={styles.input}
      />

      {/* (추후) 카카오맵에서 받아온 주소 보여주기 */}
      {address ? (
        <Text style={styles.addressLabel}>주소: {address}</Text>
      ) : (
        <Text style={styles.addressLabel}>주소를 입력한 장소 이름으로 검색합니다</Text>
      )}  

      {/* 사진 추가 */}
      <TouchableOpacity
        onPress={() => navigation.navigate('PhotoSelect')}
        style={styles.photoAddButton}
        activeOpacity={0.7}
      >
        <Text style={styles.photoAddButtonText}>＋ 사진 추가</Text>
      </TouchableOpacity>

      {photos.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.photoList}
        >
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: '#fafafa',
    elevation: 2,
  },
  addressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    backgroundColor: '#fafafa',
    marginBottom: 20,
    elevation: 3,
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