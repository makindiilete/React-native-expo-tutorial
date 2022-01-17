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
    <>
      <AppActivityIndicator visible={loading} />
      <AppScreen style={styles.screen}>
        {error && (
          <>
            <AppText>Couldn't load listings</AppText>
            <AppButton title="Retry" onPress={loadListings} />
          </>
        )}
        {/*By default d lottie file takes the entire screen and will disable the flatList so we do not need to render the flatList conditionally*/}
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
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    padding: Platform.OS === "android" ? 10 : 20,
  },
});
