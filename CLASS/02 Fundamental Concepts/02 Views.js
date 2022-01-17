/*
Views is like the <div></div> of mobile app....
*/
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World...</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes d entire screen (values from 0 - 1 i.e. 0% - 100%)
    backgroundColor: "dodgerblue",
    // d next styles center our text on the screen
    alignItems: "center",
    justifyContent: "center",
  },
});

/*
<SafeAreaView></SafeAreaView> : - This ensures our context is protected from phone notch... This only works for ios... For android you need to manually add some padding to push down content from the navigation..
*/
