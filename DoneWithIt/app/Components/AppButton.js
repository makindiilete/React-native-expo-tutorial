import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import colors from "../config/colors";

export function AppButton({ color, registerButton, onPress, title }) {
  return (
    //  Inside the TouchableOpacity component, we are using styles array which combine and inline style with styles from our StyleSheet object.. ds way we can use the component props 'color' on the TouchableOpacity
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: color ? color : colors.primary,
          marginBottom: registerButton && Platform.OS === "ios" ? 20 : null,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 5,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
