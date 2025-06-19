import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert, Modal, TextInput } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
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
    places: Array(7).fill({
      name: '에그궁',
      address: '경기 수원시 팔달구 화서문로 17번길 6-4',
      image: require('../../assets/images/eggpalace.png'),
    }),
  },
  '맛집만 공략한다 ㅋㅋㅋㅋㅋㅋㅋ..': {
    title: '맛집만 공략한다 ㅋㅋㅋㅋㅋㅋㅋ..',
    places: Array(7).fill({
      name: '진미통닭',
      address: '경기 수원시 팔달구 장안로 10',
      image: require('../../assets/images/eggpalace.png'),
    }),
  },
  '썸탈 때 가기 좋은 곳': {
    title: '썸탈 때 가기 좋은 곳',
    places: Array(7).fill({
      name: '팔달산 전망대',
      address: '경기 수원시 장안구 경수대로 20',
      image: require('../../assets/images/eggpalace.png'),
    }),
  },
};

export default function EditCourseScreen() {
  const [selectedCategory, setSelectedCategory] = useState('가족들과 힐링하기 좋은곳');
  const [showDropdown, setShowDropdown] = useState(false);
  const [copyModalVisible, setCopyModalVisible] = useState(false);
  const [copiedCourseName, setCopiedCourseName] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [completionModalVisible, setCompletionModalVisible] = useState(false);
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
          <Text style={styles.sectionTitle}>내 코스</Text>
          <TouchableOpacity style={styles.copyButton}>
            <Text style={styles.copyText}>복사하기</Text>
          </TouchableOpacity>
        </View>

        {course.places.map((place, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.placeRow}
            onPress={() => {
              setSelectedPlaces([place.name]);
              setCopyModalVisible(true);
            }}
          >
            <Image source={place.image} style={styles.thumbnail} />
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeAddress}>{place.address}</Text>
            </View>
            <Ionicons name="bookmark-outline" size={20} color="#888" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>저장하기</Text>
      </TouchableOpacity>

      <Modal transparent visible={copyModalVisible} animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>코스를 복사하시겠어요?</Text>
            <Text style={{ marginBottom: 12 }}>{selectedPlaces.join(' · ')}</Text>
            <TextInput
              placeholder="복사할 코스의 이름을 입력해주세요"
              value={copiedCourseName}
              onChangeText={setCopiedCourseName}
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 16 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setCopyModalVisible(false)} style={{ marginRight: 12 }}>
                <Text>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCopyModalVisible(false);
                  setCompletionModalVisible(true);
                }}
                style={{ backgroundColor: '#000', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }}
              >
                <Text style={{ color: '#fff' }}>복사하기</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={completionModalVisible} animationType="fade">
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="checkmark-circle" size={80} color="#00AEEF" style={{ marginBottom: 20 }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>복사가 완료됐어요!</Text>
          <Text style={{ color: '#777', marginBottom: 30 }}>
            복사된 코스는 {'\n'}[나의 찜 리스트]의 [코스]에서 볼 수 있어요
          </Text>
          <TouchableOpacity onPress={() => setCompletionModalVisible(false)} style={{ backgroundColor: '#000', paddingHorizontal: 40, paddingVertical: 12, borderRadius: 8 }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>확인</Text>
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
