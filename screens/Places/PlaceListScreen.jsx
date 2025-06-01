import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const PlaceListScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>오늘의 행궁 PICK</Text>
      {/* TODO: 카드 컴포넌트로 추후 교체 */}
      <TouchableOpacity
        style={{ marginVertical: 20 }}
        onPress={() => navigation.navigate('PlaceWrite')}
      >
        <Text>+ 새로운 글 쓰기</Text>
      </TouchableOpacity>

      {/* 게시글 목록 */}
      <View>
        {[1, 2, 3].map(i => (
          <TouchableOpacity key={i} onPress={() => navigation.navigate('PlaceDetail')}>
            <View style={{ marginVertical: 8, padding: 16, backgroundColor: '#eee' }}>
              <Text>게시글 제목 {i}</Text>
              <Text>간단한 설명 텍스트</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default PlaceListScreen;