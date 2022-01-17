/*
DEALING WITH FONTS FOR iOS & Android

Each OS has their own supported fonts so we need to use the platform api to detect the current platform and then load the supported fonts

USING CUSTOM FONTS : - https://docs.expo.io/guides/using-custom-fonts/
*/

import React from "react";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          // fontFamily: "Roboto",
          fontSize: 30,
          fontStyle: "italic", //normal
          fontWeight: "bold", //normal, 100 - 900
          color: "tomato",
          textTransform: "capitalize", //lowercase, uppercase, none
          textAlign: "right", //right, left, justify, center
          lineHeight: 70, // d space btw lines
        }}
      >
        I love React Native and this is my first react native app and my first
        react native text.....
      </Text>
    </View>
  );
}
