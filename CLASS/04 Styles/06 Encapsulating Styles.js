/*
In web app, you can have a div tag that encloses some number of elements like paragraph, h1, h5 etc and inside the div, you can define some styles like color, fontSize and all the elements inside the div will inherit those styles..
We do not have this in react native... You cannot wrap some elements inside a View tag and expect the enclosed elements to inherit the styles inside the View.. So in other to make multiple elements use the same styles which we would have places inside a parent div in web app, we use an higher order component that will contain all the styles we want and then use this component to wrap every elements we need to inherit that style.

1.  Create a new folder inside the 'app' folder 'Components'
2.  Add a new file inside the components folder 'AppText'
*/

//AppText.js
import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";

export function AppText(props) {
  return <Text style={styles.text}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

//App.js
import React from "react";
import { Text, View } from "react-native";
import { AppText } from "./app/Components/AppText";

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
      <AppText>
        I love React Native and this is my first react native app and my first
        react native text....
      </AppText>
    </View>
  );
}
