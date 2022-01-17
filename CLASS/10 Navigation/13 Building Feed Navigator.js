/*
We need another Stack Navigator that will be different from the AuthNavigator which only has access to Login and Register..
1.  Add a new file in the navigation folder 'FeedNavigator.js'
*/

//FeedNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { ListingScreen } from "../screens/ListingScreen";
import { ListingDetailsScreen } from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  //  With modal mode, our screens we pop up from bottom like a modal and we can pull it down to remove it from the stack instead of the default mode which slides from the right
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Listings" component={ListingScreen} />
    {/*Because we are using modal mode, we no longer need the header or back button*/}
    <Stack.Screen
      name="ListingDetails"
      component={ListingDetailsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;

//AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListingScreen } from "../screens/ListingScreen";
import { ListingEditScreen } from "../screens/ListingEditScreen";
import { AccountScreen } from "../screens/AccountScreen";
import FeedNavigator from "./FeedNavigator";

const Tab = createBottomTabNavigator();
const AppNavigator = () => (
  <Tab.Navigator>
    {/*<Tab.Screen name="Listings" component={ListingScreen} />*/}

    {/*Nesting navigators*/}
    <Tab.Screen name="Feeds" component={FeedNavigator} />
    <Tab.Screen name="ListingEdit" component={ListingEditScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
);

export default AppNavigator;

//ListingScreen.js
import React from "react";
import { View, StyleSheet, FlatList, Platform, Text } from "react-native";
import { AppScreen } from "../Components/AppScreen";
import { AppCard } from "../Components/AppCard";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 1000,
    image: require("../assets/couch.jpg"),
  },
];

export function ListingScreen() {
  const navigation = useNavigation();
  return (
    <AppScreen style={styles.screen}>
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          //  We navigate to the Listing Details screen when the card is pressed and we send along the particular listing item we clicked on as route params so we display only that item alone in our listing details screen
          <AppCard
            image={item.image}
            title={item.title}
            subTitle={"$" + item.price}
            onPress={() => navigation.navigate("ListingDetails", item)}
          />
        )}
        keyExtractor={(listings) => listings.id.toString()}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    padding: Platform.OS === "android" ? 10 : 20,
  },
});

//ListingDetailScreen.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { AppText } from "../Components/AppText";
import colors from "../config/colors";
import { AppListItem } from "../Components/AppListItem";

export function ListingDetailsScreen({ route }) {
  //here we get the route params object passed to this screen
  const listing = route.params;
  return (
    <View>
      <Image source={listing.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.subTitle}>${listing.price}</AppText>
        <View style={styles.userContainer}>
          <AppListItem
            image={require("../assets/myAvatar.jpg")}
            title="Michaelz Omoakin"
            subTitle="5 Listings"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  userContainer: {
    marginVertical: 40,
  },
});

//AppCard.js
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../config/colors";
import { AppText } from "./AppText";

export function AppCard({ image, subtitle, title, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cardContainer}>
        <Image source={image} style={styles.image} />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}> {title} </AppText>
          <AppText style={styles.subTitle}> {subtitle} </AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden", // our image will overflow and block our card border radius so we use ds to hide the overflow
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});
