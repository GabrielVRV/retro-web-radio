import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen'; 
import { colors } from './src/styles/theme';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      {}
      <NavigationContainer>
        {}
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
              shadowOpacity: 0,
            },
            headerTintColor: colors.primary,
          }}
        >
          {}
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          {}
          <Stack.Screen 
            name="History" 
            component={HistoryScreen} 
            options={{ title: 'Músicas Recentes' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}