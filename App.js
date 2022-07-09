import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './lib/screens/welcome/WelcomeScreen';
import SignInScreen from './lib/screens/signIn/SignInScreen';
import { COLORS } from './lib/constants/colors';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: COLORS.white,
  },
};

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};