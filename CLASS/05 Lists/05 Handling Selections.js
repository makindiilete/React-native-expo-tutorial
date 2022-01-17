/*
Now we want to make our List Items touchable/Selectable i.e. Performs an action when they are touched and give a visual effect

For the visual effect, we will wrap our FlatList with a TouchableHighlight component

The TouchableHighLight has a prop 'underlayColor' which is used to set the color of the visual effect
*/

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
            onPress={() => console.log("Message Selected ", item)}
          />
        )}
        keyExtractor={(messages) => messages.id.toString()}
        ItemSeparatorComponent={AppListItemSeparator}
      />
    </AppScreen>
  );
}

//ListItem.js
import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { AppText } from "./AppText";
import colors from "../config/colors";

export function ListItem(props) {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor={colors.light}>
      <View style={styles.container}>
        <Image source={props.image} style={styles.image} />
        <View style={styles.textContainer}>
          <AppText style={styles.title}> {props.title} </AppText>
          <AppText style={styles.subTitle}> {props.subTitle} </AppText>
        </View>
      </View>
    </TouchableHighlight>
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
