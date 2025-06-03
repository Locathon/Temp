import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type QA = { question: string; answer: string };

export default function QASetupScreen() {
  const navigation = useNavigation<any>();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  // Dummy entries for preview (replace with real state as needed)
  const [qaList, setQaList] = useState<QA[]>([
    { question: '가게 위치는 어디인가요?', answer: '서울특별시 강남구입니다.' },
    { question: '영업시간이 어떻게 되나요?', answer: '오전 9시부터 오후 6시까지입니다.' },
  ]);

  const handleAdd = () => {
    if (question && answer) {
      setQaList(prev => [...prev, { question, answer }]);
      setQuestion('');
      setAnswer('');
    }
  };

  const goToPreview = () => {
    navigation.navigate('QAPreviewScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Q&A 설정</Text>

      <Text style={styles.label}>질문</Text>
      <TextInput
        style={styles.input}
        placeholder="질문을 입력하세요"
        value={question}
        onChangeText={setQuestion}
      />

      <Text style={styles.label}>답변</Text>
      <TextInput
        style={styles.input}
        placeholder="답변을 입력하세요"
        value={answer}
        onChangeText={setAnswer}
      />

      <Button title="추가" onPress={handleAdd} />
      <FlatList
        data={qaList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.q}>Q. {item.question}</Text>
            <Text style={styles.a}>A. {item.answer}</Text>
          </View>
        )}
        style={{ marginTop: 20, marginBottom: 20 }}
      />
      <Button title="미리보기" onPress={goToPreview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  label: { fontWeight: '600', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  item: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  q: { fontWeight: 'bold' },
  a: { marginTop: 4 },
});