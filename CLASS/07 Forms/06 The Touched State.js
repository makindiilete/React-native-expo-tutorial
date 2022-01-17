/*
The Touched State ensures we touched an input field before we display validation errors for that field unlike now that we display errors for both field immediately we start typing in one....

We add an onBlur event to mark the field has touched when we touch it and then use the 'touched' from formik to detect when the input is touched or not in other to conditionally render the Error component
*/

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
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldTouched,
          touched,
        }) => (
          <>
            <AppTextInput
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <AppError error={errors.email} visible={touched.email} />
            <AppTextInput
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
            />
            <AppError error={errors.password} visible={touched.password} />
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

//AppError.js
import React from "react";
import { View, StyleSheet, Text } from "react-native";

export function AppError({ error, visible }) {
  if (!visible || !error) return null;
  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: { color: "red" },
});
