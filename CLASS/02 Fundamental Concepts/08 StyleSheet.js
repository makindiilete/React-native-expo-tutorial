//Inline Style
import React from "react";
import { SafeAreaView, Button, Alert } from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={{ backgroundColor: "orange" }}>
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

//Javascript object ref 1
import React from "react";
import { SafeAreaView, Button, Alert } from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={containerStyles}>
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

const containerStyles = { backgroundColor: "orange" };

//Javascript object ref 2 Using the Stylesheet API : - Here we use the 'styleSheet.create()' method...
/*
Since we can use ordinary js object as we did in Javascript object ref 1 and Inline style, why the need for this?
1.  It validates that the properties we are passing are valid so we will get error if we write 'backgroundColor' as 'backgroundColore' but for the other methods, we will get no error but our style will not just work
2.  Using the create() method has been well optimized
*/
import React from "react";
import { StyleSheet, SafeAreaView, Button, Alert } from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={containerStyles}>
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

//Passing multiple styles to a component : - When we have duplicate of the same style property, the style on the right overrides the style on the left
import React from "react";
import { StyleSheet, SafeAreaView, Button, Alert } from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView style={[containerStyles, styles.container]}>
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

const containerStyles = { backgroundColor: "orange" };
const styles = StyleSheet.create({
  container: {
    flex: 1, // takes d entire screen (values from 0 - 1 i.e. 0% - 100%)
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
});

/*
You can also have your styles sperated into different file and import it in the component but its preferrable to have the styles below the component code
*/
