// C:\Users\mnb09\Desktop\Temp\screens\Courses\PlaceSearchScreen.tsx

import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { allPlaces, Place } from '../../data/courseData';
import { CourseStackParamList } from '../../navigation/CourseNavigator';

type PlaceSearchNavigationProp = NativeStackNavigationProp<CourseStackParamList, 'PlaceSearchScreen'>;
type PlaceSearchRouteProp = RouteProp<CourseStackParamList, 'PlaceSearchScreen'>;

export default function PlaceSearchScreen() {
  const navigation = useNavigation<PlaceSearchNavigationProp>();
  const route = useRoute<PlaceSearchRouteProp>();
  // route.params가 없을 수도 있으므로 옵셔널 체이닝으로 안전하게 접근
  const courseId = route.params?.courseId;

  const [query, setQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(allPlaces);

  useEffect(() => {
    const results = allPlaces.filter((place) =>
      place.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlaces(results);
  }, [query]);

  const handleSelectPlace = (place: Place) => {
    navigation.navigate({
        name: 'CourseCreateScreen',
        params: { newPlace: place, courseId },
        merge: true,
    });
  };

  const renderPlaceItem = ({ item }: { item: Place }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleSelectPlace(item)}>
      <Image source={item.thumbnail!} style={styles.thumbnail} />
      <View style={styles.resultTextContainer}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultCategory}>{item.category}</Text>
      </View>
      <Ionicons name="add-circle" size={28} color="#007AFF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#333" /></TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#828282" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="코스에 추가할 장소를 검색하세요" value={query} onChangeText={setQuery} autoFocus={true} />
        </View>
      </View>
      
      <FlatList data={filteredPlaces} renderItem={renderPlaceItem} keyExtractor={item => item.id} contentContainerStyle={styles.listContainer} ListEmptyComponent={<View style={styles.emptyContainer}><Text style={styles.emptyText}>검색 결과가 없어요.</Text></View>} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#EAEAEA' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, backgroundColor: '#F2F2F7', borderRadius: 10, marginLeft: 12 },
  searchIcon: { marginHorizontal: 10 },
  searchInput: { flex: 1, height: 40, fontSize: 16 },
  listContainer: { padding: 16 },
  resultItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, padding: 8, borderRadius: 8 },
  thumbnail: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#E0E0E0' },
  resultTextContainer: { flex: 1, marginLeft: 12 },
  resultName: { fontSize: 16, fontWeight: '600' },
  resultCategory: { fontSize: 13, color: '#828282', marginTop: 2 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '40%' },
  emptyText: { fontSize: 16, color: 'gray' },
});
