/*
Currently when we reload/restart our app, the auth/welcome screen shows for few seconds before the authentication status is detected and the listing screen shows... To solve this, we will need to delay the splash screen more using

1.  expo install expo-app-loading
*/

//App.js
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) {
      return;
    } else {
      setUser(jwtDecode(token));
    }
  };

  // here d component will only b ready when d restoreToken function resolves, so during ds process, d splash screen will remain and when the promise is resolved, the component shows
  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreToken}
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

// Splash Screen Settings : - check app.json
