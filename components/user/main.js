import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import img from "../../assets/favicon.png";

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

  const customShare = async (image) => {
    const base64result = image;
    try {
      let filename = "share.png"; // or some other way to generate filename
      let filepath = `${FileSystem.documentDirectory}/${filename}`;
      await FileSystem.writeAsStringAsync(filepath, base64result, {
        encoding: "base64",
      });
      await Sharing.shareAsync(filepath, { mimeType: "image/gif" });
    } catch (e) {
      alert(e.message);
    }
  };

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
        <TouchableOpacity onPress={() => customShare(img)}>
          <Text style={{ color: "hsl(206,100%,52%)", fontSize: 16 }}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
