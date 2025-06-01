import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PlaceWriteScreen = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState([]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: 'bold' }}>닉네임 ▸ 장소 추가</Text>
      <TextInput
        placeholder="행궁동의 추천 스팟을 알려주세요!"
        value={content}
        onChangeText={setContent}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 12 }}
        multiline
      />

      <TouchableOpacity onPress={() => navigation.navigate('PhotoSelect')}>
        <View style={{ padding: 20, backgroundColor: '#ddd', alignItems: 'center' }}>
          <Text>사진 추가 (+)</Text>
        </View>
      </TouchableOpacity>

      {photos.length > 0 && photos.map((uri, idx) => (
        <Image key={idx} source={{ uri }} style={{ width: 100, height: 100, margin: 5 }} />
      ))}

      <TouchableOpacity style={{ marginTop: 20, backgroundColor: 'black', padding: 12 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>작성 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceWriteScreen;
