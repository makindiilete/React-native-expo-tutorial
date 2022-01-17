/*
We will use a library called 'jwt-decode' to decode our jwt token..

1.  npm i jwt-decode
*/

//LoginScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput, Text } from "react-native";
import { Formik } from "formik";
import jwtDecode from "jwt-decode";
import * as Yup from "yup";

import { AppScreen } from "../Components/AppScreen";
import { AppFormField } from "../Components/Forms/AppFormField";
import { AppSubmitButton } from "../Components/Forms/AppSubmitButton";
import { AppError } from "../Components/Forms/AppError";
import authApi from "../api/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"), //label : the name to refer to d input field i the error msg
  password: Yup.string().required().min(4).label("Password"),
});
export function LoginScreen() {
  const [loginFailed, setLoginFailed] = useState(false);

  //We call ds function to submit the login form
  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) {
      return setLoginFailed(true);
    } else {
      setLoginFailed(false);
      const user = jwtDecode(result.data);
      console.log(user);
    }
  };
  return (
    <AppScreen style={styles.container}>
      <Image source={require("../assets/logo-red.png")} style={styles.logo} />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <>
            {/*  ds error component loads if d login fails*/}
            <AppError
              error="Invalid email and/or password"
              visible={loginFailed}
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
              secureTextEntry={true}
              textContentType="password"
            />
            <AppSubmitButton title="Login" />
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

/*
Now when we login, we get the token object
Object {
  "email": "mosh@domain.com",
  "iat": 1614339677,
  "name": "Mosh",
  "userId": 1,
}

*/
