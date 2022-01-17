/*
We want to extract our AppTextInput and the AppErrorMessage that makes up a complete form field into a reusable component which we can easily reuse instead of declaring the two fields everytime...

1.  Add a new file into the Component folder 'AppFormField.js'
*/

//LoginScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput, Text } from "react-native";
import { AppScreen } from "../Components/AppScreen";
import { Formik } from "formik";
import * as Yup from "yup";
import { AppFormField } from "../Components/AppFormField";
import { AppSubmitButton } from "../Components/AppSubmitButton";
import { AppTextInput } from "../Components/AppTextInput";

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
        {({ handleSubmit }) => (
          <>
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
              secureTextEntry={true}
              textContentType="password"
            />
            <AppSubmitButton title="Login" onPress={handleSubmit} />
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

//AppFormField.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { AppTextInput } from "../AppTextInput";
import { AppError } from "./AppError";
import { useFormikContext } from "formik";

export function AppFormField({ name, ...rest }) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();
  return (
    <>
      <AppTextInput
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...rest}
      />
      <AppError error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
