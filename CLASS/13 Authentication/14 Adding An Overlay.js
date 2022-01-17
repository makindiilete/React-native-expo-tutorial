/*
Currently when we display the activity indicator loader, the form is still active and we can still the register button which is not supposed to be so we will render the activity indicator as an overlay on the form...
*/

//AppActivityIndicator.js
import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

export function AppActivityIndicator({ visible = false }) {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.overlay}>
      <LottieView
        source={require("../assets/animations/loader.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.white,
    position: "absolute",
    zIndex: 1, // to bring d overlay ontop of other component
    opacity: 0.8, // to make d screen underneath show a little
  },
});

//RegisterScreen.js
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { AppSubmitButton } from "../Components/Forms/AppSubmitButton";
import { AppScreen } from "../Components/AppScreen";
import { AppFormField } from "../Components/Forms/AppFormField";
import registerApi from "../api/users";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import { AppError } from "../Components/Forms/AppError";
import { AppActivityIndicator } from "../Components/AppActivityIndicator";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export function RegisterScreen() {
  const { logIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    setLoading(true);
    const result = await registerApi.register(userInfo);
    // if the api call failed
    if (!result.ok) {
      setLoading(false);
      // we check if d server returns a data, if true it means d server returns d reason why the api call failed and we set it as our error object
      if (result.data) {
        setError(result.data.error);
      }
      // if d result contains no data, it means d server returns ntin which can be maybe internet connection is not detected or any unexpected error..
      else {
        setError("An expected error occurred!");
        console.log(result);
      }
      return;
    }
    // else if the registration was successful
    else {
      // we call d login api to use the user email and password to login
      const result = await authApi.login(userInfo.email, userInfo.password);
      setLoading(false);
      // ds returns a jwt token which we pass to the logIn custom hook so it can be stored in the storage
      logIn(result.data);
    }
  };
  return (
    <>
      <AppActivityIndicator visible={loading} />
      <AppScreen style={styles.container}>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <>
              <AppError error={error} visible={error} />
              <AppFormField
                autoCorrect={false}
                icon="account"
                name="name"
                placeholder="Name"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                textContentType="emailAddress"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
              />
              <AppSubmitButton title="Register" />
            </>
          )}
        </Formik>
      </AppScreen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
