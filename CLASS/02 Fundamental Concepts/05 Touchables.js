/*
We can make any component touchable i.e. We can add a click event to any component so we can perform an action when clicked/pressed... We can achieve this using the 'Touchable' component...

We have three types of touchable component and the one we choose will depend on the type of feedback we want to give to our users : -
1.  Touchable Highlight : - The background of the image gets darkened for a fraction of a second
2.  TouchableOpacity : - This gives us an opacity feedback when tapped, the opacity is reduced so we can see the background behind the image
3.  TouchableWithoutFeedback : - This does not give us any visual feedback when tapped
4.  TouchableNativeFeedback : - This is only supported on android OS.. It does not work with images but with views that has a background. This gives a kind of ripple effect...
*/

//TouchableWithoutFeedback
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello React Native</Text>
      <TouchableWithoutFeedback onPress={() => console.log("Image tapped")}>
        <Image
          resizeMode="cover"
          blurRadius={5}
          source={{
            width: 200,
            height: 300,
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </TouchableWithoutFeedback>
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

//TouchableOpacity
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello React Native</Text>
      <TouchableOpacity onPress={() => console.log("Image tapped")}>
        <Image
          resizeMode="cover"
          blurRadius={5}
          source={{
            width: 200,
            height: 300,
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </TouchableOpacity>
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

//TouchableHighlight
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello React Native</Text>
      <TouchableHighlight onPress={() => console.log("Image tapped")}>
        <Image
          resizeMode="cover"
          blurRadius={5}
          source={{
            width: 200,
            height: 300,
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </TouchableHighlight>
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

//TouchableNativeFeedback
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello React Native</Text>
      <TouchableNativeFeedback onPress={() => console.log("Image tapped")}>
        <View style={{ width: 200, height: 200, backgroundColor: "red" }} />
      </TouchableNativeFeedback>
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
