import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Main = () => {
  const navigation = useNavigation();

  const register = () => {
    navigation.navigate("login");
  };

  const logout = () => {
    localStorage.removeItem("auth");
  };

  const windowWidth = Dimensions.get("window").width;

  const token = JSON.parse(localStorage.getItem("auth"));

  console.log(token);

  return (
    <View style={{ width: windowWidth }}>
      <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: "700" }}>
          Welcome to The News360
        </Text>
        {token !== null ? (
          <TouchableOpacity onPress={logout}>
            <Text style={{ color: "hsl(206,100%,52%)", fontSize: 16 }}>
              Click here to LogOut
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={register}>
            <Text style={{ color: "hsl(206,100%,52%)", fontSize: 16 }}>
              Click here to login
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
