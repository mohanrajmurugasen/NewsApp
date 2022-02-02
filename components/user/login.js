import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import authAxios from "../interceptors/interceptor";
import { registerIndieID } from "native-notify";
import axios from "axios";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const collection = {};
    collection.email = email;
    collection.password = password;

    authAxios
      .post("login", collection)
      .then(async (res) => {
        if (res.data === "User not exist" || res.data === "Password mismatch") {
          alert(res.data);
        } else {
          // Native Notify Indie Push Registration Code
          await registerIndieID(
            `${res.data.id}`,
            1074,
            "IESJ4vJMKa0qwwwqbSgT0z"
          );
          // End of Native Notify Code

          axios.post(`https://app.nativenotify.com/api/indie/notification`, {
            subID: `${res.data.id}`,
            appId: 1074,
            appToken: "IESJ4vJMKa0qwwwqbSgT0z",
            title: "Congratulations!",
            message: "You are login correctly",
            pushData: { screenName: "TaipingNews" },
          });

          localStorage.setItem("auth", JSON.stringify(res.data.id));
          navigation.navigate("drawer");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const create = () => {
    navigation.navigate("register");
  };

  const { width, height } = Dimensions.get("window");

  return (
    <ScrollView
      style={{
        width: width,
        backgroundColor: "white",
        padding: 15,
        height: height,
        paddingTop: 25,
      }}
    >
      <View
        style={{
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 8,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "700" }}>
          SignIn
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            paddingVertical: 5,
            color: "gray",
          }}
        >
          SignIn to read exclusive and premium stories from The Taiping Times
        </Text>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <TextInput
            placeholder="Enter email..."
            style={{
              borderColor: "gray",
              borderBottomWidth: 1,
              borderRadius: 8,
              paddingVertical: 9,
              paddingLeft: 10,
              borderRadius: 6,
              marginTop: 5,
              fontSize: 16,
              color: "black",
            }}
            value={email}
            onChangeText={(txt) => setEmail(txt)}
          />
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <TextInput
            placeholder="Enter password..."
            style={{
              borderColor: "gray",
              borderBottomWidth: 1,
              borderRadius: 8,
              paddingVertical: 9,
              paddingLeft: 10,
              borderRadius: 6,
              marginTop: 5,
              fontSize: 16,
              color: "black",
            }}
            value={password}
            onChangeText={(txt) => setPassword(txt)}
          />
        </View>
        <TouchableOpacity
          style={{ paddingHorizontal: 20, paddingVertical: 20, marginTop: 10 }}
          onPress={login}
        >
          <Text
            style={{
              backgroundColor: "hsl(206,100%,52%)",
              borderRadius: 8,
              paddingVertical: 9,
              textAlign: "center",
              fontSize: 18,
              color: "white",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center", marginVertical: 15 }}>
          <Text
            style={{
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 100,
              width: 40,
              fontSize: 20,
              height: 40,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            or
          </Text>
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              color: "gray",
              paddingVertical: 10,
            }}
          >
            Don't have an account?
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              color: "hsl(206,100%,52%)",
            }}
            onPress={create}
          >
            Create One Now
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
