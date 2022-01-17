/*
We can customize our headers to apply different styles like setting the background color, text color....
*/

import React from "react";
import { AppScreen } from "./app/Components/AppScreen";
import { Button, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
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

//Using the route prop, we can access the parameters passed to this component
const TweetDetails = ({ route }) => (
  <AppScreen>
    {/*Here we can access the id property as part of the params object passed to ds route*/}
    <Text>Tweet Details {route.params.id}</Text>
  </AppScreen>
);

const Stack = createStackNavigator();

//This creates our route configuration
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Tweets"
      component={Tweets}
      options={{
        headerStyle: { backgroundColor: "tomato" }, // ds set the header background color
        headerTintColor: "white", // ds set the color for the header text
        headerShown: false, // ds hides d header
      }}
    />
    <Stack.Screen
      name="TweetDetails"
      component={TweetDetails}
      options={({ route }) => ({ title: route.params.id })}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

/*
Setting the header styles globally for all screens : - Setting the options object inside each screen will apply it only to that screen but you can set it globally to apply to all screens in the navigator by using the 'screenOptions' prop and using the same object
*/

import React from "react";
import { AppScreen } from "./app/Components/AppScreen";
import { Button, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
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

//Using the route prop, we can access the parameters passed to this component
const TweetDetails = ({ route }) => (
  <AppScreen>
    {/*Here we can access the id property as part of the params object passed to ds route*/}
    <Text>Tweet Details {route.params.id}</Text>
  </AppScreen>
);

const Stack = createStackNavigator();

//This creates our route configuration
const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "tomato" }, // ds set the header background color
      headerTintColor: "white", // ds set the color for the header text
    }}
  >
    {/*d styles inside ds screen will override the global styles*/}
    <Stack.Screen
      name="Tweets"
      component={Tweets}
      options={{
        headerStyle: { backgroundColor: "tomato" }, // ds set the header background color
        headerTintColor: "white", // ds set the color for the header text
        headerShown: false, // ds hides d header
      }}
    />
    <Stack.Screen
      name="TweetDetails"
      component={TweetDetails}
      options={({ route }) => ({ title: route.params.id })}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

/*
You can find all the options you can apply here from the docs https://reactnavigation.org/docs/stack-navigator#options
*/
