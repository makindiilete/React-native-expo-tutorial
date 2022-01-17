/*
We want to extract styles we will be using across the app e.g. the default font so we wont need to be copying code around anytime we needs it...

1.  Inside the 'config' folder, create a new file called 'styles.js'
*/

//styles.js
import colors from "./colors";
import { Platform } from "react-native";

export default {
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};

//AppTextInput.js
import React from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

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

  textInput: defaultStyles.text,
  icon: {
    marginRight: 10,
  },
});

//AppText.js
import React from "react";
import { Text } from "react-native";
import defaultStyles from "../config/styles";

export function AppText(props) {
  //We merge the defined styles here with the one passed from props
  return (
    <Text style={[defaultStyles.text, props.style]}>{props.children}</Text>
  );
}
