/*
With a separator, we can have a line separating each of our ListItems... We can achieve this using the 'ItemSeparatorComponent' prop of our FlatList component
*/

import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
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
        ItemSeparatorComponent={() => (
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
        )}
      />
    </AppScreen>
  );
}

/*
Now we can extract the ItemSeparatorComponent function to a higher order component for reusablility
*/

//AppListItemSeparator
import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

export function AppListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.light,
  },
});

//colors.js
export default {
  primary: "#fc5c65",
  secondary: "#4ecdc4",
  black: "#000",
  white: "#fff",
  medium: "#6e6969",
  light: "#f8f4f4",
};

//MessagesScreen.js
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { ListItem } from "../Components/ListItem";
import { AppScreen } from "../Components/AppScreen";
import { AppListItemSeparator } from "../Components/AppListItemSeparator";

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
        ItemSeparatorComponent={AppListItemSeparator}
      />
    </AppScreen>
  );
}
