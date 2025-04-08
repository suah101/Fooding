import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { enableScreens } from 'react-native-screens';

enableScreens();

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import FridgeMappingScreen from './src/screens/FridgeMappingScreen';
import AddFoodScreen from './src/screens/AddFoodScreen';
import MyPageScreen from './src/screens/MyPageScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);

  // ✅ 로그인 상태 실시간 감지
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            {/* 로그인한 경우 */}
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen name="AddFood" component={AddFoodScreen} />
            <Stack.Screen name="MyPage" component={MyPageScreen} />
          </>
        ) : (
          <>
            {/* 로그인 안한 경우 */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="FridgeMapping" component={FridgeMappingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
