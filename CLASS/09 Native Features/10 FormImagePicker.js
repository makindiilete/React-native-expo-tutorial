/*
Just as we added AppFormField and AppFOrmPicker, we want to add our AppFormImagePicker component which will contain our validation
*/

//AppFormImagePicker.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { AppImageInputList } from "../AppImageInputList";
import { AppError } from "./AppError";
import { useFormikContext } from "formik";

export function AppFormImagePicker({ name }) {
  const { setFieldValue, errors, touched, values } = useFormikContext();

  const imageUris = values[name];

  const handleAdd = (selectedImage) => {
    setFieldValue(name, [...imageUris, selectedImage]);
  };

  const handleRemove = (selectedImage) => {
    setFieldValue(
      name,
      imageUris.filter((img) => img !== selectedImage)
    );
  };
  return (
    <>
      <AppImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />

      <AppError error={errors[name]} visible={touched[name]} />
    </>
  );
}
