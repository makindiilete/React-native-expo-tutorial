/*
Our AppNavigator is currently polluted with our push notification code, we want to move this into a custom hook we can easily reuse in future
*/

//useNotifications.js
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import expoPushTokensApi from "../api/expoPushTokens";
import { Platform } from "react-native";
import { useEffect } from "react";
import { navigationRef } from "../navigation/rootNavigation";

export default function useNotifications(notificationListener) {
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
    //we check if we av a function to handle the notification tap then we run it else we do nothing
    if (notificationListener) {
      Notifications?.addNotificationResponseReceivedListener(
        notificationListener
      );
    }
  }, []);
}

//AppNavigator.js
import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ListingEditScreen } from "../screens/ListingEditScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import { NewListingRoundButtonTab } from "./NewListingRoundButtonTab";
import routes from "./routes";
import { navigationRef } from "./rootNavigation";
import useNotifications from "../hooks/useNotifications";

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  useNotifications((notification) =>
    // we use the navigate method from the root navigation to navigate the user to the Account screen upon tapping on the push notification
    navigationRef?.current?.navigate("Account")
  );

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
