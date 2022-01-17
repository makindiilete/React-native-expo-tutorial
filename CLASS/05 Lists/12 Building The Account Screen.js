/*
Now we want to build our account screen
*/

//AccountScreen.js
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { AppScreen } from "../Components/AppScreen";
import { AppListItem } from "../Components/AppListItem";
import colors from "../config/colors";
import { AppIcon } from "../Components/AppIcon";
import { AppListItemSeparator } from "../Components/AppListItemSeparator";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
  },
];
export function AccountScreen() {
  return (
    <AppScreen style={styles.screen}>
      <View style={styles.container}>
        <AppListItem
          title="Michaelz Omoakin"
          subTitle="akindiileteforex@gmail.com"
          image={require("../assets/myAvatar.jpg")}
          style={{ backgroundColor: "white" }}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItems) => menuItems.title.toString()}
          ItemSeparatorComponent={AppListItemSeparator}
          renderItem={({ item }) => (
            <AppListItem
              IconComponent={
                <AppIcon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              title={item.title}
              style={{ backgroundColor: "white" }}
            />
          )}
        />
      </View>
      <View style={styles.container}>
        <AppListItem
          IconComponent={<AppIcon name="logout" backgroundColor="#ffe66d" />}
          title="Log Out"
          style={{ backgroundColor: "white" }}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 10,
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
        <View style={[styles.container, props.style]}>
          {props.IconComponent}
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

//AppScreen.js
import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import Constants from "expo-constants/src/Constants";

export function AppScreen(props) {
  return (
    <SafeAreaView style={[styles.screen, props.style]}>
      {props.children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1, // we make ds component take the entire screen so our pull to refresh will not b cut off when we pull down
  },
});
