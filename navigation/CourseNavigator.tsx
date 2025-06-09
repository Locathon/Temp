import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Place } from '../screens/Courses/PlaceSearchScreen'; // 장소 타입을 가져옵니다.

// ⭐️ 각 화면이 어떤 정보를 주고받을지 약속(정의)을 최신화합니다.
export type CourseStackParamList = {
  CourseHomeScreen: undefined; // 코스 홈 (새로운 첫 화면)
  CourseListScreen: undefined; // 전체 코스 목록
  CourseDetailScreen: { courseId: string }; // 코스 상세 (지도 중심)
  CourseCreateScreen: { newPlace?: Place }; // 코스 만들기
  PlaceSearchScreen: undefined; // 장소 검색
};

const Stack = createNativeStackNavigator<CourseStackParamList>();

// ⭐️ 필요한 화면 컴포넌트들을 정확한 경로에서 import 합니다.
import CourseCreateScreen from '../screens/Courses/CourseCreateScreen';
import CourseDetailScreen from '../screens/Courses/CourseDetailScreen';
import CourseHomeScreen from '../screens/Courses/CourseHomeScreen';
import CourseListScreen from '../screens/Courses/CourseListScreen';
import PlaceSearchScreen from '../screens/Courses/PlaceSearchScreen';

const CourseNavigator = () => {
  return (
    // ⭐️ 시작 화면을 'CourseHomeScreen'으로 변경합니다.
    <Stack.Navigator initialRouteName="CourseHomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CourseHomeScreen" component={CourseHomeScreen} />
      <Stack.Screen name="CourseListScreen" component={CourseListScreen} />
      <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
      <Stack.Screen name="CourseCreateScreen" component={CourseCreateScreen} />
      <Stack.Screen name="PlaceSearchScreen" component={PlaceSearchScreen} />
    </Stack.Navigator>
  );
};

export default CourseNavigator;
