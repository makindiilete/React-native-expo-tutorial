/*
Now we want to handle the onPress event of our AppListItemDeleteAction component so that when we tap on it, we remove the item we tapped on from the list...
*/

//AppListItemDeleteAction.js
import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

export function AppListItemDeleteAction(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can"
          size={35}
          color={colors.white}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

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
      />
    </AppScreen>
  );
}

//colors.js
export default {
  primary: "#fc5c65",
  secondary: "#4ecdc4",
  black: "#000",
  white: "#fff",
  medium: "#6e6969",
  light: "#f8f4f4",
  danger: "#ff5252",
};
