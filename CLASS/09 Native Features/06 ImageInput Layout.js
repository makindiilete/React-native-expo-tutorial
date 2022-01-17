/*
Here we want to build our ImageInput component... This will be a placeholder that will hold our image when we select an image from the media library or it will show a camera icon inside the container when no image is present...
1.  Inside the component folder, add a new file 'AppImageInput.js'
*/

//AppImageInput.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function AppImageInput({ imageUri }) {
  return (
    <View style={styles.container}>
      {!imageUri && (
        <MaterialCommunityIcons name="camera" size={20} color={colors.medium} />
      )}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    width: 100,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});

//App.js
import React, { useEffect, useState } from "react";
import { AppScreen } from "./app/Components/AppScreen";
import * as ImagePicker from "expo-image-picker";
import { Button, Image } from "react-native";
import { AppImageInput } from "./app/Components/AppImageInput";

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
      <AppImageInput imageUri={imageUri} />
    </AppScreen>
  );
}
