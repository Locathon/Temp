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
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function PlaceWriteScreen() {
  const navigation = useNavigation();
  
  // 폼 상태 관리
  const [placeName, setPlaceName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState<string[]>([]);

  // 지도에 표시될 임시 위치 정보
  const [pin, setPin] = useState({
    latitude: 37.288,
    longitude: 127.016,
  });

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '장소 사진을 등록하려면 사진첩 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && images.length < 5) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleSavePlace = () => {
    if (!placeName || !address) {
      Alert.alert('필수 정보 누락', '장소 이름과 주소는 반드시 입력해야 합니다.');
      return;
    }
    // TODO: 실제 서버로 장소 정보 전송
    console.log({ placeName, description, address, images, pin });
    Alert.alert('등록 완료', '새로운 장소가 등록되었습니다.');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>새로운 장소 등록</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePlace}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputGroup}>
            <TextInput
                style={styles.titleInput}
                placeholder="장소 이름을 입력하세요"
                value={placeName}
                onChangeText={setPlaceName}
            />
            <TextInput
                style={styles.descriptionInput}
                placeholder="어떤 곳인지 간단하게 설명해주세요 (선택)"
                value={description}
                onChangeText={setDescription}
                multiline
            />
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>주소</Text>
            <TextInput
                style={styles.input}
                placeholder="정확한 주소를 입력해주세요"
                value={address}
                onChangeText={setAddress}
            />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>위치 선택</Text>
            <MapView
                style={styles.map}
                region={{ ...pin, latitudeDelta: 0.002, longitudeDelta: 0.002 }}
                onPress={(e) => setPin(e.nativeEvent.coordinate)}
            >
                <Marker coordinate={pin} draggable onDragEnd={(e) => setPin(e.nativeEvent.coordinate)} />
            </MapView>
            <Text style={styles.mapHelperText}>지도를 움직여 핀을 원하는 위치에 놓으세요.</Text>
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>사진 추가 (선택)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images.map((uri, index) => (
                    <Image key={index} source={{ uri }} style={styles.previewImage}/>
                ))}
                {images.length < 5 && (
                  <TouchableOpacity style={styles.photoButton} onPress={handlePickImage}>
                      <Ionicons name="camera-outline" size={24} color="#828282" />
                      <Text style={styles.photoButtonText}>{images.length}/5</Text>
                  </TouchableOpacity>
                )}
            </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  saveButton: { backgroundColor: '#2F80ED', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  saveButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  scrollContainer: { paddingBottom: 40 },
  inputGroup: { paddingHorizontal: 20, marginVertical: 12 },
  label: { fontSize: 16, fontWeight: '600', color: '#4F4F4F', marginBottom: 10 },
  titleInput: { fontSize: 22, fontWeight: 'bold', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#EAEAEA' },
  descriptionInput: { fontSize: 16, paddingTop: 12, color: '#828282' },
  input: { backgroundColor: '#F2F2F7', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 16, color: '#333' },
  map: { width: '100%', height: 200, borderRadius: 8 },
  mapHelperText: { textAlign: 'center', color: '#828282', fontSize: 12, marginTop: 8 },
  photoButton: { width: 80, height: 80, backgroundColor: '#F2F2F7', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0' },
  photoButtonText: { fontSize: 12, color: '#828282', marginTop: 4 },
  previewImage: { width: 80, height: 80, borderRadius: 8, marginRight: 8 },
});
