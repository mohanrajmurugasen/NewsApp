import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Share,
  SafeAreaViewBase,
} from "react-native";
import "localstorage-polyfill";
import Icon from "react-native-vector-icons/Ionicons";
import YoutubePlayer from "react-native-youtube-iframe";
import authAxios from "../interceptors/interceptor";
import baseURL from "../interceptors/baseurl";
var getYouTubeID = require("get-youtube-id");
import shareURL from "../interceptors/shareurl";
import moment from "moment";

const Popular = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [category, setcategory] = useState([]);
  const [save, setsave] = useState(false);
  const [save1, setsave1] = useState(false);
  const [save2, setsave2] = useState(null);

  useEffect(() => {
    authAxios.get("getAllNews").then((res) => {
      setNews(res.data);
    });
  }, []);

  useEffect(() => {
    authAxios.get("allCategory").then((res) => {
      setcategory(res.data);
    });
  }, []);

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

  const width = Dimensions.get("window").width;

  const saves = (x) => {
    if (save === x) {
      setsave(null);
    } else {
      setsave(x);
    }
  };

  const saves1 = (x) => {
    if (save1 === x) {
      setsave1(null);
    } else {
      setsave1(x);
    }
  };

  const saves2 = (x) => {
    if (save2 === x) {
      setsave2(null);
    } else {
      setsave2(x);
    }
  };

  return (
    <ScrollView style={{ width: width }}>
      <ScrollView
        pagingEnabled
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {news.slice(0, 6).map((itm) =>
          itm.publish ? (
            <ImageBackground
              source={{ uri: `${baseURL}${itm.image}` }}
              resizeMode="cover"
              key={itm.id}
              style={{ width: width, height: 200 }}
            >
              <TouchableOpacity
                style={{
                  width: width,
                  height: 200,
                  backgroundColor: "#00000073",
                }}
                onPress={() => navigation.navigate("content", itm)}
              >
                <View style={{ paddingHorizontal: 10 }}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "600",
                      lineHeight: 25,
                      position: "relative",
                      top: "130%",
                      height: 50,
                      overflow: "hidden",
                    }}
                  >
                    {itm.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      position: "relative",
                      top: "30%",
                    }}
                  >
                    <Text style={{ color: "white", marginTop: 7 }}>
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
                            style={{
                              color: "white",
                              fontSize: 25,
                              marginRight: 15,
                            }}
                          />
                        ) : (
                          <Icon
                            name="bookmark-outline"
                            style={{
                              color: "white",
                              fontSize: 25,
                              marginRight: 15,
                            }}
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => onShare(itm.title, itm.id, itm.category)}
                      >
                        <Icon
                          name="share-social-outline"
                          style={{
                            color: "white",
                            fontSize: 25,
                            marginRight: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          ) : null
        )}
      </ScrollView>

      {category.map((itm) => (
        <View key={itm.id}>
          <View
            style={{ paddingHorizontal: 10, paddingTop: 20, paddingBottom: 15 }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {itm.name}
            </Text>
          </View>

          {news
            .filter((name) => name.category === itm.name && name.publish)
            .slice(0, 1)
            .map((itms) => (
              <View key={itms.id}>
                <ImageBackground
                  source={{ uri: `${baseURL}${itms.image}` }}
                  resizeMode="cover"
                  style={{ width: width, height: 200, marginBottom: 10 }}
                >
                  <TouchableOpacity
                    style={{
                      width: width,
                      height: 200,
                      backgroundColor: "#00000073",
                    }}
                    onPress={() => navigation.navigate("content", itms)}
                  >
                    <View style={{ top: 100, paddingHorizontal: 10 }}>
                      <Text
                        style={{
                          color: "white",
                          paddingBottom: 15,
                          fontSize: 18,
                          fontWeight: "600",
                          lineHeight: 25,
                        }}
                      >
                        {itms.title}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ color: "white", marginTop: 7 }}>
                          {moment(new Date(itms.createdAt)).fromNow()}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => saves1(itms.id)}
                          >
                            {itms.id === save1 ? (
                              <Icon
                                name="bookmark"
                                style={{
                                  color: "white",
                                  fontSize: 25,
                                  marginRight: 15,
                                }}
                              />
                            ) : (
                              <Icon
                                name="bookmark-outline"
                                style={{
                                  color: "white",
                                  fontSize: 25,
                                  marginRight: 15,
                                }}
                              />
                            )}
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              onShare(itms.title, itms.id, itms.category)
                            }
                          >
                            <Icon
                              name="share-social-outline"
                              style={{
                                color: "white",
                                fontSize: 25,
                                marginRight: 10,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            ))}

          {news
            .filter((resol) => resol.category === itm.name && resol.publish)
            .slice(0, 4)
            .map((res) => (
              <View
                key={res.id}
                style={{
                  marginVertical: 15,
                  borderBottomWidth: 0.6,
                  borderBottomColor: "gray",
                  paddingBottom: 10,
                  paddingHorizontal: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("content", res)}
                  style={{ flexDirection: "row", paddingBottom: 10 }}
                >
                  <Image
                    source={{ uri: `${baseURL}${res.image}` }}
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
                      {res.title}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "gray", marginTop: 7 }}>
                    {moment(new Date(res.createdAt)).fromNow()}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => saves2(res.id)}
                    >
                      {res.id === save2 ? (
                        <Icon
                          name="bookmark"
                          style={{
                            color: "gray",
                            fontSize: 25,
                            marginRight: 15,
                          }}
                        />
                      ) : (
                        <Icon
                          name="bookmark-outline"
                          style={{
                            color: "gray",
                            fontSize: 25,
                            marginRight: 15,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => onShare(res.title, res.id, res.category)}
                    >
                      <Icon
                        name="share-social-outline"
                        style={{ color: "gray", fontSize: 25, marginRight: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default Popular;
