import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen() {
  const navigation = useNavigation<any>();
  // --------------------
  // 🧠 상태 관리 (입력값 + AI 상태)
  // --------------------
  const [name, setName] = useState('행운');
  const [description, setDescription] = useState('수제 디저트와 브런치를 제공하는 따뜻한 공간입니다.');
  const [category, setCategory] = useState('디저트카페');
  const [hours, setHours] = useState('매일 10:00 - 21:00');
  const [location, setLocation] = useState('서울시 성동구 성수이로 123');

  const [aiStatus, setAiStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [aiResult, setAiResult] = useState('');

  // --------------------
  // 📱 화면 렌더링
  // --------------------
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ✅ 상단 헤더 (취소 / 완료 버튼) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.headerText}>취소</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>프로필 편집</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.headerText}>완료</Text></TouchableOpacity>
      </View>

      {/* ✅ 상단 프로필 입력 영역 (이름, 소개, AI 버튼 + 프로필 이미지) */}
      <View style={styles.topSection}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>이름</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <View style={styles.descriptionLabelRow}>
            <Text style={styles.label}>소개</Text>
            <TouchableOpacity
              style={styles.aiInlineButton}
              onPress={() => {
                // ⏳ 버튼 클릭 시: 로딩 → 2초 후 변환 완료 (더미 로직)
                setAiStatus('loading');
                setAiResult('');
                setTimeout(() => {
                  setAiStatus('done');
                  setAiResult('고급진 문체로 재작성된 AI 추천 소개문입니다.');
                }, 2000);
              }}
            >
              <Text style={styles.aiInlineText}>
                {aiStatus === 'idle' && 'AI 문장 변환'}
                {aiStatus === 'loading' && '변환 중...'}
                {aiStatus === 'done' && '변환됨'}
              </Text>
            </TouchableOpacity>
          </View>
          {aiStatus === 'loading' ? (
            <View style={[styles.input, styles.descriptionInput, { justifyContent: 'center' }]}>
              <Text style={{ textAlign: 'center', fontSize: 24 }}>...</Text>
            </View>
          ) : (
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
            />
          )}

          {aiStatus === 'done' && (
            <View style={styles.aiResultBox}>
              <Text style={styles.aiResultText}>{aiResult}</Text>
            </View>
          )}
        </View>
        <View style={styles.profileImageBox}>
          <View style={styles.profileImagePlaceholder} />
        </View>
      </View>

      {/* ✅ 카테고리 선택 */}
      <Text style={styles.label}>카테고리 선택</Text>
      <View style={styles.categoryRow}>
        {['디저트카페', '베이커리', '카페', '음료', '브런치', '파스타', '비건', '퓨전', '정통'].map((cat) => (
          <TouchableOpacity key={cat} style={styles.categoryButton}>
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ✅ 운영 시간 입력 */}
      <Text style={styles.label}>운영 시간</Text>
      <TextInput style={styles.input} value={hours} onChangeText={setHours} />

      {/* ✅ 위치 입력 */}
      <Text style={styles.label}>위치</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flexGrow: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  headerText: { fontSize: 16, color: '#007AFF' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  label: { marginTop: 12, marginBottom: 4, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 12 },
  // profileRow, storeName, storeCategory: removed for new layout
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  profileImageBox: {
    justifyContent: 'flex-start',
  },
  profileImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ddd',
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 4,
  },
  descriptionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 4,
    gap: 8,
  },
  aiButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginLeft: 8,
  },
  aiButtonText: { fontSize: 12 },
  aiInlineButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginLeft: 8,
  },
  aiInlineText: {
    fontSize: 12,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  aiResultBox: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  aiResultText: {
    fontSize: 13,
    color: '#333',
  },
});