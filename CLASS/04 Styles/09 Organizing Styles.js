/*
In the component folder, add a new file 'styles.js'
*/

//styles.js
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default styles;

//AppText.js
import React from "react";
import { Text } from "react-native";
import styles from "./styles";

export function AppText(props) {
  return <Text style={styles.text}>{props.children}</Text>;
}

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
