/*
We want to handle api errors so if we are unable to fetch our listings, we render an error message and a button for the user to try again
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
import { AppText } from "../Components/AppText";
import { AppButton } from "../Components/AppButton";

export function ListingScreen() {
  const navigation = useNavigation();

  const [listings, setListings] = useState([]);
  const [error, setError] = useState(false);

  const loadListings = async () => {
    const response = await listingApi.getListings();
    if (!response.ok) {
      return setError(true);
    }
    setError(false);
    setListings(response.data);
  };

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
