/*
We want to first address the first issue we have here which is our content going behind the status bar which we can fix by wrapping our flat list inside a safe area view....
*/

//  Wrapping in safeAreaView 1
import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
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
    <SafeAreaView style={styles.screen}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

/*
We can achieve the same with expo constant
1.  npm i expo-constants
Expo-constants : - Provides system information that remains constant throughout the lifetime of your app.
*/

import React from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import { ListItem } from "../Components/ListItem";
import Constants from "expo-constants/src/Constants";

console.log(Constants);

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
    <SafeAreaView style={styles.screen}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight, // d Constants api gives us access to alot of the device info including the height of the status bar so we can use ds so set the paddingTop
  },
});

/*
Now we can extract a screen component using a higher order component so we don't need to go over all the steps everytime we want to render items on the screen and we want to protect them from status bar

1.  Add a new file inside the component folder : - 'AppScreen.js'
*/

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
  },
});

//MessagesScreen.js
import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import { ListItem } from "../Components/ListItem";
import { AppScreen } from "../Components/AppScreen";

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
    <AppScreen>
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
    </AppScreen>
  );
}
