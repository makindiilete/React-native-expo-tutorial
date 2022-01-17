/*
Docs for tab navigation can be found here https://reactnavigation.org/docs/bottom-tab-navigator

1.  npm install @react-navigation/bottom-tabs
*/

import React from "react";
import { AppScreen } from "./app/Components/AppScreen";
import { Button, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const Link = () => {
  //ds component is not a screen present in the Navigator, but navigation is made possible using the useNavigation() prop..
  const navigation = useNavigation();
  // const route = useRoute(); // to use d route prop as a hook in a component dt is not part of d Navigator screen
  return (
    <Button
      title="Click"
      onPress={() => navigation.navigate("TweetDetails", { id: 3 })}
    />
  );
};

const Tweets = () => (
  <AppScreen>
    <Text>Tweets</Text>
    <Link />
  </AppScreen>
);

const Account = () => (
  <AppScreen>
    <Text>Account</Text>
  </AppScreen>
);

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Feeds" component={Tweets} />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);
export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
