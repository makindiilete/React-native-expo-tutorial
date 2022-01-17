/*
We want to reset our form onsubmit
*/

//AppFormField.js
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

//ListingEditScreen.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";
import { AppScreen } from "../Components/AppScreen";
import { AppForm } from "../Components/Forms/AppForm";
import { AppFormField } from "../Components/Forms/AppFormField";
import { AppFormPicker } from "../Components/Forms/AppFormPicker";
import { AppSubmitButton } from "../Components/Forms/AppSubmitButton";
import { AppFormImagePicker } from "../Components/Forms/AppFormImagePicker";
import useLocation from "../hooks/useLocation";
import listings from "../api/listings";
import { UploadScreen } from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"), //label : the name to refer to d input field i the error msg
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image"), // d error msg to show if the rule is broken
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

export function ListingEditScreen() {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  //ds function receives the current upload progress
  const onUploadProgress = (progress) => {
    setProgress(progress);
  };

  const hideDoneAnimation = () => {
    setUploadVisible(false);
  };

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    // We spread all d properties of our listing then we add our location to it
    // we pass a function also to the addListing post request and ds function will be call by the post api and pass the current upload progress to it
    const result = await listings.addListings(
      { ...listing, location },
      onUploadProgress
    );
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save listing");
    }
    resetForm();
  };
  return (
    <AppScreen style={styles.container}>
      <UploadScreen
        progress={progress}
        visible={uploadVisible}
        onDone={hideDoneAnimation}
      />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormImagePicker name="images" />
        <AppFormField maxLength={255} name="title" placeholder="Title" />
        <AppFormField
          maxLength={8}
          name="price"
          placeholder="Price"
          keyboardType="numeric"
          width={120} // to set the width of the price field not to take 100%
        />
        <AppFormPicker
          numberOfColumns={3}
          PickerItemComponent="AppCategoryPickerItem"
          items={categories}
          placeholder="Category"
          name="category"
          width={"50%"} // to set the width of the picker to 50% of its current size
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
