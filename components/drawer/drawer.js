import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomTab from "../bottomtab/bottomTab";
import { Custome } from "./custome";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text } from "react-native";

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: "white",
        drawerActiveTintColor: "black",
        drawerStyle: {
          backgroundColor: "white",
        },
      }}
      drawerContent={(props) => <Custome {...props} />}
    >
      <Drawer.Screen
        name="bottom"
        component={BottomTab}
        options={{
          drawerLabel: "Home",
          headerTitleAlign: "center",
          headerTitle: () => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "600", color: "black" }}
                >
                  News360
                </Text>
              </View>
            );
          },
          headerRight: () => (
            <TouchableOpacity>
              <Icon
                name="search"
                style={{ color: "black", fontSize: 25, marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
