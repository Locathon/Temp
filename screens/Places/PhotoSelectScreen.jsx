import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const PhotoSelectScreen = ({ navigation }) => {
  // 가짜 사진 리스트
  const dummyPhotos = Array.from({ length: 12 }, (_, i) => ({
    id: i.toString(),
    uri: `https://placekitten.com/200/20${i}`,
  }));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18 }}>사진 모음</Text>
      <FlatList
        data={dummyPhotos}
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ margin: 5 }}>
            <View style={{ width: 100, height: 100, backgroundColor: '#eee' }}>
              <Text style={{ textAlign: 'center' }}>✓</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PhotoSelectScreen;
