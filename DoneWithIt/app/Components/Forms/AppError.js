import React from "react";
import { View, StyleSheet, Text } from "react-native";

export function AppError({ error, visible }) {
  if (!visible || !error) return null;
  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: { color: "red" },
});
