import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Popular from "../pages/popular";
import Taiping from "../pages/taiping";
import authAxios from "../interceptors/interceptor";

const Tab = createMaterialTopTabNavigator();

const TopBar = () => {
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
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 14 },
        tabBarItemStyle: { width: 92 },
        tabBarIndicatorStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Tab.Screen name="Popular" component={Popular} />
      {news.map((itm) => (
        <Tab.Screen key={itm.id} name={`${itm.name}`}>
          {() => <Taiping myPropsName={`${itm.name}`} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

export default TopBar;
