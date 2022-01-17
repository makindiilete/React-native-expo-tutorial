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
