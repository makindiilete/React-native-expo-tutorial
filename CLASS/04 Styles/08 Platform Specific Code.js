/*
We have used the Platform API to render different code depending on the OS we are running on and this is good only if we have one or two styles or code to render but the more the code we want to render on each platform grows, the more our code starts to get messy and unmaintainable
*/

//Method One

//AppText.js
import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";

export function AppText(props) {
  return <Text style={styles.text}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "tomato",
    //ds method returns one of the two objects depending on the platform
    ...Platform.select({
      //ios styles are defined here
      ios: {
        fontSize: 20,
        fontFamily: "Avenir",
      },
      //android styles are defined here
      android: {
        fontSize: 18,
        fontFamily: "Roboto",
      },
    }),
  },
});

//App.js
import React from "react";
import { Text, View } from "react-native";
import { AppText } from "./app/Components/AppText";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
      }}
    >
      <AppText>I love React Native</AppText>
    </View>
  );
}

/*
METHOD 2

We can create different OS files of our AppText.js which is useful if we want to control both the logic and styles

iOS File = AppText.ios.js
Android File = AppText.android.js

We then modify each files but inside the component where we want to use it, we still import 'AppText' as before but react will use each file on its respective OS
*/

//AppText.js
import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";

export function AppText(props) {
  return <Text style={styles.text}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "tomato",
    //ds method returns one of the two objects depending on the platform
    ...Platform.select({
      //ios styles are defined here
      ios: {
        fontSize: 20,
        fontFamily: "Avenir",
      },
      //android styles are defined here
      android: {
        fontSize: 18,
        fontFamily: "Roboto",
      },
    }),
  },
});

//AppText.ios.js
import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";

export function AppText(props) {
  return <Text style={styles.text}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "tomato",
    fontSize: 20,
    fontFamily: "Avenir",
  },
});

//AppText.android.js
import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";

export function AppText(props) {
  return <Text style={styles.text}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "tomato",
    fontSize: 18,
    fontFamily: "Roboto",
  },
});

//App.js
import React from "react";
import { Text, View } from "react-native";
import { AppText } from "./app/Components/AppText";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
      }}
    >
      <AppText>I love React Native</AppText>
    </View>
  );
}
