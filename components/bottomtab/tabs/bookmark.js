import React from 'react';
import { View,Text } from 'react-native';

const Bookmark = (props) => {
  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      <Text style={{fontSize:20,fontWeight:"700"}}>Tap on the save icon to read articles later.</Text>
    </View>
  );
};

export default Bookmark;