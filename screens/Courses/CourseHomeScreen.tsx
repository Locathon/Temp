// C:\Users\mnb09\Desktop\Temp\screens\Courses\CourseHomeScreen.tsx

import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Course, myCourses, recommendedCourses, savedCourses } from '../../data/courseData';
import { CourseStackParamList } from '../../navigation/CourseNavigator';

type CourseHomeScreenNavigationProp = NativeStackNavigationProp<
  CourseStackParamList,
  'CourseHomeScreen'
>;

export default function CourseHomeScreen() {
  const navigation = useNavigation<CourseHomeScreenNavigationProp>();
  // FEATURE (5): 저장한 코스 목록을 state로 관리하여 실시간 업데이트
  const [currentSavedCourses, setCurrentSavedCourses] = useState(savedCourses);

  // FEATURE (5): 이 화면이 다시 포커스될 때마다(예: 상세 화면에서 돌아올 때) 실행
  useFocusEffect(
    useCallback(() => {
      // data/courseData.ts의 최신 savedCourses 배열로 state를 업데이트
      setCurrentSavedCourses([...savedCourses]);
    }, [])
  );

  const renderCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('CourseDetailScreen', { courseId: item.id })
      }
      activeOpacity={0.8}
    >
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {item.subtitle}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.author}>by {item.author}</Text>
          <View style={styles.likesContainer}>
            <Ionicons name="heart" size={14} color="#EB5757" />
            <Text style={styles.likesText}>{item.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>코스</Text>
        <View style={styles.iconGroup}>
          {/* BUG FIX (3): 파라미터가 없는 navigate 호출 시 두 번째 인자 제거 */}
          <TouchableOpacity onPress={() => navigation.navigate('CourseSearchScreen')}>
            <Ionicons name="search-outline" size={24} color="#1C1C1E" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CourseCreateScreen', {})}>
            <Ionicons name="add-circle-outline" size={26} color="#1C1C1E" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 추천 코스 섹션 */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>느린행궁이 추천하는 코스</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CourseListScreen')}>
              <Text style={styles.seeAllText}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recommendedCourses}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContainer}
          />
        </View>
        
        {/* FEATURE (5): 저장한 코스 섹션 추가 */}
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>저장한 코스</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CourseListScreen')}>
                    <Text style={styles.seeAllText}>전체보기</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={currentSavedCourses}
                renderItem={renderCourseItem}
                keyExtractor={(item) => `saved-${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalListContainer}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Text style={styles.emptyListText}>저장한 코스가 없어요.</Text>
                    </View>
                }
            />
        </View>

        {/* 나의 코스 섹션 */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>나의 코스</Text>
             <TouchableOpacity onPress={() => navigation.navigate('CourseListScreen')}>
              <Text style={styles.seeAllText}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={myCourses}
            renderItem={renderCourseItem}
            keyExtractor={(item) => `my-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContainer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ECF0F3' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#ECF0F3' },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1C1C1E' },
    iconGroup: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    sectionContainer: { marginTop: 24, minHeight: 100 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1C1C1E' },
    seeAllText: { fontSize: 14, color: '#007AFF' },
    horizontalListContainer: { paddingHorizontal: 20, paddingRight: 40 },
    card: { backgroundColor: '#FFFFFF', borderRadius: 12, width: 280, marginRight: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
    thumbnail: { width: '100%', height: 160, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
    cardContent: { padding: 12 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#111111', marginBottom: 4 },
    cardSubtitle: { fontSize: 13, color: '#6E6E73', marginBottom: 10 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    author: { fontSize: 12, color: '#8E8E93' },
    likesContainer: { flexDirection: 'row', alignItems: 'center' },
    likesText: { marginLeft: 4, fontSize: 12, color: '#3C3C43' },
    emptyListContainer: { paddingHorizontal: 20, width: 280, justifyContent: 'center', alignItems: 'center',},
    emptyListText: { color: '#8E8E93', fontSize: 15 },
});
