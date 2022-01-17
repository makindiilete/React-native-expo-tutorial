/*
We want to create our own custom picker which we can easily reuse across the app... We will start by designing the look and feel of the component and in the next video we will talk about how to select an item using the picker...
*/

//AppPicker.js
import React from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import { AppText } from "./AppText";

export function AppPicker(props) {
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
      <AppText style={styles.text}>{props.placeholder}</AppText>
      <MaterialCommunityIcons
        name="chevron-down"
        size={20}
        color={colors.medium}
      />
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

  textInput: defaultStyles.text,
  text: { flex: 1 },
  icon: {
    marginRight: 10,
  },
});
