import React from 'react';
import { View, Text, Button } from 'react-native';

export default function EditStore() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18 }}>기존 가게 정보 수정</Text>
      {/* TODO: 기존 정보 불러오기 & 수정 폼 구성 */}
      <Button title="수정 저장" onPress={() => console.log('수정 완료')} />
    </View>
  );
}