/*
For each of our tab item, we want to add an icon and for our middle tab, we want to add a big round button
*/

//AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListingScreen } from "../screens/ListingScreen";
import { ListingEditScreen } from "../screens/ListingEditScreen";
import { AccountScreen } from "../screens/AccountScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { NewListingRoundButtonTab } from "./NewListingRoundButtonTab";

const Tab = createBottomTabNavigator();
const AppNavigator = () => (
  <Tab.Navigator>
    {/*<Tab.Screen name="Listings" component={ListingScreen} />*/}

    {/*Nesting navigators*/}
    <Tab.Screen
      name="Feeds"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="ListingEdit"
      component={ListingEditScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingRoundButtonTab
            onPress={() => navigation.navigate("ListingEdit")}
          />
        ),
      })}
    />
    {/*<Tab.Screen name="Account" component={AccountScreen} />*/}
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;

//FeedNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { ListingScreen } from "../screens/ListingScreen";
import { ListingDetailsScreen } from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  //  With modal mode, our screens we pop up from bottom like a modal and we can pull it down to remove it from the stack instead of the default mode which slides from the right
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingScreen} />
    {/*Because we are using modal mode, we no longer need the header or back button*/}
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;

//NewListingRoundButtonTab.js
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function NewListingRoundButtonTab({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          size={40}
          color={colors.white}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: colors.white,
    borderWidth: 10,
    bottom: 20,
  },
});
