import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

// 네비게이터들을 import 합니다.
import { useAuth } from '../contexts/AuthContext'; // ⭐️ AuthContext에서 useAuth 훅을 가져옵니다.
import BusinessNavigator from './BusinessNavigator';
import CommunityNavigator from './CommunityNavigator';
import CourseNavigator from './CourseNavigator';
import MyCollectionPageNavigator from './MyCollectionPageNavigator';
import PlaceStackNavigator from './PlaceStackNavigator';

const Tab = createBottomTabNavigator();

// Figma 디자인 가이드에 따른 색상
const TINT_COLOR = '#2F80ED';
const INACTIVE_TINT_COLOR = '#828282';

export default function TabNavigator() {
  const { userType } = useAuth(); // ⭐️ 현재 사용자의 타입을 가져옵니다.

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: TINT_COLOR,
        tabBarInactiveTintColor: INACTIVE_TINT_COLOR,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'];

          switch (route.name) {
            case '커뮤니티':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case '코스':
              iconName = focused ? 'map' : 'map-outline';
              break;
            case '장소':
              iconName = focused ? 'location' : 'location-outline';
              break;
            case '소상공인':
              iconName = focused ? 'storefront' : 'storefront-outline';
              break;
            case '마이컬렉션':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'alert-circle-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="커뮤니티" component={CommunityNavigator} />
      <Tab.Screen name="코스" component={CourseNavigator} />
      <Tab.Screen name="장소" component={PlaceStackNavigator} />
      
      {/* ⭐️ userType이 'business'일 경우에만 소상공인 탭을 보여줍니다. */}
      {userType === 'business' && (
        <Tab.Screen name="소상공인" component={BusinessNavigator} />
      )}

      <Tab.Screen name="마이컬렉션" component={MyCollectionPageNavigator} />
    </Tab.Navigator>
  );
}
