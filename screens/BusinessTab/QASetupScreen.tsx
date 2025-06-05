import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type QA = { question: string; answer: string };

export default function QASetupScreen() {
  const navigation = useNavigation<any>();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // Dummy entries for preview (replace with real state as needed)
  const [qaList, setQaList] = useState<QA[]>([
    { question: '가게 위치는 어디인가요?', answer: '서울특별시 강남구입니다.' },
    { question: '영업시간이 어떻게 되나요?', answer: '오전 9시부터 오후 6시까지입니다.' },
  ]);

  const handleAdd = () => {
    if (question && answer) {
      if (selectedIndex !== null) {
        // Update existing
        const updated = [...qaList];
        updated[selectedIndex] = { question, answer };
        setQaList(updated);
      } else {
        // Add new
        setQaList(prev => [...prev, { question, answer }]);
      }
      setQuestion('');
      setAnswer('');
      setSelectedIndex(null);
    }
  };

  const goToPreview = () => {
    navigation.navigate('QAPreviewScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Q&A 설정</Text>

      <View style={{ flex: 1 }}>
        <FlatList
          data={qaList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setQuestion(item.question);
                setAnswer(item.answer);
                setSelectedIndex(index);
              }}
            >
              <Text style={styles.q}>Q. {item.question}</Text>
              <Text style={styles.a}>A. {item.answer}</Text>
            </TouchableOpacity>
          )}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
        <View style={styles.footer}>
          <TextInput
            style={styles.footerInput}
            placeholder="질문을 입력하세요"
            value={question}
            onChangeText={setQuestion}
          />
          <TouchableOpacity style={styles.footerButton} onPress={handleAdd}>
            <Text style={styles.footerButtonText}>{selectedIndex !== null ? '수정' : '추가'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.label}>답변</Text>
      <TextInput
        style={styles.input}
        placeholder="답변을 입력하세요"
        value={answer}
        onChangeText={setAnswer}
      />

      <TouchableOpacity onPress={goToPreview} style={{ marginTop: 10 }}>
        <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>미리보기</Text>
      </TouchableOpacity>
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
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  q: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  a: {
    fontSize: 15,
    color: '#444',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  footerInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  footerButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});