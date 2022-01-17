/*
Let us make our tab navigator pretty
*/

//Tab background and text color
import React from "react";
import { AppScreen } from "./app/Components/AppScreen";
import { Button, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
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

const Account = () => (
  <AppScreen>
    <Text>Account</Text>
  </AppScreen>
);

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: "tomato", // backgroundColor for the active tab
      activeTintColor: "white", // text color for the active tab
      inactiveBackgroundColor: "#eee", // background color for the inactive tab
      inactiveTintColor: "black", // text color for the inactive tab
    }}
  >
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

//Bottom tab icons
import React from "react";
import { AppScreen } from "./app/Components/AppScreen";
import { Button, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

const Account = () => (
  <AppScreen>
    <Text>Account</Text>
  </AppScreen>
);

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: "tomato", // backgroundColor for the active tab
      activeTintColor: "white", // text color for the active tab
      inactiveBackgroundColor: "#eee", // background color for the inactive tab
      inactiveTintColor: "black", // text color for the inactive tab
    }}
  >
    <Tab.Screen
      name="Feeds"
      component={Tweets}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
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
