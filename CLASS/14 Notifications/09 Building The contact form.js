/*
We want to render a contact form below our listing details where user can contact the seller of the item
*/

//messages.js
import client from "./client";

const endpoint = "/messages";

const send = (message, listingId) =>
  client.post(endpoint, {
    message,
    listingId,
  });

export default {
  send,
};

//AppContactSellerForm.js
import React from "react";
import { Alert, Keyboard } from "react-native";
import * as Notifications from "expo-notifications";
import * as Yup from "yup";

import messagesApi from "../api/messages";
import { Formik } from "formik";
import { AppFormField } from "./Forms/AppFormField";
import { AppSubmitButton } from "./Forms/AppSubmitButton";

function AppContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("Error", "Could not send the message to the seller.");
    }

    //if d msg was sent successfully, we reset the form

    resetForm();

    // den we send a local push notification to the user
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Awesome 📬",
        body: "Your message was sent to the seller.",
      },
      trigger: { seconds: 5 },
    });
  };

  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <>
          <AppFormField
            maxLength={255}
            multiline
            name="message"
            numberOfLines={3}
            placeholder="Message..."
          />
          <AppSubmitButton title="Contact Seller" />
        </>
      )}
    </Formik>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default AppContactSellerForm;

//ListingDetailsScreen.js
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
            image={require("../assets/myAvatar.jpg")}
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
