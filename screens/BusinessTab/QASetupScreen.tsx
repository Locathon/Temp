import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

type QA = { question: string; answer: string; expanded: boolean };

export default function QASetupScreen() {
  const navigation = useNavigation<any>();
  const [qaList, setQaList] = useState<QA[]>([
    {
      question: '오늘 영업하나요?',
      answer: '네, 오늘 정상 영업합니다!',
      expanded: false,
    },
    {
      question: '주차장 있나요?',
      answer: '네, 건물 앞 주차장 이용 가능합니다.',
      expanded: false,
    },
    {
      question: '포장도 되나요?',
      answer: '네, 모든 메뉴 포장 가능합니다 :)',
      expanded: false,
    },
    {
      question: '예약 없이 가도 되나요?',
      answer: '네, 오늘은 오전 11시부터 오후 9시까지 영업합니다 :)',
      expanded: true,
    },
    {
      question: '메뉴판 어디서 볼 수 있나요?',
      answer: '프로필에 메뉴 링크가 있습니다! 또는 인스타 하이라이트도 참고해주세요.',
      expanded: true,
    },
    {
      question: '카드 결제 되나요?',
      answer: '네, 카드/간편결제 모두 가능합니다. 현금영수증도 발급돼요 :)',
      expanded: true,
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      const simplifiedQas = qaList.map(({ question, answer }) => ({ question, answer }));
      navigation.setParams({ qas: simplifiedQas });
    }, [qaList])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Q&A 설정</Text>

      <FlatList
        data={qaList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                const updated = [...qaList];
                updated[index].expanded = !updated[index].expanded;
                setQaList(updated);
              }}
              style={{ paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {item.question}
                {item.answer === '' && <Text style={{ color: 'red' }}> *</Text>}
              </Text>
              <Text style={{ fontSize: 20, color: '#555' }}>
                {item.expanded ? '˄' : '˅'}
              </Text>
            </TouchableOpacity>
            {item.expanded && (
              <View style={{
                backgroundColor: '#F2F4F7',
                padding: 12,
                borderRadius: 12,
                marginBottom: 16,
              }}>
                <Text style={{ fontSize: 14, color: '#4F4F4F' }}>{item.answer || '답변을 입력해주세요.'}</Text>
              </View>
            )}
          </>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={{ backgroundColor: '#000', padding: 16, borderRadius: 30, alignItems: 'center', marginVertical: 16 }}
            onPress={() => setQaList([...qaList, { question: '', answer: '', expanded: true }])}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>질문 추가하기</Text>
          </TouchableOpacity>
        }
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#1C1C1E',
          padding: 16,
          borderRadius: 30,
          alignItems: 'center',
          marginTop: 16,
        }}
        onPress={() => {
          const simplifiedQas = qaList.map(({ question, answer }) => ({ question, answer }));
          navigation.navigate('BusinessHome', { qas: simplifiedQas });
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>스토어 홈으로 이동</Text>
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