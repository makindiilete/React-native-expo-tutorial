/*
We want to build our List Item Component which will be below the item we are selling..
It will comprises of the image of the seller, the seller's name and the number of listings he has
*/

//ListItem.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { AppText } from "./AppText";
import colors from "../config/colors";

export function ListItem(props) {
  return (
    <View style={styles.container}>
      <Image source={props.image} style={styles.image} />
      <View style={styles.textContainer}>
        <AppText style={styles.title}> {props.title} </AppText>
        <AppText style={styles.subTitle}> {props.subTitle} </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // ds allows us to lay the items horizontal
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
};

//ListingDetailsScreen.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { AppText } from "../Components/AppText";
import colors from "../config/colors";
import { ListItem } from "../Components/ListItem";

export function ListingDetailsScreen() {
  return (
    <View>
      <Image source={require("../assets/jacket.jpg")} style={styles.image} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>Red jacket for sale</AppText>
        <AppText style={styles.subTitle}>$100</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/myAvatar.jpg")}
            title="Michaelz Omoakin"
            subTitle="5 Listings"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  userContainer: {
    marginVertical: 40,
  },
});
