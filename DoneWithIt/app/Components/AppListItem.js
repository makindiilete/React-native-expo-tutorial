import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { AppText } from "./AppText";
import colors from "../config/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function AppListItem({
  IconComponent,
  image,
  onPress,
  renderRightActions,
  style,
  subTitle,
  title,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight onPress={onPress} underlayColor={colors.light}>
        <View style={[styles.container, style]}>
          {IconComponent}
          {image && <Image source={image} style={styles.image} />}
          <View style={styles.textContainer}>
            {/*Set number of lines for title to 1*/}
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {/*Set the number of lines for subtitle to 2*/}
            {subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
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
