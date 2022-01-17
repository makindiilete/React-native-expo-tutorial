/*
We want to refactor our codes to remove duplication of color codes... We will extract our color codes into a separate file and then we can import each color by the property name we give to it so if we change the color later, the effect will take place across the entire app .

1.`In the app folder, create a 'config' folder
2.  Add a new file inside the config folder 'colors.js'
*/

//colors.js
export default {
  primary: "#fc5c65",
  secondary: "#4ecdc4",
  black: "#000",
};

//ViewImageScreen.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../config/colors";

export function ViewImageScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.closeIcon} />
      <View style={styles.menuIcon} />
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
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    top: 40,
    left: 30,
  },
  menuIcon: {
    width: 50,
    height: 50,
    backgroundColor: colors.secondary,
    position: "absolute",
    top: 40,
    right: 30,
  },
});
