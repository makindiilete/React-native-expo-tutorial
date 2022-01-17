/*
Rendering Local/Static Images : - This will be bundled into our app and increases its size.. Useful for images for icons, splash screens etc
Network Images : -
*/

//Local/Static Images
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  Image,
} from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello React Native</Text>
      <Image source={require("./assets/icon.png")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes d entire screen (values from 0 - 1 i.e. 0% - 100%)
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

//Network Images : - You need to specify the size and height
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  Image,
} from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello React Native</Text>
      <Image
        source={{
          width: 200,
          height: 300,
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes d entire screen (values from 0 - 1 i.e. 0% - 100%)
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

//blurRadius : - to make the image blurry
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  Image,
} from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello React Native</Text>
      <Image
        blurRadius={5}
        source={{
          width: 200,
          height: 300,
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes d entire screen (values from 0 - 1 i.e. 0% - 100%)
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

//loadingIndicatorSource : - Here we use a local image as a placeholder while we await the real image to be downloaded from the server
//fadeDuration (android only) : - ds loads d image with a fade effect which takes 300ms by default but can be increased
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  Image,
} from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello React Native</Text>
      <Image
        fadeDuration={1000}
        blurRadius={5}
        source={{
          width: 200,
          height: 300,
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes d entire screen (values from 0 - 1 i.e. 0% - 100%)
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

//resizeMode : - This is used to resize the image if the image dimension does not match the frame where we want to place the image... Options available are : - cover, contain, stretch, repeat and center.. By default is cover...

//onLoad, onLoadStart, onLoadEnd : - With these, we can tap into any of the moment of the image loading life cycle
