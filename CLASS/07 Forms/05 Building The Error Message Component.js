/*
We want to create a reusable component to render our error messages..

1.  Add a new file to the components folder 'AppError.js'
*/

//AppError.js
import React from "react";
import { View, StyleSheet, Text } from "react-native";

export function AppError({ error }) {
  if (!error) return null;
  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: { color: "red" },
});

//LoginScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput, Text } from "react-native";
import { AppScreen } from "../Components/AppScreen";
import { AppTextInput } from "../Components/AppTextInput";
import { AppButton } from "../Components/AppButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { AppText } from "../Components/AppText";
import { AppError } from "../Components/AppError";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"), //label : the name to refer to d input field i the error msg
  password: Yup.string().required().min(4).label("Password"),
});
export function LoginScreen() {
  return (
    <AppScreen style={styles.container}>
      <Image source={require("../assets/logo-red.png")} style={styles.logo} />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <AppTextInput
              value={values.email}
              onChangeText={handleChange("email")}
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <AppError error={errors.email} />
            <AppTextInput
              value={values.password}
              onChangeText={handleChange("password")}
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
            />
            <AppError error={errors.password} />
            <AppButton title="Login" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
