/*
The permission API is another way we can get users permission in an expo app..
1.  expo install expo-permissions : - This package gives us alot of objects for working with users permissions...
*/

//App.js
import React, { useEffect, useState } from "react";
import { AppScreen } from "./app/Components/AppScreen";
import * as Permissions from "expo-permissions";

export default function App() {
  //We call ds function to request for permission to access the media library
  const requestPermission = async () => {
    //We can request for multiple permissions at once e.g. Permission to d gallery and location
    const result = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY,
      Permissions.LOCATION
    );
    if (!result.granted) {
      alert("You need to enable permission to access the library!");
    }
  };
  useEffect(() => {
    requestPermission();
  }, []);
  return <AppScreen></AppScreen>;
}
