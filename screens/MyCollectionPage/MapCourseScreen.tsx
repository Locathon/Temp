import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { courseDetailsMap } from '../../data/courseData'; // 데이터 소스와 타입 import

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// [핵심] 이제 이 컴포넌트는 route prop을 통해 courseId를 받습니다.
export default function MapCourseScreen({ route }: any) {
  const navigation = useNavigation<any>();
  // route.params에서 courseId를 가져옵니다.
  const { courseId } = route.params;

  // courseId를 사용하여 courseData.ts의 Map에서 해당 코스의 상세 정보를 찾습니다.
  const course = courseDetailsMap.get(courseId);

  // 코스 정보가 없을 경우를 대비한 예외 처리
  if (!course || course.places.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#121212" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>오류</Text>
            <View style={{width: 24}} />
        </View>
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>코스 정보를 불러올 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const coordinates = course.places.map(p => p.coordinate);

  return (
    <View style={styles.container}>
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: coordinates[0]?.latitude || 37.28,
                longitude: coordinates[0]?.longitude || 127.01,
                latitudeDelta: 0.02, // 전체 코스가 잘 보이도록 델타값 조정
                longitudeDelta: 0.02,
            }}
            // 지도 로딩 후 모든 마커가 보이도록 카메라 위치 조정
            onMapReady={() => this.map.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            })}
            ref={(ref) => { this.map = ref; }}
        >
            {coordinates.length > 1 && <Polyline coordinates={coordinates} strokeColor="#48C8FF" strokeWidth={5} />}
            {course.places.map((place, index) => (
                <Marker key={place.id} coordinate={place.coordinate} title={place.name}>
                    <View style={styles.markerContainer}>
                        <Text style={styles.markerText}>{index + 1}</Text>
                    </View>
                </Marker>
            ))}
        </MapView>
      
        {/* 뒤로가기 버튼 (지도 위에 배치) */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.mapBackButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        {/* 하단 정보 시트 */}
        <View style={styles.bottomSheet}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.sheetHeader}>
                    <View style={styles.sheetHandle} />
                </View>
                <View style={styles.titleSection}>
                    <View>
                        <Text style={styles.authorText}>by {course.author}</Text>
                        <Text style={styles.titleText}>{course.title}</Text>
                        <Text style={styles.subtitleText}>{course.subtitle}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => {
                            navigation.navigate('EditCourseScreen', { courseId: course.id });
                        }}
                    >
                        <Text style={styles.editButtonText}>수정하기</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.separator} />

                {/* 장소 목록 */}
                {course.places.map((place, index) => (
                    <View key={place.id} style={styles.placeContainer}>
                        <View style={styles.timeline}>
                            <View style={styles.timelineIcon} />
                            {index < course.places.length - 1 && <View style={styles.timelineConnector} />}
                        </View>
                        <View style={styles.placeDetails}>
                            <Text style={styles.placeName}>{place.name}</Text>
                            <View style={styles.addressRow}>
                                <Ionicons name="location-outline" size={14} color="#888" />
                                <Text style={styles.placeAddress}>{place.address}</Text>
                            </View>
                            { index < course.places.length - 1 && place.time && (
                                <View style={styles.travelInfo}>
                                    <Ionicons name="walk-outline" size={14} color="#555" />
                                    <Text style={styles.travelText}>{place.time}</Text>
                                    <Ionicons name="bicycle-outline" size={14} color="#555" style={{marginLeft: 8}} />
                                    <Text style={styles.travelText}>자전거 8분</Text>
                                </View>
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center'},
    errorText: { fontSize: 18, fontWeight: 'bold' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 44, backgroundColor: '#FEFEFE', borderBottomWidth: 1, borderBottomColor: '#EBEEEF' },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    backButton: { padding: 4, },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapBackButton: {
        position: 'absolute',
        top: 60, // SafeArea 고려
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    markerContainer: { 
        backgroundColor: '#48C8FF', 
        paddingHorizontal: 7, 
        paddingVertical: 3, 
        borderRadius: 12, 
        borderColor: 'white', 
        borderWidth: 1.5 
    },
    markerText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: screenHeight * 0.6, // 화면의 60% 차지
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2, },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    sheetHeader: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    sheetHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#DCE2E4',
        borderRadius: 3,
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    authorText: {
        fontSize: 14,
        color: '#7E8B91',
        marginBottom: 4,
        fontFamily: 'Pretendard-Regular'
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#121212',
        fontFamily: 'Pretendard-Bold',
        flexShrink: 1,
        width: screenWidth * 0.6
    },
    subtitleText: {
        fontSize: 14,
        color: '#7E8B91',
        marginTop: 6,
        fontFamily: 'Pretendard-Regular'
    },
    editButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#3A4043',
        borderRadius: 20,
    },
    editButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Pretendard-SemiBold'
    },
    separator: {
        height: 1,
        backgroundColor: '#EBEEEF',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    placeContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    timeline: {
        width: 20,
        alignItems: 'center',
        marginRight: 12,
    },
    timelineIcon: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#48C8FF',
        borderWidth: 2,
        borderColor: 'white',
        elevation: 1, // for android shadow
    },
    timelineConnector: {
        flex: 1,
        width: 2,
        backgroundColor: '#DCE2E4',
    },
    placeDetails: {
        flex: 1,
        paddingBottom: 24,
    },
    placeName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3A4043',
        fontFamily: 'Pretendard-SemiBold',
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    placeAddress: {
        fontSize: 14,
        color: '#7E8B91',
        marginLeft: 4,
        fontFamily: 'Pretendard-Regular',
    },
    travelInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    travelText: {
        fontSize: 13,
        color: '#636E72',
        marginLeft: 4,
        fontFamily: 'Pretendard-Regular',
    }
});

