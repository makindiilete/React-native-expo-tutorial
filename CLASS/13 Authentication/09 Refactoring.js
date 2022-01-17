/*
Now we want to refactor our code and extract the logic we are using to decode our token in other to get a user from our App.js
*/

//storage.js
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken";

// to store the token in the storage
const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  if (!token) {
    return null;
  } else {
    return jwtDecode(token);
  }
};

// to retrieve the token from storage
const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting auth token ", error);
  }
};

// to remove the token from storage
const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token ", error);
  }
};

export default {
  getUser,
  storeToken,
  removeToken,
};

//App.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { AppOfflineNotice } from "./app/Components/AppOfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (!user) {
      return;
    } else {
      setUser(user);
    }
  };

  // here d component will only b ready when d restoreToken function resolves, so during ds process, d splash screen will remain and when the promise is resolved, the component shows
  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={(error) => console.log("Error", error)}
      />
    );
  }

  return (
    //  We wrap our entire app with ds AuthContext provider and anything we supply to d value prop will be available to the entire components
    //  we pass d user object and the function to set the user
    <AuthContext.Provider value={{ user, setUser }}>
      <AppOfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
