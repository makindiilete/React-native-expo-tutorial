/*
Whenever we want to request for something on the user's phone, we need to request for their permission...
*/

//App.js
import React, { useEffect, useState } from "react";
import { AppScreen } from "./app/Components/AppScreen";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  //We call ds function to request for permission to access the media library
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //if the user decline the permission, we display this alert msg
    if (!granted) {
      alert("You need to enable permission to access the library!");
    }
  };
  useEffect(() => {
    requestPermission();
  }, []);
  return <AppScreen></AppScreen>;
}
