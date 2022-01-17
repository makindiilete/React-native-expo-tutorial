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
