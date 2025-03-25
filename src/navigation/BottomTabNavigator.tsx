// /navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FridgeScreen from '../screens/FridgeScreen';
import WasteScreen from '../screens/WasteScreen';
import RecipeScreen from '../screens/RecipeScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Fridge') iconName = 'snow-outline';
          else if (route.name === 'Waste') iconName = 'trash-outline';
          else if (route.name === 'Recipe') iconName = 'restaurant-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFA94D',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Fridge" component={FridgeScreen} />
      <Tab.Screen name="Waste" component={WasteScreen} />
      <Tab.Screen name="Recipe" component={RecipeScreen} />
    </Tab.Navigator>
  );
}
