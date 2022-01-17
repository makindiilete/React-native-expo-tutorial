/*
In our MessagesScreen where we are using the ListItem component, we want to add chevrons
*/

//AppListItem.js
import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { AppText } from "./AppText";
import colors from "../config/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function AppListItem(props) {
  return (
    <Swipeable renderRightActions={props.renderRightActions}>
      <TouchableHighlight onPress={props.onPress} underlayColor={colors.light}>
        <View style={[styles.container, props.style]}>
          {props.IconComponent}
          {props.image && <Image source={props.image} style={styles.image} />}
          <View style={styles.textContainer}>
            <AppText style={styles.title}> {props.title} </AppText>
            {props.subTitle && (
              <AppText style={styles.subTitle}> {props.subTitle} </AppText>
            )}
          </View>
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
    flex: 1, // ds make the textContainer takes all available space reserving just a little for the chevron icon to stay so it can b pushed to d right
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
