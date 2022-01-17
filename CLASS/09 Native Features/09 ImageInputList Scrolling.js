/*
We want to enable horizontal scrolling so we can scroll our images when they are out of view...
To make the list scroll, we need to wrap it inside a scrollView component
*/

//AppImageInputList.js
import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AppImageInput } from "./AppImageInput";

export function AppImageInputList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
}) {
  //we define a reference which we can bind to any of our jsx tag to get access to it
  const scrollView = useRef();

  // When d content of the scrollview changes, we call ds method which scroll the content to the end using the ref we already attached to our ScrollView component
  const handleScroll = () => {
    scrollView.current.scrollToEnd();
  };
  return (
    //  ds view is added to ensure the scrollView does not occupy the whole available space which it does by default but to take only the available space it needs for its content which is the default behavior of View tag
    <View>
      // ds view will scroll horizontally.. by default it scrolls vertically if
      we add no prop
      <ScrollView
        horizontal
        ref={scrollView}
        onContentSizeChange={handleScroll}
      >
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: { marginRight: 10 },
});
