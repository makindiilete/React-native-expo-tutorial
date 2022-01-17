/*
This is one of the fundamental component in react native which is used to display a text.. Unlike web app, text cannot be placed anywhere but must be wrapped with the <Text></Text> tag

IMPORTANT PROPS
numberOfLines (number) : - When this is set, if the text entered exceed the number of lines specified, the text will be truncated
onPress (function) : - This make the text acts like a link in other to call a function
*/

//App.js
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, SafeAreaView, Text, Button } from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Text
        numberOfLines={1}
        onPress={() => console.log("Text Pressed")}
        onLongPress={handleLongPress}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At doloribus
        eos excepturi facere ipsa molestias nihil, nulla quo recusandae, sint
        temporibus ut? Doloremque eos impedit non praesentium repellendus
        repudiandae, tempora. Animi, ea ex fugiat laboriosam officia ullam
        vitae. Eaque, quia.
      </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes d entire screen (values from 0 - 1 i.e. 0% - 100%)
    backgroundColor: "dodgerblue",
  },
});
