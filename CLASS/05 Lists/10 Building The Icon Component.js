/*
Currently our ListItem only supports avatar, we want to add support for icons on the list as well which we will be doing by making use of an icon component which we will then import into the ListItem component....
*/

//AppIcon.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//we destructure our props and giv each of them a default value just incase its not set
export function AppIcon({
  backgroundColor = "black",
  iconColor = "white",
  name,
  size = 40,
}) {
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name={name} size={size / 2} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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

export default function App() {
  return (
    <AppScreen>
      <AppIcon name="email" size={40} iconColor="white" backgroundColor="red" />
    </AppScreen>
  );
}
