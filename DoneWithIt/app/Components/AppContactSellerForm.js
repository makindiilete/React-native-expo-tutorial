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
