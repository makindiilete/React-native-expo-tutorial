/*
We want to see how we can take users from one screen to another... To do this, we use the navigation prop..

From https://reactnavigation.org/docs/navigation-prop we get  : -
Each screen component in your app is provided with the navigation prop automatically. The prop contains various convenience functions that dispatch navigation actions. It looks like this:
navigation
navigate - go to another screen, figures out the action it needs to take to do it
reset - wipe the navigator state and replace it with a new route
goBack - close active screen and move back in the stack
setParams - make changes to route's params
dispatch - send an action object to update the navigation state
setOptions - update the screen's options
isFocused - check whether the screen is focused
addListener - subscribe to updates to events from the navigators

Differences between navigation.navigate() & navigation.push() : -
With push() : - Even though we are currently on the Tweets component/route, we can call the push method and give it our routeName which is the current component we are and what this will do is that it will push another instance of the Tweets component on the stack so we now have two Tweets component of the same route but navigate() will ensure we maintain a single component/route per stack so if we are currently in the Tweets component and then we want to navigate to the same Tweets component, because already we are on the component, navigating will not do anything..... We need to always navigate to a different screen entirely all the time...
*/

//App.js
import React from "react";
import { AppScreen } from "./app/Components/AppScreen";
import { Button, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// The Tweets component/route

//navigation is a prop passed to every component inside d StackNavigator which we can use to navigate to other screens using the navigate() fn dt takes the name of the screen we are navigating to
const Tweets = ({ navigation }) => (
  <AppScreen>
    <Text>Tweets</Text>
    <Button title="View Tweet" onPress={() => navigation.navigate("Tweets")} />
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
  <Stack.Navigator>
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

/*
Only the screens defined inside the Navigator will have access to the navigation prop... If we have another screen or a child component that is not inside the Navigator component, the navigation prop will not be available to such component but we can use the navigation hook to give them access as we will see below
*/

//App.js
import React from "react";
import { AppScreen } from "./app/Components/AppScreen";
import { Button, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const Link = () => {
  //ds component is not a screen present in the Navigator, but navigation is made possible using the useNavigation() prop..
  const navigation = useNavigation();
  return (
    <Button title="Click" onPress={() => navigation.navigate("TweetDetails")} />
  );
};

// The Tweets component/route
//navigation is a prop passed to every component inside d StackNavigator which we can use to navigate to other screens using the navigate() fn dt takes the name of the screen we are navigating to
const Tweets = ({ navigation }) => (
  <AppScreen>
    <Text>Tweets</Text>
    <Link />
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
  <Stack.Navigator>
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
