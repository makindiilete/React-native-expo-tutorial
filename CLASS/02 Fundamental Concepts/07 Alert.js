/*
The alert function "alert()" we have on web also works on react native and also it gets mapped to its native component
*/

//Default Alert : - The default alert comes with a title 'Alert' and with a single button "Ok"
import React from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Button
        color="orange"
        title="Click Me"
        onPress={() => alert("Button tapped")}
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

/*
Custom Alert : - We can import the custom Alert component that allows us to customize the alert display... This comes with two methods : - alert and prompt..
alert() : - To display a message : - ds takes 3 params : - title, message, buttons
prompt() : - (Works only on IOS) To ask a question and take a response e.g. We display an alert box with an input field where the user can type into and we can get what the user typed with a callback function... This takes 3 params : - title, message, callBackOrButtons
*/

//Prompt
import React from "react";
import { StyleSheet, SafeAreaView, Button, Alert } from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Button
        color="orange"
        title="Click Me"
        onPress={() =>
          Alert.prompt("My Title", "My Message", (inputEntered) =>
            console.log(inputEntered)
          )
        }
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

//Alert
import React from "react";
import { StyleSheet, SafeAreaView, Button, Alert } from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={styles.container}>
      <Button
        color="orange"
        title="Click Me"
        onPress={() =>
          Alert.alert("My Title", "My Message", [
            {
              text: "Yes",
              onPress: () => console.log("Yes"),
            },
            {
              text: "No",
              onPress: () => console.log("No"),
            },
          ])
        }
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
