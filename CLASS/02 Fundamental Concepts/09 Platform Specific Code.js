/*
We can write code to detect the platform we are currently working on using the 'Platform' API
*/

import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
  Platform,
  StatusBar,
} from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={[styles.container, containerStyles]}>
      <Button
        color="orange"
        title="Click Me"
        onPress={() =>
          Alert.prompt("My Title", "My Message", (inputEntered) =>
            console.log(inputEntered)
          )
        }
      />
    </SafeAreaView>
  );
}

const containerStyles = { backgroundColor: "white" };
const styles = StyleSheet.create({
  container: {
    flex: 1, // takes d entire screen (values from 0 - 1 i.e. 0% - 100%)
    backgroundColor: "red",
    //we dynamically calculate the height of the status bar and we use the value as the paddingTop...
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
