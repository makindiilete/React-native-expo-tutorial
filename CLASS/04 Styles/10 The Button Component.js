/*
Now we want to implement a custom button component..
1)  In our Component folder, we create a new file 'AppButton.js'
*/

//AppButton.js
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

export function AppButton(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

//App.js
import React from "react";
import { Text, View } from "react-native";
import { AppText } from "./app/Components/AppText";
import { AppButton } from "./app/Components/AppButton";

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
      <AppText>I love React Native</AppText>
      <AppButton
        title="Login"
        onPress={() => console.log("Login Button Clicked")}
      />
    </View>
  );
}

//colors.js
export default {
  primary: "#fc5c65",
  secondary: "#4ecdc4",
  black: "#000",
  white: "#fff",
};
