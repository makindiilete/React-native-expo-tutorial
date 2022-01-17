/*
TextInput : - This is the <input> tag we have in web app and it contains various props we can use for input manipulations

PROPS : -

1.  maxLength : - Maximum allowed character
2.  keyboardType : - This is the type of keyboard we want to display e.g. 'numeric' for entering phone number
3.  clearButtonMode : - This only works on iOS, you can set this to e.g. 'always' and when u start typing, an 'x' icon appears on the far right of the input field which you can use to clear the entered value
4.  secureTextEntry : boolean : - This changes the value of text type to password

Research on the rest props
*/

import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { AppScreen } from "./app/Components/AppScreen";
import colors from "./app/config/colors";

export default function App() {
  const [firstName, setFirstName] = useState("");

  return (
    <AppScreen>
      <Text>{firstName}</Text>
      <TextInput
        clearButtonMode="always"
        secureTextEntry
        onChangeText={(text) => setFirstName(text)}
        placeholder="First Name"
        style={{
          borderBottomColor: colors.light,
          borderBottomWidth: 1,
        }}
      />
    </AppScreen>
  );
}
