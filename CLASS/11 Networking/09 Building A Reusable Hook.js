/*
With our current implementation, everytime we wanna make an api call, we need to set the state to store the response, d state for the loading and an api function to call an endpoint and store the response in a state... All these logic will be the same across all component so instead of having to duplicate codes always, we can encapsulate this inside a reusable hook....
1.  In the hooks folder, add a new file 'useApi.js'... With this hook, we gonna make our api calls
*/

//useApi.js
import { useEffect, useState } from "react";
import listingApi from "../api/listings";

export default function useApi(apiFunc) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async () => {
    setLoading(true);
    const response = await apiFunc();
    setLoading(false);

    if (!response.ok) {
      return setError(true);
    }

    setError(false);
    setData(response.data);
  };
  return {
    data,
    error,
    loading,
    request,
  };
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

/*
Reusable hook with API that accepts parameters
*/

//listings.js
import client from "./client";

const endpoint = "/listings";

const getListings = (a, b, c) => client.get(endpoint);

export default {
  getListings,
};

//useApi.js
import { useEffect, useState } from "react";
import listingApi from "../api/listings";

export default function useApi(apiFunc) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      return setError(true);
    }

    setError(false);
    setData(response.data);
  };
  return {
    data,
    error,
    loading,
    request,
  };
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
import useApi from "../hooks/useApi";

export function ListingScreen() {
  const navigation = useNavigation();
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingApi.getListings
  );

  useEffect(() => {
    loadListings(1, 2, 3);
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

/*
Multiple Api calls with reusable hook
*/

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
  const getApiListings = useApi(listingApi.getListings);

  useEffect(() => {
    getApiListings.request(1, 2, 3);
  }, []);
  return (
    <AppScreen style={styles.screen}>
      {getApiListings.error && (
        <>
          <AppText>Couldn't load listings</AppText>
          <AppButton title="Retry" onPress={getApiListings.request} />
        </>
      )}
      {/*By default d lottie file takes the entire screen and will disable the flatList so we do not need to render the flatList conditionally*/}
      <AppActivityIndicator visible={getApiListings.loading} />
      <FlatList
        data={getApiListings.data}
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
