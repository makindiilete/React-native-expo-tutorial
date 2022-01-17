import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Button,
  Image,
  Text,
  Platform,
} from "react-native";
import { AppButton } from "../Components/AppButton";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import routes from "../navigation/routes";

export function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    //ImageBackground component is used to form a background with an image in react native
    <ImageBackground
      blurRadius={Platform.OS === "ios" ? 10 : 5}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
        <Text style={styles.tagLine}>Sell What You Don't Need</Text>
      </View>
      <View style={styles.buttons}>
        <AppButton
          title="LOGIN"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title="REGISTER"
          color={colors.secondary}
          registerButton
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end", // ds push the buttons (Views) to the bottom of the screen (remember by default d flexDirection :column)
    alignItems: "center", // we need d logo to b in d center so bcos d primary axis is vertical (default), we use ds property to center the logo and other items in d container at the center of d container/screen
  },
  buttons: {
    paddingHorizontal: 20,
    width: "100%",
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
  tagLine: {
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 20,
  },
});
