/*
We want to extend our AppListItem component so that we cater for icon
*/

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
          {props.ImageComponent}
          {props.image && <Image source={props.image} style={styles.image} />}
          <View style={styles.textContainer}>
            <AppText style={styles.title}> {props.title} </AppText>
            {props.subTitle && (
              <AppText style={styles.subTitle}> {props.subTitle} </AppText>
            )}
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
    // marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 10,
    justifyContent: "center",
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

//App.js
import React from "react";
import { WelcomeScreen } from "./app/screens/WelcomeScreen";
import { SafeAreaView, View } from "react-native";
import { AppCard } from "./app/Components/AppCard";
import { ListingDetailsScreen } from "./app/screens/ListingDetailsScreen";
import { ViewImageScreen } from "./app/screens/ViewImageScreen";
import { MessagesScreen } from "./app/screens/MessagesScreen";
import { AppIcon } from "./app/Components/AppIcon";
import { AppScreen } from "./app/Components/AppScreen";
import { AppListItem } from "./app/Components/AppListItem";

export default function App() {
  return (
    <AppScreen>
      <AppListItem
        title="My title"
        ImageComponent={
          <AppIcon
            name="email"
            size={40}
            iconColor="white"
            backgroundColor="red"
          />
        }
      />
    </AppScreen>
  );
}
