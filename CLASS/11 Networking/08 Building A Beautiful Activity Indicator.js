/*
To create a beautiful animation, we will be using a library created by airbnb 'lottie'...

1.  expo install lottie-react-native
2.  Create a new folder 'animations' inside the assets folder >> Inside this folder, we will put our animation json files we downloaded from https://lottiefiles.com/
3.  In the component folder, add a new file 'AppActivityIndicator.js'
*/

//AppActivityIndicator.js
import React from "react";
import LottieView from "lottie-react-native";

export function AppActivityIndicator({ visible = false }) {
  if (!visible) {
    return null;
  }
  return (
    <LottieView
      source={require("../assets/animations/loader.json")}
      autoPlay
      loop
    />
  );
}

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

export function ListingScreen() {
  const navigation = useNavigation();

  const [listings, setListings] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadListings = async () => {
    setLoading(true);
    const response = await listingApi.getListings();
    setLoading(false);

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
