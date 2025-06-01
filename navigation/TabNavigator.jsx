import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlaceStackNavigator from './PlaceStackNavigator';

// import CommunityScreen from '../screens/Community/CommunityScreen';
// import CourseListScreen from '../screens/Courses/CourseListScreen';
// import MyPageScreen from '../screens/MyPage/MyPageScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Places" component={PlaceStackNavigator} options={{ title: '장소' }} />
      {/* <Tab.Screen name="Courses" component={CourseListScreen} options={{ title: '코스' }} />
      <Tab.Screen name="Community" component={CommunityScreen} options={{ title: '커뮤니티' }} />
      <Tab.Screen name="MyPage" component={MyPageScreen} options={{ title: '마이페이지' }} /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;