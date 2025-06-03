import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

// import CollectionScreen from '../screens/CollectionScreen';
// import CommunityScreen from '../screens/CommunityScreen';
// import CourseScreen from '../screens/CourseScreen';
import PlaceStackNavigator from './PlaceStackNavigator';
import BusinessNavigator from '../navigation/BusinessNavigator';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
  screenOptions={{ tabBarStyle: {position: 'fixed',bottom: 0,left: 0,right: 0,},headerShown: false }}>
      {/* <Tab.Screen name="커뮤니티탭" component={CommunityScreen} />
      <Tab.Screen name="코스탭" component={CourseScreen} /> */}
      <Tab.Screen name="장소탭" component={PlaceStackNavigator} />
      <Tab.Screen name="소상공인" component={BusinessNavigator} />
      {/* <Tab.Screen name="마이컬렉션탭" component={CollectionScreen} /> */}
    </Tab.Navigator>
  );
}