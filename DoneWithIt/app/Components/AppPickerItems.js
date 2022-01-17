import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "./AppText";

export function AppPickerItems(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <AppText style={styles.text}> {props.label} </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: { padding: 20 },
});
