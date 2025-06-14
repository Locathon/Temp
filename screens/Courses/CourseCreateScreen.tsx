import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { courseDetailsMap, Place, saveCourse } from '../../data/courseData';
import { CourseStackParamList } from '../../navigation/CourseNavigator';

type Props = NativeStackScreenProps<CourseStackParamList, 'CourseCreateScreen'>;

export default function CourseCreateScreen({ route, navigation }: Props) {
  // [버그 수정] newPlace 대신 updatedPlaces를 받습니다.
  const { courseId, updatedPlaces } = route.params || {};
  const isEditing = !!courseId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  
  const isInitialized = useRef(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState<Place | null>(null);

  // [버그 수정] PlaceSearchScreen에서 전체 목록을 받아 state를 업데이트하는 로직
  useEffect(() => {
    if (updatedPlaces) {
      setSelectedPlaces(updatedPlaces);
      // 무한 루프 방지를 위해 파라미터를 정리합니다.
      // 이 로직은 updatedPlaces가 변경될 때만 실행되므로 안전합니다.
      navigation.setParams({ updatedPlaces: undefined });
    }
  }, [updatedPlaces, navigation]);


  // 컴포넌트 마운트 시 수정 모드 데이터 로드
  useEffect(() => {
    if (isEditing && !isInitialized.current) {
      const courseData = courseDetailsMap.get(courseId);
      if (courseData) {
        setTitle(courseData.title);
        setDescription(courseData.description);
        setSelectedPlaces(courseData.places);
      }
      isInitialized.current = true;
    }
  }, [courseId, isEditing]);

  const handleSave = () => {
    if (!title.trim() || selectedPlaces.length === 0) {
      Alert.alert('알림', '코스 이름과 장소를 1개 이상 포함해야 합니다.');
      return;
    }
    saveCourse({ id: courseId, title, description, places: selectedPlaces });
    navigation.popToTop(); // 코스 홈으로 이동
    navigation.navigate('CourseListScreen'); // 전체 코스 목록으로 이동
  };

  const handleDeletePlace = (place: Place) => {
    setSelectedPlaces(prev => prev.filter(p => p.id !== place.id));
    setPlaceToDelete(null);
    setModalVisible(false);
  };
  
  const openDeleteModal = (place: Place) => {
    setPlaceToDelete(place);
    setModalVisible(true);
  };

  const handleModalConfirm = () => {
    if (placeToDelete) {
      handleDeletePlace(placeToDelete);
    } else {
      setModalVisible(false);
      navigation.goBack();
    }
  };
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => <Text style={styles.headerTitle}>{isEditing ? '코스 수정' : '코스 만들기'}</Text>,
      headerLeft: () => (<TouchableOpacity onPress={() => setModalVisible(true)}><Ionicons name="close-outline" size={28} color="#333" /></TouchableOpacity>),
      headerRight: () => (<TouchableOpacity style={styles.saveButton} onPress={handleSave}><Text style={styles.saveButtonText}>저장</Text></TouchableOpacity>),
      headerStyle: { backgroundColor: '#FFFFFF' },
      headerShadowVisible: false,
      headerTitleAlign: 'center',
    });
  }, [navigation, isEditing, title, description, selectedPlaces]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>코스 이름</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="나만의 코스 이름을 지어주세요" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>코스 설명</Text>
          <TextInput style={[styles.input, styles.textarea]} value={description} onChangeText={setDescription} placeholder="코스에 대한 설명을 적어주세요 (선택)" multiline />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>포함된 장소 ({selectedPlaces.length})</Text>
          {selectedPlaces.map((place, index) => (
            <View key={place.id} style={styles.placeCard}>
              <View style={styles.placeNumber}><Text style={styles.placeNumberText}>{index + 1}</Text></View>
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeAddress}>{place.address}</Text>
              </View>
              <TouchableOpacity onPress={() => openDeleteModal(place)}>
                <Ionicons name="close-circle" size={24} color="#E0E0E0" />
              </TouchableOpacity>
            </View>
          ))}
          {/* [버그 수정] 장소 검색 화면으로 이동 시, 현재 장소 목록을 'currentPlaces'로 전달 */}
          <TouchableOpacity 
            style={styles.addPlaceButton} 
            onPress={() => navigation.navigate('PlaceSearchScreen', { courseId, currentPlaces: selectedPlaces })}
          >
            <Ionicons name="add" size={24} color="#007AFF" />
            <Text style={styles.addPlaceButtonText}>장소 추가</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{placeToDelete ? '장소 삭제' : '작성 취소'}</Text>
              <Text style={styles.modalMessage}>{placeToDelete ? `'${placeToDelete?.name}' 장소를 삭제하시겠어요?` : `작성을 취소하고 나가시겠어요?\n저장되지 않은 내용은 사라져요.`}</Text>
              <View style={styles.modalActions}>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelButtonText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, placeToDelete ? styles.deleteButton : styles.confirmButton]} onPress={handleModalConfirm}>
                    <Text style={styles.confirmButtonText}>{placeToDelete ? '삭제' : '나가기'}</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// 스타일 시트는 이전과 동일하게 유지됩니다.
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  saveButton: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  saveButtonText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  contentContainer: { padding: 20 },
  inputGroup: { marginBottom: 25 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10 },
  input: { backgroundColor: '#F2F2F7', paddingHorizontal: 15, height: 50, borderRadius: 10, fontSize: 16 },
  textarea: { height: 100, paddingTop: 15, textAlignVertical: 'top' },
  placeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F9F9', padding: 15, borderRadius: 10, marginBottom: 10 },
  placeNumber: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#EAEAEA', justifyContent: 'center', alignItems: 'center' },
  placeNumberText: { color: '#8E8E93', fontWeight: 'bold' },
  placeInfo: { flex: 1, marginLeft: 15, marginRight: 10 },
  placeName: { fontSize: 16, fontWeight: '600' },
  placeAddress: { fontSize: 14, color: '#828282', marginTop: 2 },
  addPlaceButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderWidth: 1, borderColor: '#007AFF', borderRadius: 8, marginTop: 10 },
  addPlaceButtonText: { marginLeft: 8, fontSize: 16, color: '#007AFF', fontWeight: '600' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '85%', backgroundColor: 'white', borderRadius: 14, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalMessage: { fontSize: 15, textAlign: 'center', color: '#4F4F4F', marginBottom: 20, lineHeight: 22 },
  modalActions: { flexDirection: 'row', width: '100%' },
  modalButton: { flex: 1, paddingVertical: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 },
  cancelButton: { backgroundColor: '#EFEFF4' },
  cancelButtonText: { color: '#007AFF', fontWeight: '600' },
  confirmButton: { backgroundColor: '#007AFF' },
  deleteButton: { backgroundColor: '#FF3B30' },
  confirmButtonText: { color: 'white', fontWeight: '600' },
});