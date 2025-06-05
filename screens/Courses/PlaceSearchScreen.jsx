import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PlaceSearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const dummyResults = ['온멜로', '방화수류정', '수원전통문화관'];

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="장소 검색"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <FlatList
        data={dummyResults}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.result}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(_, i) => i.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
  result: { paddingVertical: 8 },
});