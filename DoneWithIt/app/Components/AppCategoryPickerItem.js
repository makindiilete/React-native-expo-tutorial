import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppIcon } from "./AppIcon";
import { AppText } from "./AppText";

export function AppCategoryPickerItem({ onPress, item }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AppIcon
        backgroundColor={item.backgroundColor}
        name={item.icon}
        size={80}
      />
      <AppText style={styles.label}>{item.label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%", //3 icons = 99% space occupied on a row
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
});
