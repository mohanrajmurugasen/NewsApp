import React from "react";
import { ScrollView } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import YoutubePlayer from "react-native-youtube-iframe";
import baseURL from "../interceptors/baseurl";
var getYouTubeID = require("get-youtube-id");
import moment from "moment";
import shareURL from "../interceptors/shareurl";

const Content = ({ navigation, route }) => {
  let data = route.params;

  const width = Dimensions.get("window").width;

  const media = [
    { name: "logo-whatsapp" },
    { name: "logo-facebook" },
    { name: "logo-twitter" },
    { name: "share-social-outline" },
  ];

  const onShare = async (x, y, z, a) => {
    if (a === "share-social-outline") {
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
    }
  };

  const onShareTop = async (x, y, z) => {
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

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-back"
            style={{ color: "black", fontSize: 25, marginLeft: 10 }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Icon
              name="bookmark-outline"
              style={{ color: "black", fontSize: 25, marginRight: 15 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onShareTop(data.title, data.id, data.category)}
          >
            <Icon
              name="ios-share-social-outline"
              style={{ color: "black", fontSize: 25, marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "700" }}>{data.title}</Text>
        <Text style={{ fontSize: 15, paddingVertical: 10, color: "black" }}>
          {data.description}
        </Text>
        <View
          style={{ backgroundColor: "gray", height: 0.6, marginVertical: 15 }}
        ></View>
        <Text style={{ fontSize: 15, color: "gray" }}>
          Published At{" "}
          <Text style={{ color: "gray" }}>
            {moment(new Date(data.createdAt)).fromNow()}
          </Text>
        </Text>
        <Image
          source={{ uri: `${baseURL}${data.image}` }}
          alt="mn"
          style={{
            width: width - 20,
            height: 300,
            marginVertical: 20,
            borderRadius: 4,
          }}
        />
        <Text style={{ marginBottom: 15, fontSize: 19, lineHeight: 26 }}>
          {data.summary}
        </Text>
        {/* {data.video === "" ? null : (
          <YoutubePlayer
            height={300}
            width={width - 20}
            play={false}
            videoId={getYouTubeID(data.video)}
          />
        )} */}
        <Text style={{ fontSize: 18, color: "gray" }}>
          Start meaningfull conversations.
        </Text>
        <Text style={{ fontSize: 18, color: "gray" }}>Share now.</Text>
        <View
          style={{
            flexDirection: "row",
            width: width,
            marginBottom: 20,
            paddingTop: 15,
          }}
        >
          {media.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 100,
                height: 45,
                width: 45,
                marginRight: 30,
              }}
              onPress={() =>
                onShare(data.title, data.id, data.category, item.name)
              }
            >
              <Icon
                name={item.name}
                style={{
                  color: "gray",
                  fontSize: 25,
                  marginTop: 9,
                  textAlign: "center",
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Content;
