import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

export function AppOfflineNotice() {
  const netInfo = useNetInfo();
  if (netInfo.isConnected === false && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.white }}>No internet connection</Text>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 50,
    width: "100%",
    zIndex: 1,
    position: "absolute",
    top: Constants.statusBarHeight,
  },
});
