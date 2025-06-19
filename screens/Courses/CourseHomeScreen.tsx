// C:\Users\mnb09\Desktop\Temp\screens\Courses\CourseHomeScreen.tsx

import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import {
  Image,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Course,
  myCourses,
  recommendedCourses,
  savedCourses,
} from '../../data/courseData';
import { CourseStackParamList } from '../../navigation/CourseNavigator';

type CourseHomeScreenNavigationProp = NativeStackNavigationProp<
  CourseStackParamList,
  'CourseHomeScreen'
>;

// 디자인팀의 요구사항을 반영한 새로운 코스 아이템 컴포넌트
const CourseItem = ({
  item,
  navigation,
}: {
  item: Course;
  navigation: CourseHomeScreenNavigationProp;
}) => (
  <TouchableOpacity
    style={styles.courseCard}
    onPress={() =>
      navigation.navigate('CourseDetailScreen', { courseId: item.id })
    }
    activeOpacity={0.8}
  >
    <Image source={item.thumbnail} style={styles.thumbnail} />
    <View style={styles.courseInfo}>
      <Text style={styles.courseTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.courseSubtitle} numberOfLines={1}>
        {item.subtitle}
      </Text>
    </View>
    <View style={styles.arrowContainer}>
      <Ionicons name="chevron-forward" size={24} color="#92A0A9" />
    </View>
  </TouchableOpacity>
);

export default function CourseHomeScreen() {
  const navigation = useNavigation<CourseHomeScreenNavigationProp>();

  // 화면이 포커스될 때마다 데이터를 새로고침하기 위한 로직
  const [refreshKey, setRefreshKey] = useState(0);
  useFocusEffect(
    useCallback(() => {
      setRefreshKey((prevKey) => prevKey + 1);
    }, [])
  );

  // SectionList에 사용할 데이터 구조로 변환
  const courseSections = [
    {
      title: '느린행궁이 추천하는 코스',
      data: recommendedCourses,
      key: 'recommended',
    },
    {
      title: '저장한 코스',
      data: savedCourses,
      key: 'saved',
    },
    {
      title: '나의 코스',
      data: myCourses,
      key: 'my',
    },
  // 데이터가 없는 섹션은 아예 표시하지 않기 위해 filter를 사용합니다.
  ].filter(section => section.data.length > 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>행궁동 코스</Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CourseSearchScreen')}
          >
            <Ionicons name="search-outline" size={28} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CourseCreateScreen', { courseId: undefined })
            }
          >
            <Ionicons name="add-circle-outline" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 코스 목록 (SectionList로 구현) */}
      <SectionList
        sections={courseSections}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <CourseItem item={item} navigation={navigation} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('CourseListScreen')}
            >
              <Text style={styles.seeAllText}>전체보기</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>표시할 코스가 없습니다.</Text>
          </View>
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        extraData={refreshKey} // 데이터가 변경되었음을 알려주어 리스트를 새로고침
      />
    </SafeAreaView>
  );
}

// 디자인팀의 요구사항을 반영한 새로운 StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Pretendard Variable',
    color: '#000000',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  seeAllText: {
    fontSize: 14,
    color: '#92A0A9',
    fontWeight: '500',
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000000',
    padding: 12,
    marginBottom: 20,
    height: 95,
  },
  thumbnail: {
    width: 71,
    height: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(156, 171, 194, 0.35)',
    borderWidth: 2,
    borderColor: '#000000',
  },
  courseInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
    gap: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  courseSubtitle: {
    fontSize: 14,
    color: '#6E6E73',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#92A0A9',
  },
});
