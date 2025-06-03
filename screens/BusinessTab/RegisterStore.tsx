import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function RegisterStore() {
  const [storeName, setStoreName] = useState('');

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>가게 이름</Text>
      <TextInput
        value={storeName}
        onChangeText={setStoreName}
        placeholder="가게명을 입력하세요"
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
      />
      <Button title="저장" onPress={() => console.log('저장됨')} />
    </View>
  );
}