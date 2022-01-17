/*
When user tap on the notification, we want to navigate them to a specific screen...
We cannot use the 'navigation' prop or 'useNavigation' hook we are using to navigate between screen inside our AppNavigator because AppNavigator is not a screen but a root navigator.. So we can use react 'ref' trick to get this done
*/

//rootNavigation.js
import React from "react";

export const navigationRef = React.createRef();

//App.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { AppOfflineNotice } from "./app/Components/AppOfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (!user) {
      return;
    } else {
      setUser(user);
    }
  };

  // here d component will only b ready when d restoreToken function resolves, so during ds process, d splash screen will remain and when the promise is resolved, the component shows
  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={(error) => console.log("Error", error)}
      />
    );
  }

  return (
    //  We wrap our entire app with ds AuthContext provider and anything we supply to d value prop will be available to the entire components
    //  we pass d user object and the function to set the user
    <AuthContext.Provider value={{ user, setUser }}>
      <AppOfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

//AppNavigator.js
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Notifications from "expo-notifications";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

import { ListingScreen } from "../screens/ListingScreen";
import { ListingEditScreen } from "../screens/ListingEditScreen";
import { AccountScreen } from "../screens/AccountScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import { NewListingRoundButtonTab } from "./NewListingRoundButtonTab";
import routes from "./routes";
import expoPushTokensApi from "../api/expoPushTokens";
import navigation, { navigationRef } from "./rootNavigation";

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  //Function to register and get our push notification for the current installed app
  const registerForPushNotifications = async () => {
    try {
      let token;
      if (Constants.isDevice) {
        const {
          status: existingStatus,
        } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        // we call d server passing the generated token.. we do not need to await the call bcos we are not doing something else after dt.. We just call it and let it run in the background
        expoPushTokensApi.register(token);
        console.log(token);
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      console.log("Push notification token = ", token);
      return token;
    } catch (error) {
      console.log("Error getting push notification ", error);
    }
  };

  useEffect(() => {
    registerForPushNotifications();
    //ds will listen to notification events and take an action, currently log it to the console..
    Notifications?.addNotificationReceivedListener((notification) =>
      console.log("Notification received = ", notification)
    );
    Notifications?.addNotificationResponseReceivedListener((notification) =>
      // we use the navigate method from the root navigation to navigate the user to the Account screen upon tapping on the push notification
      navigationRef?.current?.navigate("Account")
    );
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={
        Platform.OS === "android"
          ? {
              style: {
                paddingBottom: 20,
                height: 80,
              },
            }
          : null
      }
    >
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
              onPress={() => navigation.navigate(routes.LISTING_EDIT)}
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
};

export default AppNavigator;
