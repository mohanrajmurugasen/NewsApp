import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import authAxios from "../interceptors/interceptor";

export const Custome = ({ navigation }) => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    authAxios
      .get("allCategory")
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.1,
          flexDirection: "row",
          paddingTop: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 25,
            marginTop: 5,
            fontWeight: "600",
          }}
        >
          News360
        </Text>
      </View>
      <ScrollView style={{ flex: 0.9, marginTop: 15 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(`bottom`);
          }}
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            paddingHorizontal: 15,
            paddingTop: 15,
            paddingBottom: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", paddingBottom: 15 }}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(`popular`);
          }}
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            paddingHorizontal: 15,
            paddingTop: 15,
            paddingBottom: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", paddingBottom: 15 }}>
            Popular
          </Text>
        </TouchableOpacity>
        {news.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              navigation.navigate(`${item.name}`);
            }}
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              paddingHorizontal: 15,
              paddingTop: 15,
              paddingBottom: 5,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "700", paddingBottom: 15 }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
