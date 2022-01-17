/*
We want to start by implementing the navigation flow for authentication....
1.  Inside the 'app' folder, create a new folder 'navigation' : - All our navigation code will be placed in this folder...
2.  Add a new file inside the created folder 'AuthNavigator.js'
*/

//AuthNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;

//App.js
import React from "react";
import { AppScreen } from "./app/Components/AppScreen";
import { Button, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AuthNavigator from "./app/navigation/AuthNavigator";

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
      //activeBackgroundColor: "tomato", // backgroundColor for the active tab
      activeTintColor: "tomato", // text color for the active tab
      // inactiveBackgroundColor: "#eee", // background color for the inactive tab
      inactiveTintColor: "black", // text color for the inactive tab
    }}
  >
    {/*  Here we ref our StackNavigator so the Feeds tab will point to the first screen in the stack navigator and from the stack navigator we can navigate around even though we no longer have the stack navigator in the navigation container*/}
    <Tab.Screen
      name="Feeds"
      component={StackNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="mail" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);
export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}

//WelcomeScreen.js
import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Button,
  Image,
  Text,
  Platform,
} from "react-native";
import { AppButton } from "../Components/AppButton";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

export function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    //ImageBackground component is used to form a background with an image in react native
    <ImageBackground
      blurRadius={Platform.OS === "ios" ? 10 : 5}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
        <Text style={styles.tagLine}>Sell What You Don't Need</Text>
      </View>
      <View style={styles.buttons}>
        <AppButton title="LOGIN" onPress={() => navigation.navigate("Login")} />
        <AppButton
          title="REGISTER"
          color={colors.secondary}
          registerButton
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end", // ds push the buttons (Views) to the bottom of the screen (remember by default d flexDirection :column)
    alignItems: "center", // we need d logo to b in d center so bcos d primary axis is vertical (default), we use ds property to center the logo and other items in d container at the center of d container/screen
  },
  buttons: {
    paddingHorizontal: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute", // bcos d parent container is justified to flex-end to push all items to d bottom of d screen, we need absolute positioning to be able to put the log at the top
    top: 70,
    alignItems: "center",
  },
  tagLine: {
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 20,
  },
});
