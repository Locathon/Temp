import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// [핵심 수정] 새로 만든 MyCollectionScreen을 import 합니다.
import MyCollectionScreen from '../screens/MyCollectionPage/MyCollection';

// 기존 스크린 import 항목들
import account_settings from '../screens/MyCollectionPage/account-settings';
import app_setting from '../screens/MyCollectionPage/app-setting';
import edit_profile from '../screens/MyCollectionPage/edit-profile';
import EditCourseScreen from '../screens/MyCollectionPage/EditCourseScreen';
import Guide from '../screens/MyCollectionPage/guide';
import MapCourseScreen from '../screens/MyCollectionPage/MapCourseScreen';
import my_courses from '../screens/MyCollectionPage/my-courses';
import MyPlacesScreen from '../screens/MyCollectionPage/my-places';
import my_reivews from '../screens/MyCollectionPage/my-reviews';
import mypage from '../screens/MyCollectionPage/mypage';
import Privacy from '../screens/MyCollectionPage/privacy';
import ResidentAuthScreen from '../screens/MyCollectionPage/ResidentAuthScreen';
import Settings from '../screens/MyCollectionPage/settings';
import Terms from '../screens/MyCollectionPage/terms';
import PlaceDetailScreen from '../screens/Places/PlaceDetailScreen';

const Stack = createNativeStackNavigator();

const MyCollectionPageNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="mypage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="mypage" component={mypage} />
        
        {/* [핵심 수정] '마이 컬렉션' 버튼을 눌렀을 때 이동할 MyCollectionScreen을 네비게이터에 등록합니다. */}
        <Stack.Screen name="MyCollection" component={MyCollectionScreen} />

        {/* MyCollectionScreen에서 각 버튼을 눌렀을 때 이동할 화면들 */}
        <Stack.Screen name="my-places" component={MyPlacesScreen} />
        <Stack.Screen name="my-courses" component={my_courses} />

        {/* 나머지 기존 화면들 */}
        <Stack.Screen name="edit_profile" component={edit_profile} />
        <Stack.Screen name="my-reviews" component={my_reivews} />
        <Stack.Screen name="app-setting" component={app_setting} />
        <Stack.Screen name="account-settings" component={account_settings} />
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="terms" component={Terms} />
        <Stack.Screen name="privacy" component={Privacy} />
        <Stack.Screen name="guide" component={Guide} />
        <Stack.Screen name="ResidentAuth" component={ResidentAuthScreen} />
        <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
        <Stack.Screen name="MapCourseScreen" component={MapCourseScreen} />
        <Stack.Screen name="EditCourseScreen" component={EditCourseScreen} />
    </Stack.Navigator>
  );
};

export default MyCollectionPageNavigator;
