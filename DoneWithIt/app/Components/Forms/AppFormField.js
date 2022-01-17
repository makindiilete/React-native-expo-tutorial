import React from "react";
import { View, StyleSheet } from "react-native";
import { AppTextInput } from "../AppTextInput";
import { AppError } from "./AppError";
import { useFormikContext } from "formik";

export function AppFormField({ name, width, ...rest }) {
  const {
    setFieldTouched,
    errors,
    touched,
    setFieldValue,
    values,
  } = useFormikContext();
  return (
    <>
      <AppTextInput
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        width={width}
        {...rest}
      />
      <AppError error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
