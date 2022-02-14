import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MyDrawer } from "./components/drawer/drawer";
import BottomTab from "./components/bottomtab/bottomTab";
import Login from "./components/user/login";
import { Register } from "./components/user/register";
import Content from "./components/content/Content";
import Popular from "./components/pages/popular";
import Taiping from "./components/pages/taiping";
import registerNNPushToken from "native-notify";
import authAxios from "./components/interceptors/interceptor";
import axios from "axios";

const Stack = createNativeStackNavigator();

const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[2]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[2]
  );
  registerNNPushToken(1074, "IESJ4vJMKa0qwwwqbSgT0z");

  return (
    <NavigationContainer independent={true}>
      <StatusBar
        animated={true}
        backgroundColor="black"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />
      <Stack.Navigator initialRouteName="drawer">
        <Stack.Screen
          name="drawer"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="popular" component={Popular} />
        <Stack.Screen name="taiping" component={Taiping} />
        <Stack.Screen
          name="bottom"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ title: "News360" }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ title: "News360" }}
        />
        <Stack.Screen
          name="content"
          component={Content}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
