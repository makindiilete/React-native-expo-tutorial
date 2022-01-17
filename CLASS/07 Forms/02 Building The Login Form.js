/*
Now that we have all our inputs ready, we will start by building our Login Screen. Inside the 'Screen' folder, we add a new file 'LoginScreen.js'
*/

//LoginScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput, Text } from "react-native";
import { AppScreen } from "../Components/AppScreen";
import { AppTextInput } from "../Components/AppTextInput";
import { AppButton } from "../Components/AppButton";

export function LoginScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <AppScreen style={styles.container}>
      <Image source={require("../assets/logo-red.png")} style={styles.logo} />
      {/*
      textContentType : - iOS will autofill with keychain
      */}
      <AppTextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCorrect={false}
        icon="email"
        keyboardType="email-address"
        placeholder="Email"
        textContentType="emailAddress"
      />
      <AppTextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        autoCorrect={false}
        icon="lock"
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
      />
      <AppButton title="Login" onPress={() => console.log(email, password)} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

//
