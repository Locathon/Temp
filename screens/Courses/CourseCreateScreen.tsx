// C:\Users\mnb09\Desktop\Temp\screens\Courses\CourseCreateScreen.tsx

import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { courseDetailsMap, Place, saveCourse } from '../../data/courseData';
import { CourseStackParamList } from '../../navigation/CourseNavigator';

type Props = NativeStackScreenProps<CourseStackParamList, 'CourseCreateScreen'>;

export default function CourseCreateScreen({ route, navigation }: Props) {
  const { courseId, newPlace } = route.params || {};
  const isEditing = !!courseId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  
  // BUG FIX (2): 수정 모드에서 데이터가 덮어쓰기 되는 것을 방지하는 플래그
  const isInitialized = useRef(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState<Place | null>(null);

  // 컴포넌트 마운트 시 수정 모드 데이터 로드
  useEffect(() => {
    // 수정 모드이고, 아직 초기화되지 않았을 때만 실행
    if (isEditing && !isInitialized.current) {
      const courseData = courseDetailsMap.get(courseId);
      if (courseData) {
        setTitle(courseData.title);
        setDescription(courseData.description);
        setSelectedPlaces(courseData.places);
      }
      // 초기화되었음을 표시하여, 장소를 추가하고 돌아와도 이 로직이 다시 실행되지 않도록 함
      isInitialized.current = true;
    }
  }, [courseId, isEditing]);

  // PlaceSearchScreen에서 newPlace 파라미터를 받아 장소를 추가하는 로직
  useEffect(() => {
    if (newPlace) {
      // 중복 추가 방지
      if (!selectedPlaces.find(p => p.id === newPlace.id)) {
        // ✨ 항상 현재의 selectedPlaces 상태에 이어서 추가합니다.
        setSelectedPlaces(prevPlaces => [...prevPlaces, newPlace]);
      }
      // 파라미터 정리 (무한 루프 방지)
      navigation.setParams({ newPlace: undefined });
    }
  }, [newPlace, navigation]);

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

  // 저장 버튼 클릭 시 실제 데이터 변경 함수 호출
  const handleSave = () => {
    if (!title.trim() || selectedPlaces.length < 2) {
      Alert.alert('저장 불가', '코스 이름과 2개 이상의 장소는 필수입니다.');
      return;
    }

    saveCourse({
        id: courseId,
        title,
        description,
        places: selectedPlaces,
    });

    Alert.alert(isEditing ? '수정 완료' : '저장 완료', '코스가 성공적으로 저장되었습니다.');
    navigation.popToTop();
  };
  
  const handleRemovePlace = (place: Place) => { setPlaceToDelete(place); setModalVisible(true); };
  const confirmRemovePlace = () => {
    if (placeToDelete) { setSelectedPlaces(prev => prev.filter(p => p.id !== placeToDelete.id)); }
    setModalVisible(false);
    setPlaceToDelete(null);
  };
  const handleModalConfirm = () => {
    if (placeToDelete) { confirmRemovePlace(); } 
    else { setModalVisible(false); navigation.goBack(); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          <TextInput style={styles.titleInput} placeholder="코스 이름을 입력하세요 (예: 행궁동 사진 맛집 코스)" placeholderTextColor="#BDBDBD" value={title} onChangeText={setTitle} />
          <TextInput style={styles.descriptionInput} placeholder="어떤 코스인지 간단하게 설명해주세요 (선택사항)" placeholderTextColor="#BDBDBD" value={description} onChangeText={setDescription} multiline />
        </View>

        <View style={styles.placeListContainer}>
          <Text style={styles.placeListTitle}>포함된 장소 ({selectedPlaces.length})</Text>
          {selectedPlaces.map((place, index) => (
            <View key={`${place.id}-${index}`} style={styles.placeItem}>
              <View style={styles.placeNumber}><Text style={styles.placeNumberText}>{index + 1}</Text></View>
              <View style={styles.placeInfo}><Text style={styles.placeName} numberOfLines={1}>{place.name}</Text><Text style={styles.placeAddress} numberOfLines={1}>{place.category}</Text></View>
              <TouchableOpacity onPress={() => handleRemovePlace(place)}><Ionicons name="close-circle" size={22} color="#E0E0E0" /></TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addPlaceButton} onPress={() => navigation.navigate('PlaceSearchScreen', { courseId })}>
            <Ionicons name="add" size={22} color="#007AFF" />
            <Text style={styles.addPlaceButtonText}>장소 추가하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}><View style={styles.modalContent}><Text style={styles.modalTitle}>{placeToDelete ? '장소 삭제' : '작성 취소'}</Text><Text style={styles.modalMessage}>{placeToDelete ? `'${placeToDelete?.name}' 장소를 삭제하시겠어요?` : `작성을 취소하고 나가시겠어요?\n저장되지 않은 내용은 사라져요.`}</Text><View style={styles.modalActions}><TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}><Text style={styles.cancelButtonText}>취소</Text></TouchableOpacity><TouchableOpacity style={[styles.modalButton, placeToDelete ? styles.deleteButton : styles.confirmButton]} onPress={handleModalConfirm}><Text style={styles.confirmButtonText}>{placeToDelete ? '삭제' : '나가기'}</Text></TouchableOpacity></View></View></View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  saveButton: { backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  saveButtonText: { color: 'white', fontWeight: 'bold' },
  formContainer: { padding: 20 },
  titleInput: { fontSize: 22, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#F2F2F2', paddingBottom: 16, paddingTop: 8, height: 50 },
  descriptionInput: { fontSize: 16, color: '#4F4F4F', paddingTop: 16, minHeight: 80, textAlignVertical: 'top' },
  placeListContainer: { padding: 20, borderTopWidth: 8, borderTopColor: '#F2F2F7' },
  placeListTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  placeItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
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
  modalButton: { flex: 1, paddingVertical: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  cancelButton: { backgroundColor: '#E5E5EA', marginRight: 5 },
  cancelButtonText: { color: '#4F4F4F', fontWeight: '500', fontSize: 16 },
  confirmButton: { backgroundColor: '#007AFF', marginLeft: 5 },
  deleteButton: { backgroundColor: '#FF3B30', marginLeft: 5 },
  confirmButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
