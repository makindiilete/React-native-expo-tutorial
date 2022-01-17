/*
Now we want to define our own navigation theme....
1.  Add a new file inside the navigation folder 'navigationTheme.js'
*/

//navigationTheme.js
import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

const myTheme = {
  // We copy all the properties inside the DefaultTheme overriding the colors
  ...DefaultTheme,
  colors: {
    // we copy/spread all the colors available in the default theme overriding the following colors
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white, // d background color to be apply to all screens
  },
};

export default myTheme;

//App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}
