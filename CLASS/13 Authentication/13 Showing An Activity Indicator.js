/*
On our registration screen, after user fills the form and click on register, the registration process might take a while if they are on a slow connection, so we need to show an activity indicator for the user to know an async request is going on...
*/

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
    <AppScreen style={styles.container}>
      <AppActivityIndicator visible={loading} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

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
      setError(true);
      return response;
    }

    setError(false);
    setData(response.data);
    return response;
  };
  return {
    data,
    error,
    loading,
    request,
  };
}
