/*
1.  We start by creating a new directory 'app' and this will contain our source code... This will be beneficial in future just incase something the project fails, we can simply copy our app code into a new generated project.
2.  Next we move our assets folder into the newly created dir.
3.  We open app.json file and we update the all the assets link since we've moved the assets folder into our newly created dir
4.  Reload the app in the emulator to verify everything still works as expected
5.  Create a new dir inside the 'app' folder named 'screens', this will contain all our screens
6.  Inside the 'screens' dir, add a new file, 'WelcomeScreen.js'
*/

//WelcomeScreen.js
import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Button,
  Image,
  Text,
} from "react-native";

export function WelcomeScreen(props) {
  return (
    //ImageBackground component is used to form a background with an image in react native
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
        <Text>Sell What You Don't Need</Text>
      </View>
      <View style={styles.loginButton} />
      <View style={styles.registerButton} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end", // ds push the buttons (Views) to the bottom of the screen (remember by default d flexDirection :column)
    alignItems: "center", // we need d logo to b in d center so bcos d primary axis is vertical (default), we use ds property to center the logo and other items in d container at the center of d container/screen
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#fc5c65",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#4ecdc4",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute", // bcos d parent container is justified to flex-end to push all items to d bottom of d screen, we need absolute positioning to be able to put the log at the top
    top: 70,
    alignItems: "center",
  },
});
