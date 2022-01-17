/*
Now that we have the user object, we want to store in our app component and make it available in our entire app..
We will store the user object in our App.js state and use react context to make it available in our entire app...

1.  Add a new folder inside the app folder 'auth' >> Inside the auth folder, add a new file 'context.js'
*/

//context.js
import React from "react";

const AuthContext = React.createContext();

export default AuthContext;

//App.js
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { AppOfflineNotice } from "./app/Components/AppOfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";

export default function App() {
  const [user, setUser] = useState();
  return (
    //  We wrap our entire app with ds AuthContext provider and anything we supply to d value prop will be available to the entire components
    //  we pass d user object and the function to set the user
    <AuthContext.Provider value={{ user, setUser }}>
      <AppOfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {/*  If we have d user object, we render the AppNavigator else we show the AuthNavigator*/}
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

//LoginScreen.js
import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, TextInput, Text } from "react-native";
import { Formik } from "formik";
import jwtDecode from "jwt-decode";
import * as Yup from "yup";

import { AppScreen } from "../Components/AppScreen";
import { AppFormField } from "../Components/Forms/AppFormField";
import { AppSubmitButton } from "../Components/Forms/AppSubmitButton";
import { AppError } from "../Components/Forms/AppError";
import authApi from "../api/auth";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"), //label : the name to refer to d input field i the error msg
  password: Yup.string().required().min(4).label("Password"),
});
export function LoginScreen() {
  // here we make the particular context we want to access using the 'useContext' and we pass the name of the context to the useContext function
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  //We call ds function to submit the login form
  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) {
      return setLoginFailed(true);
    } else {
      setLoginFailed(false);
      const user = jwtDecode(result.data);
      // here we call d setUser function of the authContext and pass the user object....
      authContext.setUser(user);
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
