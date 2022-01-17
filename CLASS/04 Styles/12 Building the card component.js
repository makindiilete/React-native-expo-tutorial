/*
We want build a custom card component where we have the item image as the body and then the card subtitle will be the item name and item price as the subtitle
*/

//AppCard.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../config/colors";
import { AppText } from "./AppText";

export function AppCard(props) {
  return (
    <View style={styles.cardContainer}>
      <Image source={props.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}> {props.title} </AppText>
        <AppText style={styles.subTitle}> {props.subtitle} </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden", // our image will overflow and block our card border radius so we use ds to hide the overflow
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});

//AppText.js
import React from "react";
import { Platform, StyleSheet, Text } from "react-native";

export function AppText(props) {
  //We merge the defined styles here with the one passed from props
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

//App.js
import React from "react";
import { WelcomeScreen } from "./app/screens/WelcomeScreen";
import { SafeAreaView, View } from "react-native";
import { AppCard } from "./app/Components/AppCard";

export default function App() {
  return (
    <View style={{ backgroundColor: "#f8f4f4", padding: 20, paddingTop: 100 }}>
      <AppCard
        title="Red jacket for sale"
        subtitle="$100"
        image={require("./app/assets/jacket.jpg")}
      />
    </View>
  );
}
