// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// ✅ 이거 추가!
import { enableScreens } from 'react-native-screens';
enableScreens(); // <- 반드시 가장 위에서 한 번만 호출해야 해요

import BottomTabNavigator from './src/navigation/BottomTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
