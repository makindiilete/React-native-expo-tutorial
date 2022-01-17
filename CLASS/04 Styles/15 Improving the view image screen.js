/*
We want to improve our view image screen so we replace the placeholders with icons
*/

//ViewImageScreen.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function ViewImageScreen(props) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="close"
        size={35}
        color={colors.white}
        style={styles.closeIcon}
      />
      <MaterialCommunityIcons
        name="trash-can-outline"
        size={35}
        color={colors.white}
        style={styles.menuIcon}
      />

      <Image
        source={require("../assets/chair.jpg")}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  image: {
    width: "100%", // 100% of the screen size
    height: "100%",
  },
  closeIcon: {
    top: 40,
    left: 30,
  },
  menuIcon: {
    position: "absolute",
    top: 40,
    right: 30,
  },
});
