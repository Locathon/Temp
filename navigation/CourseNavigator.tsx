// C:\Users\mnb09\Desktop\Temp\navigation\CourseNavigator.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Place } from '../data/courseData';

// [오류 수정] '코스 만들기/수정' 시 장소 목록 상태 유지를 위해 파라미터 정의를 수정합니다.
export type CourseStackParamList = {
  CourseHomeScreen: undefined;
  CourseListScreen: undefined;
  CourseSearchScreen: undefined;
  CourseDetailScreen: { courseId: string };
  // CourseCreateScreen은 수정할 courseId나, 장소 검색 후 돌아올 때 받을 updatedPlaces를 가질 수 있습니다.
  CourseCreateScreen: { courseId?: string; updatedPlaces?: Place[] };
  // PlaceSearchScreen은 현재 만들고 있는 코스의 장소 목록(currentPlaces)을 전달받습니다.
  PlaceSearchScreen: { currentPlaces: Place[] };
};

const Stack = createNativeStackNavigator<CourseStackParamList>();

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
