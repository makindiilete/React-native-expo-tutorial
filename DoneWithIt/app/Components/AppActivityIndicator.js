import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

export function AppActivityIndicator({ visible = false }) {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.overlay}>
      <LottieView
        source={require("../assets/animations/loader.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.white,
    position: "absolute",
    zIndex: 1, // to bring d overlay ontop of other component
    opacity: 0.8, // to make d screen underneath show a little
  },
});
