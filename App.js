import React, { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import axios from "axios";
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

const Stack = createNativeStackNavigator();

const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log("Must use physical device for Push Notifications");
  }
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}

export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[2]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[2]
  );

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (Constants.isDevice && Platform.OS !== "web") {
      registerForPushNotificationsAsync().then((token) => {
        axios.post(`https://nativenotify.com/api/expo/key`, {
          appId: 625,
          appToken: "NeDM1H7hMktmiF2i4QoHsH",
          expoToken: token,
        });
      });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) =>
          console.log(response)
        );
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }
  });

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
          options={{ title: "The Taiping Times" }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ title: "The Taiping Times" }}
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
