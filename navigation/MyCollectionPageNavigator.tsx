import { createNativeStackNavigator } from '@react-navigation/native-stack';

import account_settings from '../screens/MyCollectionPage/account-settings';
import edit_profile from '../screens/MyCollectionPage/edit-profile';
import my_courses from '../screens/MyCollectionPage/my-courses';
import my_places from '../screens/MyCollectionPage/my-places';
import my_reivews from '../screens/MyCollectionPage/my-reviews';
import mypage from '../screens/MyCollectionPage/mypage';


const Stack = createNativeStackNavigator();

const PlaceStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="mypage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="mypage" component = {mypage} />
        <Stack.Screen name="edit_profile" component={edit_profile} />
        <Stack.Screen name="my-courses" component={my_courses} />
        <Stack.Screen name="my-places" component={my_places} />
        <Stack.Screen name="my-reviews" component = {my_reivews} />
        <Stack.Screen name="account-settings" component={account_settings} />

    </Stack.Navigator>
  );
};

export default PlaceStackNavigator;