import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const PlaceDetailScreen = () => {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View>
        <Text style={{ fontSize: 20 }}>닉네임</Text>
        <Text>행궁인장</Text>
      </View>

      <Text style={{ marginVertical: 16 }}>
        게시글 본문 내용입니다. 이곳에 추천 장소에 대한 설명이 들어갑니다.
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Image source={{ uri: 'https://placekitten.com/200/200' }} style={{ width: 100, height: 100 }} />
        <Image source={{ uri: 'https://placekitten.com/201/200' }} style={{ width: 100, height: 100 }} />
        <Image source={{ uri: 'https://placekitten.com/202/200' }} style={{ width: 100, height: 100 }} />
      </View>

      {/* 하단 액션 */}
      <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent: 'space-around' }}>
        <TouchableOpacity><Text>좋아요</Text></TouchableOpacity>
        <TouchableOpacity><Text>댓글</Text></TouchableOpacity>
        <TouchableOpacity><Text>찜</Text></TouchableOpacity>
      </View>

      {/* 댓글 */}
      <View>
        <Text>댓글</Text>
        <View>
          <Text>사용자1: 좋은 정보 감사합니다!</Text>
          <Text>사용자2: 여기 꼭 가보고 싶어요~</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceDetailScreen;
