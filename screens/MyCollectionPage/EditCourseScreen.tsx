import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert, Modal, TextInput } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Course = {
  title: string;
  places: {
    name: string;
    address: string;
    image: any;
  }[];
};

type SampleCourses = {
  [key: string]: Course;
};

const sampleCourses: SampleCourses = {
  '가족들과 힐링하기 좋은곳': {
    title: '가족들과 힐링하기 좋은곳',
    places: [
      {
        name: '에그궁',
        address: '경기 수원시 팔달구 화서문로 17번길 6-4',
        image: require('../../assets/images/eggpalace.png'),
      },
      {
        name: '힐링카페 수원',
        address: '경기 수원시 장안구 수성로 125',
        image: require('../../assets/images/healing_cafe.png'),
      },
      {
        name: '수원화성 산책길',
        address: '경기 수원시 팔달구 정조로 825',
        image: require('../../assets/images/castle.png'),
      },
    ],
  },
  '맛집만 공략한다 ㅋㅋㅋㅋㅋㅋㅋ..': {
    title: '맛집만 공략한다 ㅋㅋㅋㅋㅋㅋㅋ..',
    places: [
      {
        name: '진미통닭',
        address: '경기 수원시 팔달구 장안로 10',
        image: require('../../assets/images/chicken.png'),
      },
      {
        name: '수원 왕갈비',
        address: '경기 수원시 팔달구 중부대로 123',
        image: require('../../assets/images/suwon_meat.png'),
      },
      {
        name: '남문 칼국수',
        address: '경기 수원시 팔달구 정조로 800',
        image: require('../../assets/images/noodle.png'),
      },
    ],
  },
  '썸탈 때 가기 좋은 곳': {
    title: '썸탈 때 가기 좋은 곳',
    places: [
      {
        name: '팔달산 전망대',
        address: '경기 수원시 장안구 경수대로 20',
        image: require('../../assets/images/paldal.png'),
      },
      {
        name: '화성 안녕동 카페',
        address: '경기 수원시 팔달구 화양로 25',
        image: require('../../assets/images/cafe.png'),
      },
      {
        name: '야경 포인트 수원천',
        address: '경기 수원시 팔달구 남창로 48',
        image: require('../../assets/images/nightcastle.jpg'),
      },
    ],
  },
};

export default function EditCourseScreen() {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState('가족들과 힐링하기 좋은곳');
  const [showDropdown, setShowDropdown] = useState(false);
  const [copyModalVisible, setCopyModalVisible] = useState(false);
  const [copiedCourseName, setCopiedCourseName] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [completionModalVisible, setCompletionModalVisible] = useState(false);
  const [isCopyMode, setIsCopyMode] = useState(false);
  const course = sampleCourses[selectedCategory];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>수정하기</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <TouchableOpacity style={styles.titleRow} onPress={() => setShowDropdown(prev => !prev)}>
            <Text style={styles.courseTitle}>{selectedCategory}</Text>
            <Entypo name={showDropdown ? 'chevron-up' : 'chevron-down'} size={20} color="black" />
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdown}>
              {Object.keys(sampleCourses).map(category => (
                <TouchableOpacity
                  key={category}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCategory(category);
                    setShowDropdown(false);
                  }}
                >
                  <Text
                    style={{
                      color: selectedCategory === category ? '#00AEEF' : '#000',
                      fontWeight: selectedCategory === category ? 'bold' : 'normal',
                    }}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="black" />
          <Text style={styles.addButtonText}>장소 추가하기</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{isCopyMode ? '코스 수정하기' : '내 코스'}</Text>
          <View style={{ flexDirection: 'row' }}>
            {isCopyMode && (
              <TouchableOpacity
                onPress={() => setIsCopyMode(false)}
                style={[styles.copyButton, { backgroundColor: '#eee', marginRight: 8 }]}
              >
                <Text style={{ color: '#000' }}>취소</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.copyButton} onPress={() => setIsCopyMode(true)}>
              <Text style={styles.copyText}>복사하기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isCopyMode ? (
          <>
            <TextInput
              placeholder="복사할 코스의 이름을 입력해주세요"
              value={copiedCourseName}
              onChangeText={setCopiedCourseName}
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 16 }}
            />
            {course.places.map((place, idx) => {
              const isSelected = selectedPlaces.includes(place.name);
              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.placeRow}
                  onPress={() => {
                    if (isSelected) {
                      setSelectedPlaces(prev => prev.filter(name => name !== place.name));
                    } else {
                      setSelectedPlaces(prev => [...prev, place.name]);
                    }
                  }}
                >
                  <Ionicons
                    name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                    size={20}
                    color={isSelected ? '#00AEEF' : '#ccc'}
                    style={{ marginRight: 8 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text style={styles.placeAddress}>{place.address}</Text>
                  </View>
                  <Image source={place.image} style={styles.thumbnail} />
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          course.places.map((place, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.placeRow}
              onPress={() => {}}
            >
              <Image source={place.image} style={styles.thumbnail} />
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeAddress}>{place.address}</Text>
              </View>
              <Ionicons name="bookmark-outline" size={20} color="#888" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.saveButton,
          {
            backgroundColor: selectedPlaces.length > 0 ? '#000' : '#ccc',
          },
        ]}
        disabled={selectedPlaces.length === 0}
        onPress={() => {
          if (selectedPlaces.length > 0) {
            console.log('선택된 장소:', selectedPlaces);
            setCopyModalVisible(true);
          } else {
            console.warn('장소가 선택되지 않음');
          }
        }}
      >
        <Text style={styles.saveText}>저장하기</Text>
      </TouchableOpacity>

      <Modal transparent visible={copyModalVisible} animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>코스를 복사하시겠어요?</Text>
            <Text style={{ marginBottom: 12 }}>{selectedPlaces.join(' - ')}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
              <TouchableOpacity
                onPress={() => setCopyModalVisible(false)}
                style={{
                  flex: 1,
                  borderColor: '#888',
                  borderWidth: 1,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: 'center',
                  marginRight: 8,
                }}
              >
                <Text style={{ color: '#444', fontSize: 16, fontWeight: '500' }}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const selectedPlacesData = course.places.filter((p) =>
                    selectedPlaces.includes(p.name)
                  );
                  const newCourse = {
                    id: `copied-${Date.now()}`,
                    title: copiedCourseName || `${selectedCategory} 복사본`,
                    placeCount: selectedPlacesData.length,
                    tags: ['#복사한코스'],
                    thumbnail: 'https://placehold.co/100x100?text=복사됨',
                  };

                  try {
                    const existing = await AsyncStorage.getItem('copiedCourses');
                    const parsed = existing ? JSON.parse(existing) : [];
                    await AsyncStorage.setItem(
                      'copiedCourses',
                      JSON.stringify([...parsed, newCourse])
                    );
                  } catch (e) {
                    console.error('코스 저장 오류:', e);
                  }

                  setCopyModalVisible(false);
                  setCompletionModalVisible(true);
                }}
                style={{
                  flex: 1,
                  backgroundColor: '#000',
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: 'center',
                  marginLeft: 8,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>복사하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={completionModalVisible} animationType="fade">
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="checkmark-circle" size={80} color="#00AEEF" style={{ marginBottom: 30 }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>복사가 완료됐어요!</Text>
          <Text style={{ fontSize: 15, color: '#777', marginBottom: 40, textAlign: 'center', lineHeight: 22 }}>
            복사된 코스는{'\n'}[나의 찜 리스트]의 [코스]에서 볼 수 있어요
          </Text>
          <TouchableOpacity
            onPress={async () => {
              setCompletionModalVisible(false);
              // 복사한 코스 정보 생성
              const selectedPlacesData = course.places.filter((p) =>
                selectedPlaces.includes(p.name)
              );
              const newCourse = {
                id: `copied-${Date.now()}`,
                title: copiedCourseName || `${selectedCategory} 복사본`,
                placeCount: selectedPlacesData.length,
                tags: ['#복사한코스'],
                thumbnail: 'https://placehold.co/100x100?text=복사됨',
              };
              // AsyncStorage에 저장
              try {
                const existing = await AsyncStorage.getItem('copiedCourses');
                const parsed = existing ? JSON.parse(existing) : [];
                // 중복 방지
                const filtered = parsed.filter((c: any) => c.id !== newCourse.id);
                await AsyncStorage.setItem(
                  'copiedCourses',
                  JSON.stringify([...filtered, newCourse])
                );
              } catch (e) {
                console.error('코스 저장 오류:', e);
              }
              navigation.navigate('my-courses');
            }}
            style={{
              backgroundColor: '#000',
              paddingHorizontal: 40,
              paddingVertical: 14,
              borderRadius: 12,
              width: '80%',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginRight: 8,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  copyButton: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  copyText: {
    color: '#fff',
    fontSize: 13,
  },
  placeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  placeAddress: {
    fontSize: 13,
    color: '#555',
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
