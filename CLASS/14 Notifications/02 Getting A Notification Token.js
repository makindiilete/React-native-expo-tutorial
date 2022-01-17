/*
To implement notifications, we will be using the notification api we have available in expo...

1.  https://docs.expo.io/versions/v40.0.0/sdk/notifications/
1b. expo install expo-notifications
2.  Open app.json, in the 'android' object, add '"useNextNotificationsApi": true,' as one of the properties
3.  We want to get notifications only if user is logged in so we will do our configurations inside AppNavigator
*/


//AppNavigator.js
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Notifications from "expo-notifications";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ListingScreen } from "../screens/ListingScreen";
import { ListingEditScreen } from "../screens/ListingEditScreen";
import { AccountScreen } from "../screens/AccountScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import { NewListingRoundButtonTab } from "./NewListingRoundButtonTab";
import routes from "./routes";
import Constants from "expo-constants";

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



//app.json
{
    "expo": {
    "name": "DoneWithIt",
        "slug": "DoneWithIt",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./app/assets/icon.png",
        "splash": {
        "image": "./app/assets/splash.png",
            "resizeMode": "cover",
            "backgroundColor": "#e63c4b"
    },
    "updates": {
        "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
        "**/*"
    ],
        "ios": {
        "supportsTablet": true
    },
    "android": {
                "useNextNotificationsApi": true,
        "adaptiveIcon": {
            "foregroundImage": "./app/assets/adaptive-icon.png",
                "backgroundColor": "#FFFFFF"
        }
    },
    "web": {
        "favicon": "./app/assets/favicon.png"
    },
    "description": "A marketplace to sell the stuff you do not need anymore"
}
}


/*
Now when you run the app and login, you get the expo push notification token logged to the console... The token stays the same for every app restarts but if the app is re-installed, a new token will be generated.. So from here we need to store the token on the server
*/
