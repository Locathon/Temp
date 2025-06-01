import { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';

const PlaceSearchScreen = () => {
  const [query, setQuery] = useState('');
  const results = ['카페 산책', '행궁도서관', '수원성'].filter(item => item.includes(query));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="장소 검색"
        value={query}
        onChangeText={setQuery}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <FlatList
        data={results}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 10 }}>{item}</Text>
        )}
      />
    </View>
  );
};

export default PlaceSearchScreen;
