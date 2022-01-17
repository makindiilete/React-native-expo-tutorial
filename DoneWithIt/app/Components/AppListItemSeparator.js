import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

export function AppListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.light,
  },
});
