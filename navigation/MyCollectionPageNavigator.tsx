import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// --- 스크린 컴포넌트 import ---
// 마이페이지 메인 및 컬렉션
import MyCollectionScreen from '../screens/MyCollectionPage/MyCollection';
import my_courses from '../screens/MyCollectionPage/my-courses';
import MyPlacesScreen from '../screens/MyCollectionPage/my-places';
import my_reivews from '../screens/MyCollectionPage/my-reviews';
import mypage from '../screens/MyCollectionPage/mypage';

// 상세 페이지 및 수정 화면
import EditCourseScreen from '../screens/MyCollectionPage/EditCourseScreen';
import MapCourseScreen from '../screens/MyCollectionPage/MapCourseScreen';
import edit_profile from '../screens/MyCollectionPage/edit-profile';
import PlaceDetailScreen from '../screens/Places/PlaceDetailScreen';

// 설정 및 기타
import ResidentAuthScreen from '../screens/MyCollectionPage/ResidentAuthScreen';
import account_settings from '../screens/MyCollectionPage/account-settings';
import app_setting from '../screens/MyCollectionPage/app-setting';
import Guide from '../screens/MyCollectionPage/guide';
import Privacy from '../screens/MyCollectionPage/privacy';
import Settings from '../screens/MyCollectionPage/settings';
import Terms from '../screens/MyCollectionPage/terms';


// [핵심] 네비게이터가 관리할 화면들의 목록과 각 화면이 받을 파라미터 타입을 명확하게 정의합니다.
// 이렇게 하면 코드 안정성이 높아지고, 잘못된 파라미터 전달 등의 실수를 방지할 수 있습니다.
export type MyCollectionStackParamList = {
  mypage: undefined;
  MyCollection: undefined;
  'my-places': undefined;
  'my-courses': undefined;
  PlaceDetail: { id: string }; // PlaceDetailScreen은 'id'를 문자열로 받습니다.
  MapCourseScreen: { courseId: string };
  EditCourseScreen: { courseId: string };
  edit_profile: undefined;
  'my-reviews': undefined;
  'app-setting': undefined;
  'account-settings': undefined;
  settings: undefined;
  terms: undefined;
  privacy: undefined;
  guide: undefined;
  ResidentAuth: undefined;
};

// [핵심] 생성하는 스택 네비게이터에 위에서 정의한 파라미터 목록 타입을 적용합니다.
const Stack = createNativeStackNavigator<MyCollectionStackParamList>();

const MyCollectionPageNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="mypage" 
      screenOptions={{ headerShown: false }}
    >
      {/* 마이페이지 & 컬렉션 */}
      <Stack.Screen name="mypage" component={mypage} />
      <Stack.Screen name="MyCollection" component={MyCollectionScreen} />
      <Stack.Screen name="my-places" component={MyPlacesScreen} />
      <Stack.Screen name="my-courses" component={my_courses} />
      <Stack.Screen name="my-reviews" component={my_reivews} />
      
      {/* 상세 및 수정 화면 */}
      <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
      <Stack.Screen name="MapCourseScreen" component={MapCourseScreen} />
      <Stack.Screen name="EditCourseScreen" component={EditCourseScreen} />
      <Stack.Screen name="edit_profile" component={edit_profile} />

      {/* 설정 및 기타 화면 */}
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="account-settings" component={account_settings} />
      <Stack.Screen name="app-setting" component={app_setting} />
      <Stack.Screen name="ResidentAuth" component={ResidentAuthScreen} />
      <Stack.Screen name="guide" component={Guide} />
      <Stack.Screen name="terms" component={Terms} />
      <Stack.Screen name="privacy" component={Privacy} />
    </Stack.Navigator>
  );
};

export default MyCollectionPageNavigator;
