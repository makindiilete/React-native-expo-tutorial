/*
Expo offers us variety of icons which we can get from https://icons.expo.fyi/

1)  Open the page >> Search for an icon and click on it >> Copy the usage code
*/

import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
      }}
    >
      <MaterialCommunityIcons name="email" size={200} color="dodgerblue" />
    </View>
  );
}
