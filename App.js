import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './lib/screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};