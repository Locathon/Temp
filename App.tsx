import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
  screenOptions={{
    tabBarStyle: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
    },
  }}
>
    </NavigationContainer>
  );
}