import React from "react";
import { View, StyleSheet } from "react-native";
import { AppButton } from "../AppButton";
import { useFormikContext } from "formik";

export function AppSubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();
  return <AppButton title={title} onPress={handleSubmit} />;
}
