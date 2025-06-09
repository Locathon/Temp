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
import { CourseStackParamList } from '../../navigation/CourseNavigator';
import { Place } from './PlaceSearchScreen'; // PlaceSearchScreen에서 정의한 Place 타입을 가져옵니다.


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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
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
});
