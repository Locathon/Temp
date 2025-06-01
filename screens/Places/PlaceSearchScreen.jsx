import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PlaceSearchScreen = () => {
  const [query, setQuery] = useState('');
  const results = ['카페 산책', '행궁도서관', '수원성'].filter(item =>
    item.includes(query)
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="장소 검색"
        value={query}
        onChangeText={setQuery}
        style={styles.searchInput}
        clearButtonMode="while-editing" 
      />

      <FlatList
        data={results}
        keyExtractor={(item, idx) => idx.toString()}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultItem} activeOpacity={0.7}>
            <Text style={styles.resultText}>{item}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    elevation: 4,
  },
  resultItem: {
    backgroundColor: '#fafafa',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },
});

export default PlaceSearchScreen;