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

// --- 타입 정의 ---
type CourseHomeScreenNavigationProp = NativeStackNavigationProp<
  CourseStackParamList,
  'CourseHomeScreen'
>;

// --- 디자인팀의 요구사항을 반영한 새로운 코스 아이템 컴포넌트 ---
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
    {/* 썸네일 이미지 */}
    <Image source={item.thumbnail} style={styles.thumbnail} />

    {/* 코스 정보 (제목, 부제) */}
    <View style={styles.courseInfo}>
      <Text style={styles.courseTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.courseSubtitle} numberOfLines={1}>
        {item.subtitle}
      </Text>
    </View>

    {/* 오른쪽 아이콘 영역 (더보기) */}
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
  ];

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

      {/* 코스 목록 (SectionList로 변경) */}
      <SectionList
        sections={courseSections}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <CourseItem item={item} navigation={navigation} />
        )}
        renderSectionHeader={({ section: { title, data } }) =>
          // 데이터가 있을 때만 섹션 헤더를 보여줌
          data.length > 0 ? (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('CourseListScreen')}
              >
                <Text style={styles.seeAllText}>전체보기</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
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

// --- 디자인팀의 요구사항을 반영한 새로운 StyleSheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F3', // 디자인의 메인 배경색
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
    // 'Pretendard Variable' 폰트는 프로젝트에 설치 및 설정되어 있어야 합니다.
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
    backgroundColor: 'transparent', // 카드의 배경은 전체 배경색과 동일하게
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000000',
    padding: 12,
    marginBottom: 20, // 각 카드 사이의 간격
    height: 95, // 디자인 명세서의 높이
  },
  thumbnail: {
    width: 71, // 디자인 명세서 기반 크기
    height: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(156, 171, 194, 0.35)', // 이미지 없을 때의 배경색
    borderWidth: 2,
    borderColor: '#000000',
  },
  courseInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
    gap: 10, // 제목과 부제 사이의 간격
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000', // 실제 텍스트 색상
  },
  courseSubtitle: {
    fontSize: 14,
    color: '#6E6E73', // 실제 텍스트 색상
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
