/*
We want to create a custom hook for our useContext hook we are using in the AccountScreen.js
1.  In the 'auth' folder, create a new file 'useAuth.js'
*/

//useAuth.js
//we get the user object from the authContext so we can get d name and email
import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import jwtDecode from "jwt-decode";

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  // we receive the token passed, decode it, we update the user in d state and store the token in the authStorage
  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    // here we call d setUser function of the authContext and pass the user object....
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };
  return { user, logIn, logOut };
}

//AccountScreen.js
import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { AppScreen } from "../Components/AppScreen";
import { AppListItem } from "../Components/AppListItem";
import colors from "../config/colors";
import { AppIcon } from "../Components/AppIcon";
import { AppListItemSeparator } from "../Components/AppListItemSeparator";
import { useNavigation } from "@react-navigation/native";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];
export function AccountScreen() {
  //we get the user object from the authContext so we can get d name and email
  const { user, logOut } = useAuth();

  const navigation = useNavigation();

  return (
    <AppScreen style={styles.screen}>
      <View style={styles.container}>
        <AppListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/myAvatar.jpg")}
          style={{ backgroundColor: "white" }}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItems) => menuItems.title.toString()}
          ItemSeparatorComponent={AppListItemSeparator}
          renderItem={({ item }) => (
            <AppListItem
              IconComponent={
                <AppIcon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              title={item.title}
              style={{ backgroundColor: "white" }}
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <View style={styles.container}>
        {/*  We set the user to null when we click the logOut button*/}
        <AppListItem
          IconComponent={<AppIcon name="logout" backgroundColor="#ffe66d" />}
          title="Log Out"
          style={{ backgroundColor: "white" }}
          onPress={() => logOut()}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 10,
  },
});

//LoginScreen.js
import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { AppScreen } from "../Components/AppScreen";
import { AppFormField } from "../Components/Forms/AppFormField";
import { AppSubmitButton } from "../Components/Forms/AppSubmitButton";
import { AppError } from "../Components/Forms/AppError";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"), //label : the name to refer to d input field i the error msg
  password: Yup.string().required().min(4).label("Password"),
});
export function LoginScreen() {
  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  //We call ds function to submit the login form
  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) {
      return setLoginFailed(true);
    } else {
      setLoginFailed(false);
      // we pass d token we receive to the logIn method of useAuth custom hook
      logIn(result.data);
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
