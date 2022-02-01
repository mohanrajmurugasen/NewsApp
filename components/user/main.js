import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Main = () => {

  const navigation = useNavigation(); 

  const register = () => {
    navigation.navigate("login");
  }

  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={{width: windowWidth}}>
      <View style={{paddingHorizontal:15,paddingVertical:10}}>
        <Text style={{fontSize:22,fontWeight:"700"}}>Welcome to The Taiping Times</Text>
        <TouchableOpacity onPress={register}>
          <Text style={{color:"hsl(206,100%,52%)",fontSize:16}}>Click here to login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};