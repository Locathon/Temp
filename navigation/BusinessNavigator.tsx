import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// 주요 화면 컴포넌트 import
import AutoQnAScreen from '../screens/BusinessTab/AutoQnAScreen';
import EditProfileScreen from '../screens/BusinessTab/EditProfileScreen';
import GenerateMarketingScreen from '../screens/BusinessTab/GenerateMarketingScreen';
import MarketingDetailScreen from '../screens/BusinessTab/MarketingDetailScreen';
import NewPostScreen from '../screens/BusinessTab/NewPostScreen';
import PhotoPickerScreen from '../screens/BusinessTab/PhotoPickerScreen';
import PostDetailScreen from '../screens/BusinessTab/PostDetailScreen';
import QAPreviewScreen from '../screens/BusinessTab/QAPreviewScreen';
import QASetupScreen from '../screens/BusinessTab/QASetupScreen';
import StoreHomeScreen from '../screens/BusinessTab/StoreHomeScreen';

// ⭐️ 파일 이름을 정확하게 맞춰줍니다. RegisterStoreScreen -> RegisterStore
import RegisterStore from '../screens/BusinessTab/RegisterStore';
// ⭐️ 파일 이름을 정확하게 맞춰줍니다.
import EditStore from '../screens/BusinessTab/EditStore';


const Stack = createNativeStackNavigator();

export default function BusinessNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, headerTitle: '' }}>
      <Stack.Screen name="BusinessHome" component={StoreHomeScreen} />
      <Stack.Screen name="AutoQnAScreen" component={AutoQnAScreen} />
      <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="QASetup" component={QASetupScreen} />
      <Stack.Screen name="QAPreview" component={QAPreviewScreen} />
      <Stack.Screen name="GenerateMarketing" component={GenerateMarketingScreen} />
      <Stack.Screen name="MarketingDetail" component={MarketingDetailScreen} />
      <Stack.Screen name="PhotoPicker" component={PhotoPickerScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      
      {/* ⭐️ 컴포넌트 이름을 정확하게 맞춰줍니다. */}
      <Stack.Screen name="RegisterStore" component={RegisterStore} />
      <Stack.Screen name="EditStore" component={EditStore} />
    </Stack.Navigator>
  );
}
