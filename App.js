import * as React from "react";

import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { COLORS } from "./lib/constants/colors";
import { store } from "./lib/redux/store";

import WelcomeScreen from "./lib/screens/welcome/WelcomeScreen";
import SignInScreen from "./lib/screens/signIn/SignInScreen";
import SignUpScreen from "./lib/screens/signUp/SignUpScreen";
import DiscussionsScreen from "./lib/screens/discussions/DiscussionsScreen";
import ChatScreen from "./lib/screens/chat/ChatScreen";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: COLORS.white,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Discussions" component={DiscussionsScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
