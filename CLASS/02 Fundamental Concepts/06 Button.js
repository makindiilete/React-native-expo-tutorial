/*
A Button is a self closing syntax because we do not put anything between them unlike the web where we put the text of the button between the button tags.... Here the 'title' prop takes the text we want the button to have....

The Button component get mapped to its native equivalent so it looks different on each platform...
*/

import React from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Button
        color="orange"
        title="Click Me"
        onPress={() => console.log("Button tapped")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes d entire screen (values from 0 - 1 i.e. 0% - 100%)
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
