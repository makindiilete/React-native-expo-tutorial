/*
Now we want to replace our hardcoded listings with the listings we are going to fetch from the server
*/

//ListingScreen.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Platform, Text } from "react-native";
import { AppScreen } from "../Components/AppScreen";
import { AppCard } from "../Components/AppCard";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import routes from "../navigation/routes";
import listingApi from "../api/listings";

export function ListingScreen() {
  const navigation = useNavigation();

  const [listings, setListings] = useState([]);

  const loadListings = async () => {
    const response = await listingApi.getListings();
    setListings(response.data);
  };

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <AppScreen style={styles.screen}>
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          //  We navigate to the Listing Details screen when the card is pressed and we send along the particular listing item we clicked on as route params so we display only that item alone in our listing details screen
          <AppCard
            imageUrl={item?.images[0]?.url}
            title={item?.title}
            subTitle={"$" + item?.price}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
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

//ListingDetailsScreen.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { AppText } from "../Components/AppText";
import colors from "../config/colors";
import { AppListItem } from "../Components/AppListItem";

export function ListingDetailsScreen({ route }) {
  //here we get the route params object passed to this screen
  const listing = route.params;
  console.log("Listing details = ", listing);
  return (
    <View>
      <Image source={{ uri: listing?.images[0]?.url }} style={styles.image} />
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

export function AppCard({ imageUrl, subtitle, title, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
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
