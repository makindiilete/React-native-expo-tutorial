import React from "react";
import { Text } from "react-native";
import defaultStyles from "../config/styles";

export function AppText({ style, children, ...rest }) {
  //We merge the defined styles here with the one passed from props
  return (
    <Text style={[defaultStyles.text, style]} {...rest}>
      {children}
    </Text>
  );
}
