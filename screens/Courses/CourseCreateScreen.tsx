<<<<<<< Updated upstream
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
=======
// C:\Users\mnb09\Desktop\Temp\screens\Courses\CourseCreateScreen.tsx

import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { courseDetailsMap, Place, saveCourse } from '../../data/courseData';
>>>>>>> Stashed changes
import { CourseStackParamList } from '../../navigation/CourseNavigator';
import { Place } from './PlaceSearchScreen'; // PlaceSearchScreen에서 정의한 Place 타입을 가져옵니다.

<<<<<<< Updated upstream

// 네비게이션 파라미터 타입을 정의합니다.
// useRoute에 직접 적용하기 위해 RouteProp 대신 ScreenProps를 사용해 타입을 더 명확히 할 수 있습니다.
type Props = NativeStackScreenProps<CourseStackParamList, 'CourseCreateScreen'>;


export default function CourseCreateScreen({ route }: Props) { // route를 props로 직접 받습니다.
  const navigation = useNavigation<NativeStackNavigationProp<CourseStackParamList>>();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);

  // PlaceSearchScreen에서 장소를 선택하고 돌아왔을 때, 그 장소를 목록에 추가합니다.
  useEffect(() => {
    if (route.params?.newPlace) {
      const newPlace = route.params.newPlace;
      
      // ⭐️ 함수형 업데이트를 사용하여 최신 상태를 기반으로 새 장소를 추가합니다.
      setSelectedPlaces(prevPlaces => {
        // 이미 추가된 장소인지 확인하여 중복 추가를 방지합니다.
        if (!prevPlaces.find(place => place.id === newPlace.id)) {
          return [...prevPlaces, newPlace];
        }
        // 이미 있다면 기존 상태를 그대로 반환합니다.
        return prevPlaces;
      });

      // 파라미터를 사용한 후에는 초기화하여 뒤로가기/앞으로가기 시 중복 추가되는 것을 방지합니다.
      // 이 로직은 지금은 그대로 두어도 괜찮습니다.
      navigation.setParams({ newPlace: undefined });
    }
  }, [route.params?.newPlace]);


  const handleSaveCourse = () => {
    if (!title || selectedPlaces.length < 2) {
      Alert.alert('저장 불가', '코스 이름과 2개 이상의 장소는 필수입니다.');
      return;
    }
    console.log({ title, description, places: selectedPlaces });
    Alert.alert('저장 완료', '나만의 코스가 저장되었습니다!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>나만의 코스 만들기</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveCourse}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.288,
            longitude: 127.016,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
        >
          {selectedPlaces.map(place => (
            <Marker
              key={place.id}
              coordinate={{ latitude: place.latitude || 0, longitude: place.longitude || 0 }}
              title={place.name}
            />
          ))}
        </MapView>
        
        <View style={styles.formContainer}>
            <TextInput
                style={styles.titleInput}
                placeholder="코스 이름을 입력하세요 (예: 행궁동 사진 맛집 코스)"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.descriptionInput}
                placeholder="어떤 코스인지 간단하게 설명해주세요 (선택)"
                value={description}
                onChangeText={setDescription}
                multiline
            />
        </View>

        <View style={styles.placeListContainer}>
            <Text style={styles.placeListTitle}>포함된 장소 ({selectedPlaces.length})</Text>
            {selectedPlaces.map((place, index) => (
                <View key={place.id} style={styles.placeItem}>
                    <View style={styles.placeNumber}>
                        <Text style={styles.placeNumberText}>{index + 1}</Text>
                    </View>
                    <View>
                        <Text style={styles.placeName}>{place.name}</Text>
                        <Text style={styles.placeAddress}>{place.category}</Text>
                    </View>
                </View>
            ))}
            {/* '장소 추가하기' 버튼을 누르면 PlaceSearchScreen으로 이동합니다. */}
            <TouchableOpacity style={styles.addPlaceButton} onPress={() => navigation.navigate('PlaceSearchScreen')}>
                <Ionicons name="add-circle-outline" size={22} color="#828282" />
                <Text style={styles.addPlaceButtonText}>장소 추가하기</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
=======
type Props = NativeStackScreenProps<CourseStackParamList, 'CourseCreateScreen'>;

export default function CourseCreateScreen({ route, navigation }: Props) {
  const { courseId, updatedPlaces } = route.params || {};
  const isEditing = !!courseId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState<Place | null>(null);

  useEffect(() => {
    if (route.params?.updatedPlaces) {
      setSelectedPlaces(route.params.updatedPlaces);
      navigation.setParams({ updatedPlaces: undefined });
    }
  }, [route.params?.updatedPlaces]);

  useEffect(() => {
    if (isEditing) {
      const courseData = courseDetailsMap.get(courseId);
      if (courseData) {
        setTitle(courseData.title);
        setDescription(courseData.description);
        setSelectedPlaces(courseData.places);
      }
    }
  }, [courseId, isEditing]);

  const handleSave = () => {
    if (!title.trim() || selectedPlaces.length === 0) {
      Alert.alert('알림', '코스 이름과 장소를 1개 이상 포함해야 합니다.');
      return;
    }
    saveCourse({ id: courseId, title, description, places: selectedPlaces });
    navigation.popToTop(); // [핵심 수정] 저장 후 코스 홈으로 돌아갑니다.
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
  
  const openCancelModal = () => {
    setPlaceToDelete(null);
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
      headerLeft: () => (<TouchableOpacity onPress={openCancelModal}><Ionicons name="close-outline" size={28} color="#333" /></TouchableOpacity>),
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
            <View key={`${place.id}-${index}`} style={styles.placeCard}>
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
          <TouchableOpacity 
            style={styles.addPlaceButton} 
            onPress={() => navigation.navigate('PlaceSearchScreen', { currentPlaces: selectedPlaces })}
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
>>>>>>> Stashed changes
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
<<<<<<< Updated upstream
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  saveButton: { backgroundColor: '#2F80ED', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  saveButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  map: { width: '100%', height: 250 },
  formContainer: { padding: 20, borderBottomWidth: 8, borderBottomColor: '#F2F2F7' },
  titleInput: { fontSize: 20, fontWeight: 'bold', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  descriptionInput: { fontSize: 16, paddingTop: 12, minHeight: 60, color: '#4F4F4F' },
  placeListContainer: { padding: 20 },
  placeListTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  placeItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  placeNumber: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#2F80ED', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  placeNumberText: { color: '#FFFFFF', fontWeight: 'bold' },
  placeName: { fontSize: 16, fontWeight: '600' },
  placeAddress: { fontSize: 14, color: '#828282', marginTop: 2 },
  addPlaceButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#F2F2F2', marginTop: 10 },
  addPlaceButtonText: { marginLeft: 8, fontSize: 16, color: '#4F4F4F' },
=======
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
>>>>>>> Stashed changes
});
