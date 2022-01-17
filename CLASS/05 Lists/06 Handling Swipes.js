/*
Now we want to add the functionality to be able to swipe and delete/edit our list item.. So when we swipe to the left, we should see an icon with red background to delete, swipe right can also give us an edit icon to edit the list item etc.

To implement this, we check https://docs.expo.io/versions/v40.0.0/sdk/gesture-handler/

On the expo api reference >> We select 'Gesture Handler', we see the library to install and we install it via expo 'expo install react-native-gesture-handler' this way expo ensures we are installing a version that matches our current expo version and under the hood it uses npm... We have other sdk libraries on the API page we can make use of like Location, Camera etc.

To implement our List swipe, we will use the Swipeable component which we can find its docs here https://docs.swmansion.com/react-native-gesture-handler/docs/api/components/swipeable

The swipeable allows us to implement a swipeable rows that we can swipe left or right... We use either the 'renderLeftAction' or 'renderRightAction' to define what we want to show either on swiping left or right
*/

//AppListItemDeleteAction.js
import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function AppListItemDeleteAction() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="trash-can" size={35} color={colors.white} />
    </View>
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

//AppListItem.js
import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { AppText } from "./AppText";
import colors from "../config/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";

export function AppListItem(props) {
  return (
    <Swipeable renderRightActions={props.renderRightActions}>
      <TouchableHighlight onPress={props.onPress} underlayColor={colors.light}>
        <View style={styles.container}>
          <Image source={props.image} style={styles.image} />
          <View style={styles.textContainer}>
            <AppText style={styles.title}> {props.title} </AppText>
            <AppText style={styles.subTitle}> {props.subTitle} </AppText>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // ds allows us to lay the items horizontal
    padding: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
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
  danger: "#ff5252",
};

//MessagesScreen.js
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { AppListItem } from "../Components/AppListItem";
import { AppScreen } from "../Components/AppScreen";
import { AppListItemSeparator } from "../Components/AppListItemSeparator";
import { AppListItemDeleteAction } from "../Components/AppListItemDeleteAction";

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
          <AppListItem
            image={item.image}
            title={item.title}
            subTitle={item.description}
            onPress={() => console.log("Message Selected ", item)}
            renderRightActions={AppListItemDeleteAction}
          />
        )}
        keyExtractor={(messages) => messages.id.toString()}
        ItemSeparatorComponent={AppListItemSeparator}
      />
    </AppScreen>
  );
}
