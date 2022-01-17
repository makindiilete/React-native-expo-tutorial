import React from "react";
import { View, StyleSheet } from "react-native";
import { AppPicker } from "../AppPicker";
import { useFormikContext } from "formik";
import { AppError } from "./AppError";

export function AppFormPicker({
  name,
  items,
  width,
  placeholder,
  PickerItemComponent,
  numberOfColumns = 1,
}) {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
        numberOfColumns={numberOfColumns}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
        width={width}
      />
      <AppError error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
