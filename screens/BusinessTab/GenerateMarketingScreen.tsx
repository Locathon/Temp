import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type BusinessStackParamList = {
  MarketingDetailScreen: { generatedText: string };
};

const GenerateMarketingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<BusinessStackParamList>>();
  const [storeDescription, setStoreDescription] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleGenerate = () => {
    // 나중에 백엔드 요청 추가 예정
    navigation.navigate('MarketingDetailScreen', {
      generatedText: `Generated marketing for: ${storeDescription}, using keywords: ${keywords}`,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI 마케팅 문구 생성</Text>

      <Text style={styles.label}>가게 설명</Text>
      <TextInput
        style={styles.input}
        value={storeDescription}
        onChangeText={setStoreDescription}
        placeholder="가게 소개를 입력하세요"
        multiline
      />

      <Text style={styles.label}>키워드</Text>
      <TextInput
        style={styles.input}
        value={keywords}
        onChangeText={setKeywords}
        placeholder="예: 친절, 분위기 좋은, 가성비"
      />

      <Button title="문구 생성하기" onPress={handleGenerate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default GenerateMarketingScreen;