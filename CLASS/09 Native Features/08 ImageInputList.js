/*
 Now we want to build an image list component that will allow us select multiple images and align them horizontally as a list..
 1. In the component folder, add a new file 'imageInputList.js'
 */

//AppImageInputList.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { AppImageInput } from "./AppImageInput";

export function AppImageInputList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
}) {
  return (
    <View style={styles.container}>
      {/*  All added images we will mapped into a list and rendered*/}
      {imageUris.map((uri, index) => (
        <View style={styles.image} key={index}>
          <AppImageInput
            imageUri={uri}
            onChangeImage={() => onRemoveImage(uri)}
          />
        </View>
      ))}
      {/*A new blank image input field will always appear at the end to add more images which will call a function to add a new image*/}
      {/*When d AppImageInput component is touched, d onPress event is called which selects and image and then pass the selected image to the onChangeImage function and then the onChangeImage here call the onAddImage function from the parent component and pass the image it receives from AppImageInput to it to be added*/}
      <AppImageInput onChangeImage={(uri) => onAddImage(uri)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: { marginRight: 10 },
});

//App.js
import React, { useEffect, useState } from "react";
import { AppScreen } from "./app/Components/AppScreen";
import * as ImagePicker from "expo-image-picker";
import { Button, Image } from "react-native";
import { AppImageInput } from "./app/Components/AppImageInput";
import { AppImageInputList } from "./app/Components/AppImageInputList";

export default function App() {
  const [imageUris, setImageUris] = useState([]);

  const onChangeImage = (selectedImage) => {
    setImageUris(selectedImage);
  };

  const handleAdd = (selectedImage) => {
    setImageUris([...imageUris, selectedImage]);
  };

  const handleRemove = (selectedImage) => {
    setImageUris(imageUris.filter((img) => img !== selectedImage));
  };
  return (
    <AppScreen>
      <AppImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
    </AppScreen>
  );
}
