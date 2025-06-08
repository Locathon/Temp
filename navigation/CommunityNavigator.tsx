import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// 앞으로 만들 커뮤니티 관련 화면들을 import 합니다.
import CommunityScreen from '../screens/Community/CommunityScreen';
import CreatePostScreen from '../screens/Community/CreatePostScreen';
import PostDetailScreen from '../screens/Community/PostDetailScreen';

const Stack = createNativeStackNavigator();

export default function CommunityNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityHome" component={CommunityScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
    </Stack.Navigator>
  );
}
