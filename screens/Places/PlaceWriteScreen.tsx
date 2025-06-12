import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// ✅ 여기에 본인의 Google Maps API 키를 입력하세요 (보안상 .env로 관리 권장)
const GOOGLE_API_KEY = 'AIzaSyA38Wx1aAoueHqiOsWVlTYSIAvRtO6RW6g';

export default function PlaceWriteScreen() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [pin, setPin] = useState({ latitude: 37.5665, longitude: 127.001 }); // default 수원 행궁동

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치 권한 거부', '지도를 사용하려면 위치 권한이 필요합니다.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setPin({ latitude, longitude });
    })();
  }, []);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진첩 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && images.length < 3) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const uploadToS3 = async (uri: string) => {
    const fakeUrl = `https://my-s3-bucket.s3.amazonaws.com/${Date.now()}.jpg`;
    console.log('업로드된 이미지 URL:', fakeUrl);
    return fakeUrl;
  };

  const searchLocationByName = async () => {
    if (!name) return;

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          name
        )}&key=${GOOGLE_API_KEY}`
      );
      const json = await res.json();
      if (json.status === 'OK' && json.results.length > 0) {
        const location = json.results[0].geometry.location;
        setPin({ latitude: location.lat, longitude: location.lng });
      } else {
        Alert.alert('검색 실패', '입력한 장소를 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('오류', '장소 검색 중 문제가 발생했습니다.');
    }
  };

  const handleSavePlace = async () => {
    if (!name || !title || !content) {
      Alert.alert('입력 필요', '장소 이름, 제목, 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const imageUrls = await Promise.all(images.map(uploadToS3));

      const placeDto = {
        name,
        title,
        content,
        latitude: pin.latitude,
        longitude: pin.longitude,
        imageUrls,
      };

      const res = await fetch('http://3.35.27.124/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(placeDto),
      });

      if (res.ok) {
        Alert.alert('등록 완료', '장소가 성공적으로 등록되었습니다.');
      } else {
        const error = await res.json();
        Alert.alert('실패', error.message || '등록에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('오류', '서버와 연결할 수 없습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>장소 추천 등록</Text>
        <TouchableOpacity onPress={handleSavePlace}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>장소 이름</Text>
          <TextInput
            style={styles.input}
            placeholder="예: 수원 화성"
            value={name}
            onChangeText={setName}
            onSubmitEditing={searchLocationByName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={styles.input}
            placeholder="장소를 추천하는 제목을 입력하세요"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>내용</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="자세한 설명을 적어주세요"
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>지도에서 위치 선택</Text>
          <MapView
            style={styles.map}
            region={{ ...pin, latitudeDelta: 0.002, longitudeDelta: 0.002 }}
            onPress={(e) => setPin(e.nativeEvent.coordinate)}
          >
            <Marker
              coordinate={pin}
              draggable
              onDragEnd={(e) => setPin(e.nativeEvent.coordinate)}
            />
          </MapView>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>사진 업로드 (최대 3장)</Text>
          <ScrollView horizontal>
            {images.map((uri, idx) => (
              <Image key={idx} source={{ uri }} style={styles.previewImage} />
            ))}
            {images.length < 3 && (
              <TouchableOpacity style={styles.photoButton} onPress={handlePickImage}>
                <Ionicons name="camera-outline" size={24} color="#828282" />
                <Text>{images.length}/3</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  saveButtonText: { color: '#007AFF', fontSize: 16 },
  scrollContainer: { paddingBottom: 40 },
  inputGroup: { paddingHorizontal: 20, marginVertical: 12 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  map: { width: '100%', height: 200, borderRadius: 8 },
  previewImage: { width: 80, height: 80, borderRadius: 8, marginRight: 8 },
  photoButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
});
