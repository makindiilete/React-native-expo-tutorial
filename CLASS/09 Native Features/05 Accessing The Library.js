/*
Now we want to select an image from the libary and display it on our screen
*/

//App.js
import React, { useEffect, useState } from "react";
import { AppScreen } from "./app/Components/AppScreen";
import * as ImagePicker from "expo-image-picker";
import { Button, Image } from "react-native";

export default function App() {
  const [imageUri, setImageUri] = useState();
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

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      //if d user does not cancel the image picker then we set the selected image d user picks to our imageUri state
      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (e) {
      console.log("Error reading an image", e);
    }
  };
  return (
    <AppScreen>
      <Button title="Select Image" onPress={selectImage} />
      <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
    </AppScreen>
  );
}
