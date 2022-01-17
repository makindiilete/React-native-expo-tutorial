/*
We want to see how we can handle long text in react native by shrinking them down i.e. Truncating them using 'numberOfLine' props in react native...

We will be setting our number of lines for our list title to one and subtitle to 2


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
            {/*Set number of lines for title to 1*/}
            <AppText style={styles.title} numberOfLines={1}>
              {props.title}
            </AppText>
            {/*Set the number of lines for subtitle to 2*/}
            {props.subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {props.subTitle}
              </AppText>
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

//AppText.js
import React from "react";
import { Text } from "react-native";
import defaultStyles from "../config/styles";

export function AppText({ style, children, ...rest }) {
  //We merge the defined styles here with the one passed from props
  return (
    <Text style={[defaultStyles.text, style]} {...rest}>
      {children}
    </Text>
  );
}
