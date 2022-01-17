/*
To cache images, the best way is to use a libary called 'FastImage' but its not supported on expo yet so we will be using a library expo supported which is : -
1.  npm i react-native-expo-image-cache
2.  expo install expo-blur
*/

//AppCard.js
import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "../config/colors";
import { AppText } from "./AppText";
import { Image } from "react-native-expo-image-cache";

export function AppCard({ imageUrl, subtitle, title, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cardContainer}>
        {/*<Image source={{ uri: imageUrl }} style={styles.image} />*/}
        <Image uri={imageUrl} style={styles.image} />
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

/*
Now our caching work because we have replaced the Image component with the one from the library we installed but the issue is the image delays for a milliseconds before showing up, to fix this, we need to use a progressive image which will load before the real image shows.. ds can be any image but for this case, we will use our thumbnailUrl from our api response
*/

//AppCard.js
import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "../config/colors";
import { AppText } from "./AppText";
import { Image } from "react-native-expo-image-cache";

export function AppCard({ imageUrl, subtitle, title, onPress, thumbnailUrl }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cardContainer}>
        {/*<Image source={{ uri: imageUrl }} style={styles.image} />*/}
        {/*tint will determine how dark the preview image will be*/}
        <Image
          uri={imageUrl}
          tint="light"
          style={styles.image}
          preview={{ uri: thumbnailUrl }}
        />
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

//ListingScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  Text,
  ActivityIndicator,
} from "react-native";
import { AppScreen } from "../Components/AppScreen";
import { AppCard } from "../Components/AppCard";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import routes from "../navigation/routes";
import listingApi from "../api/listings";
import { AppText } from "../Components/AppText";
import { AppButton } from "../Components/AppButton";
import { AppActivityIndicator } from "../Components/AppActivityIndicator";
import useApi from "../hooks/useApi";

export function ListingScreen() {
  const navigation = useNavigation();
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingApi.getListings
  );

  useEffect(() => {
    loadListings();
  }, []);
  return (
    <AppScreen style={styles.screen}>
      {error && (
        <>
          <AppText>Couldn't load listings</AppText>
          <AppButton title="Retry" onPress={loadListings} />
        </>
      )}
      {/*By default d lottie file takes the entire screen and will disable the flatList so we do not need to render the flatList conditionally*/}
      <AppActivityIndicator visible={loading} />
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          //  We navigate to the Listing Details screen when the card is pressed and we send along the particular listing item we clicked on as route params so we display only that item alone in our listing details screen
          <AppCard
            imageUrl={item?.images[0]?.url}
            title={item?.title}
            subTitle={"$" + item?.price}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            thumbnailUrl={item.images[0].thumbnailUrl}
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
import { View, StyleSheet } from "react-native";
import { AppText } from "../Components/AppText";
import colors from "../config/colors";
import { AppListItem } from "../Components/AppListItem";
import { Image } from "react-native-expo-image-cache";

export function ListingDetailsScreen({ route }) {
  //here we get the route params object passed to this screen
  const listing = route.params;
  console.log("Listing details = ", listing);
  return (
    <View>
      {/*<Image source={{ uri: listing?.images[0]?.url }} style={styles.image} />*/}
      <Image
        uri={listing?.images[0]?.url}
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
      />
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
