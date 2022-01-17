import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { AppText } from "../Components/AppText";
import colors from "../config/colors";
import { AppListItem } from "../Components/AppListItem";
import { Image } from "react-native-expo-image-cache";
import AppContactSellerForm from "../Components/AppContactSellerForm";

export function ListingDetailsScreen({ route }) {
  //here we get the route params object passed to this screen
  const listing = route.params;
  console.log("Listing details = ", listing);
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
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
            image={require("../assets/mosh.jpg")}
            title="Michaelz Omoakin"
            subTitle="5 Listings"
          />
        </View>
        <AppContactSellerForm listing={listing} />
      </View>
    </KeyboardAvoidingView>
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
