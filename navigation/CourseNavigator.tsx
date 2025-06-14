import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Place } from '../data/courseData';

// [버그 수정] '코스 만들기' 상태 유지를 위해 파라미터 정의를 수정합니다.
export type CourseStackParamList = {
  CourseHomeScreen: undefined;
  CourseListScreen: undefined;
  CourseSearchScreen: undefined;
  CourseDetailScreen: { courseId: string };
  // 💣 이전: newPlace?: Place
  // ✨ 변경: updatedPlaces?: Place[] (장소 목록 전체를 받음)
  CourseCreateScreen: { courseId?: string; updatedPlaces?: Place[] };
  // 💣 이전: courseId?: string
  // ✨ 변경: currentPlaces?: Place[] (현재 장소 목록을 전달받음)
  PlaceSearchScreen: { courseId?: string; currentPlaces?: Place[] };
};

const Stack = createNativeStackNavigator<CourseStackParamList>();

// ⭐️ 필요한 화면 컴포넌트들을 정확한 경로에서 import 합니다.
import CourseCreateScreen from '../screens/Courses/CourseCreateScreen';
import CourseDetailScreen from '../screens/Courses/CourseDetailScreen';
import CourseHomeScreen from '../screens/Courses/CourseHomeScreen';
import CourseListScreen from '../screens/Courses/CourseListScreen';
import CourseSearchScreen from '../screens/Courses/CourseSearchScreen';
import PlaceSearchScreen from '../screens/Courses/PlaceSearchScreen';

const CourseNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CourseHomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CourseHomeScreen" component={CourseHomeScreen} />
      <Stack.Screen name="CourseListScreen" component={CourseListScreen} />
      <Stack.Screen name="CourseSearchScreen" component={CourseSearchScreen} />
      <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
      <Stack.Screen name="CourseCreateScreen" component={CourseCreateScreen} />
      <Stack.Screen name="PlaceSearchScreen" component={PlaceSearchScreen} />
    </Stack.Navigator>
  );
};

export default CourseNavigator;