// C:\Users\mnb09\Desktop\Temp\navigation\CourseNavigator.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Place } from '../data/courseData';

// ⭐️ 각 화면이 어떤 정보를 주고받을지 약속(정의)을 최신화합니다.
export type CourseStackParamList = {
  CourseHomeScreen: undefined;
  CourseListScreen: undefined;
  CourseSearchScreen: undefined;
  CourseDetailScreen: { courseId: string };
  CourseCreateScreen: { courseId?: string; newPlace?: Place };
  // BUG FIX (1, 2): PlaceSearchScreen이 courseId를 받을 수 있도록 파라미터 타입 추가
  PlaceSearchScreen: { courseId?: string };
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
