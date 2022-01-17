/*
Now we want to build our listing screen where we display the products we are selling
*/

//ListingScreen.js
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { AppScreen } from "../Components/AppScreen";
import { AppCard } from "../Components/AppCard";
import colors from "../config/colors";

const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 1000,
    image: require("../assets/couch.jpg"),
  },
];

export function ListingScreen() {
  return (
    <AppScreen style={styles.screen}>
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          <AppCard
            image={item.image}
            title={item.title}
            subTitle={"$" + item.price}
          />
        )}
        keyExtractor={(listings) => listing.id.toString()}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    padding: 20,
  },
});

//AppScreen.js
import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import Constants from "expo-constants/src/Constants";

export function AppScreen(props) {
  return (
    <SafeAreaView style={[styles.screen, props.style]}>
      {/*D SafeAreaView does not supports padding so we apply the padding we passed from the style prop also to a view that wraps the component passed as props.children*/}
      <View style={props.style}>{props.children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1, // we make ds component take the entire screen so our pull to refresh will not b cut off when we pull down
  },
});
