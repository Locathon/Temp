// C:\Users\mnb09\Desktop\Temp\screens\Courses\CourseDetailScreen.tsx

import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { Dimensions, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { courseDetailsMap, savedCourses, toggleSaveCourse } from '../../data/courseData';
import { CourseStackParamList } from '../../navigation/CourseNavigator';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type CourseDetailRouteProp = RouteProp<CourseStackParamList, 'CourseDetailScreen'>;
type CourseDetailNavigationProp = NativeStackNavigationProp<CourseStackParamList, 'CourseDetailScreen'>;

export default function CourseDetailScreen() {
  const navigation = useNavigation<CourseDetailNavigationProp>();
  const route = useRoute<CourseDetailRouteProp>();
  const { courseId } = route.params;

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const course = useMemo(() => courseDetailsMap.get(courseId), [courseId]);

  const [likeCount, setLikeCount] = useState(course?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(savedCourses.some(c => c.id === courseId));

  if (!course) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#333" /></TouchableOpacity>
        </View>
        <View style={styles.centered}><Text>코스 정보를 찾을 수 없습니다.</Text></View>
      </SafeAreaView>
    );
  }
  
  const handleLike = () => {
    // BUG FIX (3): prev 파라미터에 명시적 타입 부여
    setIsLiked((prev: boolean) => !prev);
    setLikeCount((prev: number) => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    const result = toggleSaveCourse(course);
    setIsSaved(result);
  };

  const handleEdit = () => { navigation.navigate('CourseCreateScreen', { courseId }); };
  const handleDelete = () => { setDeleteModalVisible(false); navigation.goBack(); };
  
  const latitudes = course.places.map((p) => p.coordinate.latitude);
  const longitudes = course.places.map((p) => p.coordinate.longitude);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLon = Math.min(...longitudes);
  const maxLon = Math.max(...longitudes);
  const centerLat = (maxLat + minLat) / 2;
  const centerLon = (maxLon + minLon) / 2;
  const latitudeDelta = (maxLat - minLat) * 1.6 || 0.01;
  const longitudeDelta = (maxLon - minLon) * 1.6 || 0.01;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{course.title}</Text>
        {course.isMyCourse ? (<TouchableOpacity onPress={() => setDeleteModalVisible(true)}><Ionicons name="trash-outline" size={24} color="#333" /></TouchableOpacity>) : (<View style={{ width: 24 }} />)}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <MapView style={styles.map} initialRegion={{ latitude: centerLat, longitude: centerLon, latitudeDelta, longitudeDelta }}>
          {course.places.map((place, index) => (<Marker key={place.id} coordinate={place.coordinate}><View style={styles.markerContainer}><Text style={styles.markerText}>{index + 1}</Text></View></Marker>))}
          <Polyline coordinates={course.places.map((p) => p.coordinate)} strokeColor="#4A90E2" strokeWidth={3} lineDashPattern={[5, 5]} />
        </MapView>
        
        <View style={styles.contentContainer}>
            <View style={styles.courseInfoContainer}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseAuthor}>by {course.author}</Text>
                <Text style={styles.courseDescription}>{course.description}</Text>
                 <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
                        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? '#EB5757' : '#4F4F4F'} />
                        <Text style={[styles.actionButtonText, isLiked && styles.likedText]}>{likeCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
                        <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={24} color={isSaved ? '#007AFF' : '#4F4F4F'} />
                        <Text style={[styles.actionButtonText, isSaved && styles.savedText]}>저장</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="share-outline" size={24} color="#4F4F4F" />
                        <Text style={styles.actionButtonText}>공유</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.placeListContainer}>
                {course.places.map((place, index) => ( <View key={place.id}> {index > 0 && <View style={styles.pathInfo}><Text style={styles.pathText}>{place.time}</Text></View>} <View style={styles.placeItem}><View style={styles.placeNumber}><Text style={styles.placeNumberText}>{index + 1}</Text></View><View><Text style={styles.placeName}>{place.name}</Text><Text style={styles.placeAddress}>{place.address}</Text></View></View></View> ))}
            </View>
        </View>
      </ScrollView>

      {course.isMyCourse && (<TouchableOpacity style={styles.editButton} onPress={handleEdit}><Text style={styles.editButtonText}>이 코스 수정하기</Text></TouchableOpacity>)}

      <Modal animationType="fade" transparent={true} visible={deleteModalVisible} onRequestClose={() => setDeleteModalVisible(false)}>
        <View style={styles.modalContainer}><View style={styles.modalContent}><Text style={styles.modalTitle}>코스 삭제</Text><Text style={styles.modalMessage}>이 코스를 정말 삭제하시겠습니까?{"\n"}삭제된 코스는 복구할 수 없습니다.</Text><View style={styles.modalActions}><TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setDeleteModalVisible(false)}><Text style={styles.cancelButtonText}>취소</Text></TouchableOpacity><TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={handleDelete}><Text style={styles.deleteButtonText}>삭제</Text></TouchableOpacity></View></View></View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' }, centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EAEAEA' }, headerTitle: { fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center', marginHorizontal: 16 }, map: { width: screenWidth, height: screenHeight * 0.35 }, markerContainer: { backgroundColor: '#007AFF', borderRadius: 12, padding: 6, borderColor: 'white', borderWidth: 1 }, markerText: { color: 'white', fontWeight: 'bold', fontSize: 14 }, contentContainer: { padding: 20 }, courseInfoContainer: { marginBottom: 24 }, courseTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 }, courseAuthor: { fontSize: 14, color: '#8E8E93', marginBottom: 12 }, courseDescription: { fontSize: 16, color: '#4F4F4F', lineHeight: 24 }, actionButtons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#F2F2F2' }, actionButton: { alignItems: 'center', gap: 4 }, actionButtonText: { fontSize: 12, color: '#4F4F4F' }, likedText: { color: '#EB5757' }, savedText: { color: '#007AFF' }, separator: { height: 8, backgroundColor: '#F2F2F7', marginHorizontal: -20 }, placeListContainer: { marginTop: 24 }, pathInfo: { alignItems: 'center', marginVertical: 12 }, pathText: { fontSize: 13, color: '#8E8E93', backgroundColor: '#F2F2F7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, overflow: 'hidden' }, placeItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 }, placeNumber: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginRight: 15 }, placeNumberText: { color: 'white', fontWeight: 'bold' }, placeName: { fontSize: 17, fontWeight: '600' }, placeAddress: { fontSize: 14, color: '#828282', marginTop: 2 }, editButton: { backgroundColor: '#007AFF', padding: 16, margin: 20, borderRadius: 12, alignItems: 'center' }, editButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }, modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }, modalContent: { width: '80%', backgroundColor: 'white', borderRadius: 14, padding: 20, alignItems: 'center' }, modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }, modalMessage: { fontSize: 15, textAlign: 'center', color: '#4F4F4F', marginBottom: 20, lineHeight: 22 }, modalActions: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' }, modalButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' }, cancelButton: { backgroundColor: '#E5E5EA', marginRight: 5 }, cancelButtonText: { color: '#4F4F4F', fontWeight: '500' }, deleteButton: { backgroundColor: '#FF3B30', marginLeft: 5 }, deleteButtonText: { color: 'white', fontWeight: 'bold' },
});
