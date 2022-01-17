/*
Now we want to implement pull to refresh in our flatList component

We will add two new props to the FlatList : - refreshing - ds takes a boolean value set in the state, onRefresh - ds takes a function dt fetched the new updated list from d backend...
*/

//MessagesScreen.js
import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { AppListItem } from "../Components/AppListItem";
import { AppScreen } from "../Components/AppScreen";
import { AppListItemSeparator } from "../Components/AppListItemSeparator";
import { AppListItemDeleteAction } from "../Components/AppListItemDeleteAction";

const initialMessages = [
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
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    const newMsg = messages.filter((m) => m.id !== message.id);
    setMessages(newMsg);
  };
  return (
    <AppScreen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <AppListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <AppListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={AppListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/myAvatar.jpg"),
            },
          ]);
        }}
      />
    </AppScreen>
  );
}

//AppScreen.js
import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import Constants from "expo-constants/src/Constants";

export function AppScreen(props) {
  return <SafeAreaView style={styles.screen}>{props.children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1, // we make ds component take the entire screen so our pull to refresh will not b cut off when we pull down
  },
});
