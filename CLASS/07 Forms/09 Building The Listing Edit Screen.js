/*
Now we want to work on our ListingEditScreen
*/

//ListingEditScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";
import { AppScreen } from "../Components/AppScreen";
import { AppForm } from "../Components/Forms/AppForm";
import { AppFormField } from "../Components/Forms/AppFormField";
import { AppFormPicker } from "../Components/Forms/AppFormPicker";
import { AppSubmitButton } from "../Components/Forms/AppSubmitButton";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"), //label : the name to refer to d input field i the error msg
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});

const categories = [
  { label: "Furniture", value: 1 },
  { label: "Clothing", value: 2 },
  { label: "Camera", value: 3 },
];

export function ListingEditScreen() {
  return (
    <AppScreen style={styles.container}>
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField maxLength={255} name="title" placeholder="Title" />
        <AppFormField
          maxLength={8}
          name="price"
          placeholder="Price"
          keyboardType="numeric"
        />
        <AppFormPicker
          items={categories}
          placeholder="Category"
          name="category"
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <AppSubmitButton title="Post" />
      </AppForm>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
});

//AppFormPicker.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { AppPicker } from "../AppPicker";
import { useFormikContext } from "formik";
import { AppError } from "./AppError";

export function AppFormPicker({ name, items, placeholder }) {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
        placeholder={placeholder}
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
      />
      <AppError error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

//AppForm.js
import React, { useState } from "react";
import { Formik } from "formik";

export function AppForm({
  children,
  validationSchema,
  initialValues,
  onSubmit,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => children}
    </Formik>
  );
}
