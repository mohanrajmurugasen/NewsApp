import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Share,
} from "react-native";
import "localstorage-polyfill";
import Icon from "react-native-vector-icons/Ionicons";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import authAxios from "../interceptors/interceptor";
import { useNavigation } from "@react-navigation/native";
import baseURL from "../interceptors/baseurl";
import shareURL from "../interceptors/shareurl";
import moment from "moment";

const Taiping = (props) => {
  const navigation = useNavigation();

  const [news, setNews] = useState([]);
  const [save, setsave] = useState(false);
  const [font, setfont] = useState(false);

  useEffect(() => {
    authAxios
      .get("getAllNews")
      .then((res) => {
        setNews(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const width = Dimensions.get("window").width;

  const fetchFont = () => {
    Font.loadAsync({
      Roboto: require("../../assets/fonts/Roboto-ThinItalic.ttf"),
    });
  };

  if (!font) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onError={() => console.log("Error")}
        onFinish={() => {
          setfont(true);
        }}
      />
    );
  }

  const onShare = async (x, y, z) => {
    try {
      const result = await Share.share({
        title: `${x}`,
        message: `${shareURL}content/${z}/${y}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const saves = (x) => {
    if (save === x) {
      setsave(null);
    } else {
      setsave(x);
    }
  };

  return (
    <ScrollView style={{ width: width, paddingHorizontal: 10 }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          color: "red",
          marginVertical: 10,
        }}
      >
        {props.myPropsName} / <Text style={{ color: "black" }}>News360</Text>
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          backgroundColor: "#c5c0c094",
          paddingLeft: 20,
          borderLeftWidth: 15,
          borderLeftColor: "red",
          marginVertical: 5,
          paddingVertical: 5,
        }}
      >
        NEWS360
      </Text>
      {news.map((itm) =>
        itm.category === props.myPropsName && itm.publish ? (
          <View
            key={itm.id}
            style={{
              marginVertical: 15,
              borderBottomWidth: 0.6,
              borderBottomColor: "gray",
              paddingBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("content", itm)}
              style={{ flexDirection: "row", paddingBottom: 10 }}
            >
              <Image
                source={{ uri: `${baseURL}${itm.image}` }}
                alt="mn"
                style={{ width: 120, height: 70, borderRadius: 4 }}
              />
              <View style={{ paddingLeft: 10, width: "70%" }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "black",
                  }}
                >
                  {itm.title}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "gray", marginTop: 7 }}>
                {moment(new Date(itm.createdAt)).fromNow()}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => saves(itm.id)}
                >
                  {itm.id === save ? (
                    <Icon
                      name="bookmark"
                      style={{ color: "gray", fontSize: 25, marginRight: 15 }}
                    />
                  ) : (
                    <Icon
                      name="bookmark-outline"
                      style={{ color: "gray", fontSize: 25, marginRight: 15 }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onShare(itm.title, itm.id, itm.category)}
                >
                  <Icon
                    name="share-social-outline"
                    style={{ color: "gray", fontSize: 25, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null
      )}
    </ScrollView>
  );
};

export default Taiping;
