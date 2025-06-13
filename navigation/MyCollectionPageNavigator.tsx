import { createNativeStackNavigator } from '@react-navigation/native-stack';

import account_settings from '../screens/MyCollectionPage/account-settings';
import app_setting from '../screens/MyCollectionPage/app-setting';
import edit_profile from '../screens/MyCollectionPage/edit-profile';
import Guide from '../screens/MyCollectionPage/guide';
import my_courses from '../screens/MyCollectionPage/my-courses';
import my_reivews from '../screens/MyCollectionPage/my-reviews';
import mypage from '../screens/MyCollectionPage/mypage';
import Privacy from '../screens/MyCollectionPage/privacy';
import ResidentAuthScreen from '../screens/MyCollectionPage/ResidentAuthScreen';
import Settings from '../screens/MyCollectionPage/settings';
import Terms from '../screens/MyCollectionPage/terms';

// ⭐️ 1단계에서 만든 파일을 import 합니다.
import MyPlacesScreen from '../screens/MyCollectionPage/my-places';

const Stack = createNativeStackNavigator();

const MyCollectionPageNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="mypage" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="mypage" component={mypage} />
        <Stack.Screen name="edit_profile" component={edit_profile} />
        <Stack.Screen name="my-courses" component={my_courses} />
        <Stack.Screen name="my-reviews" component={my_reivews} />
        
        {/* ⭐️ '내가 기록한 장소' 화면 경로를 추가합니다. */}
        <Stack.Screen name="my-places" component={MyPlacesScreen} />

        <Stack.Screen name="app-setting" component={app_setting} />
        <Stack.Screen name="account-settings" component={account_settings} />
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="terms" component={Terms} />
        <Stack.Screen name="privacy" component={Privacy} />
        <Stack.Screen name="guide" component={Guide} />
        <Stack.Screen name="ResidentAuth" component={ResidentAuthScreen} />
    </Stack.Navigator>
  );
};

export default MyCollectionPageNavigator;
