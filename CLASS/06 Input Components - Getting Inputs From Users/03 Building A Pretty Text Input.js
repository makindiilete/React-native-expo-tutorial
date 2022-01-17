/*
We want to build a pretty text input that looks the same across all screens
*/

//AppTextInput.js
import React from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

export function AppTextInput(props) {
  return (
    <View style={styles.container}>
      {props.icon && (
        <MaterialCommunityIcons
          name={props.icon}
          size={20}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput style={styles.textInput} placeholder={props.placeHolder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 25,
    padding: 15,
    width: "100%",
    marginVertical: 10, // to separate multiple elements on d screen
  },

  textInput: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  icon: {
    marginRight: 10,
  },
});

//colors.js
export default {
  primary: "#fc5c65",
  secondary: "#4ecdc4",
  black: "#000",
  white: "#fff",
  medium: "#6e6969",
  dark: "#0c0c0c",
  light: "#f8f4f4",
  danger: "#ff5252",
};
