/*
Inside our cache.js, we have a line where we logging error to the console but as we know that we do not have console logging in production and that is why using a service like sentry or bugsnag is very useful..

1-  Head over to https://app.bugsnag.com/accounts/akindiileteforex/projects/new
2-  Select 'Mobile'
3-  Select 'React Native'
4-  Select 'Expo'
5-  Enter the app name
6-  On the next collaborator screen skip it


Installation
Add Bugsnag to your Expo project using our CLI. This will install the @bugsnag/expo notifier, add some configuration to app.json and start Bugsnag in your application.

# using npx (recommended)
npx bugsnag-expo-cli init

# using npm (if npx isn't available)
npm install --global bugsnag-expo-cli
bugsnag-expo-cli init
When prompted, provide your API key:

f722ba42c99eb1740cb456faf28f2e1b


7-  Answer Yes to all questions...
*/

//logger.js
import Bugsnag from "@bugsnag/expo";

export const log = (error) => Bugsnag.notify(error);

export const start = () => Bugsnag.start();

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
import { navigationRef } from "./app/navigation/rootNavigation";
import { start, log } from "./app/utility/logger";

start();

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
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

//cache.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { log } from "./logger";

const prefix = "cache";
const expireInMinutes = 60;

// ds function will store our data
const store = async (key, value) => {
  try {
    const item = {
      value: value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (err) {
    // console.log(err);
    log(err);
  }
};

const isExpired = (item) => {
  const now = moment(Date.now()); // d current datetime
  const storedTime = moment(item.timestamp); // d value of the timestamp of the item
  //calculating the different between the two dateTime : -  if the storedTime in minutes is greater than 5mins then the item has expired
  return now.diff(storedTime, "minutes") > expireInMinutes;
};

//ds function will retrieve our data
const get = async (key) => {
  // console.log("Key = ", prefix + key);
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);
    //if the item does not exist
    if (!item) {
      return null;
    }
    // if the item has expired,, we remove it from the cache and return null
    else if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }
    // if we gt here it means we have a valid item so we return it
    else {
      return item.value;
    }
  } catch (err) {
    // console.log(err);
    log(err);
  }
};

export default {
  store,
  get,
};
