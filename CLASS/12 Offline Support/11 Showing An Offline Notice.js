/*
In the component folder, add a new file 'AppOfflineNotice.js"
*/

//AppOfflineNotice.js
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

export function AppOfflineNotice() {
  const netInfo = useNetInfo();
  console.log(netInfo);
  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
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

//App.js
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { AppOfflineNotice } from "./app/Components/AppOfflineNotice";

export default function App() {
  return (
    <>
      <AppOfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}
