/*
We will start by building the messages screen using the flat list component...

1).. Add a new screen "MessagesScreen.js"

The flatList takes some props : -
1.  data - Array of objects to render
2.  keyExtractor - ds receives a function that uniquely identifies each object in the array
3.  renderItem - ds is a function that will be used to render each item
*/

//MessagesScreen.js
import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { ListItem } from "../Components/ListItem";

const messages = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image: require("../assets/myAvatar.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/myAvatar.jpg"),
  },
];
export function MessagesScreen(props) {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => (
        <ListItem
          image={item.image}
          title={item.title}
          subTitle={item.description}
        />
      )}
      keyExtractor={(messages) => messages.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});
