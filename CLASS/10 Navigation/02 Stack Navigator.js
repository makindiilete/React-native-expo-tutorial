/*
We wil start by leaning about the stack navigation in react native...

1.  Install d stack library npm install @react-navigation/stack
*/

//App.js
import React from "react";
import { AppScreen } from "./app/Components/AppScreen";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// The Tweets component/route
const Tweets = () => (
  <AppScreen>
    <Text>Tweets</Text>
  </AppScreen>
);

//The TweetDetails component/route
const TweetDetails = () => (
  <AppScreen>
    <Text>Tweet Details</Text>
  </AppScreen>
);

const Stack = createStackNavigator();

//This creates our route configuration
const StackNavigator = () => (
  //  By default, d screen that is ontop will b rendered first i.e. Tweets component will b render by default but we can use the 'initialRouteName' prop to define the screen to be rendered first if we do not want to follow the default order
  <Stack.Navigator initialRouteName="TweetDetails">
    {/*Inside here we define each screens we want to route to*/}
    {/*The 'name' prop will be used as te title of our header bar to uniquely identify each route*/}
    <Stack.Screen name="Tweets" component={Tweets} />
    <Stack.Screen name="TweetDetails" component={TweetDetails} />
  </Stack.Navigator>
);

export default function App() {
  return (
    /*Container component which holds the navigation state designed for React Native apps. This should be rendered at the root wrapping the whole app.*/
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
