/*
For our price field, we will only be entering numbers of 8 characters so it does not make sense to use 100% width that we are using for other fields for the price as well...
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
          width={120} // to set the width of the price field not to take 100%
        />
        <AppFormPicker
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

//AppFormField.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { AppTextInput } from "../AppTextInput";
import { AppError } from "./AppError";
import { useFormikContext } from "formik";

export function AppFormField({ name, width, ...rest }) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();
  return (
    <>
      <AppTextInput
        onChangeText={handleChange(name)}
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

//AppTextInput.js
import React from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

export function AppTextInput({ icon, width = "100%", ...others }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      {/*
      '...props' ==> auto apply all the props that is passed to this TextInput which are not explicitly specified here
      */}
      <TextInput
        style={styles.textInput}
        placeholderTextColor={colors.medium}
        {...others}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 25,
    padding: 15,
    // width: "100%",
    marginVertical: 10, // to separate multiple elements on d screen
  },

  textInput: defaultStyles.text,
  icon: {
    marginRight: 10,
  },
});

//AppFormPicker.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { AppPicker } from "../AppPicker";
import { useFormikContext } from "formik";
import { AppError } from "./AppError";

export function AppFormPicker({ name, items, width, placeholder }) {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
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

//AppPicker.js
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import { AppText } from "./AppText";
import { AppScreen } from "./AppScreen";
import { AppPickerItems } from "./AppPickerItems";

export function AppPicker({
  icon,
  selectedItem,
  placeholder,
  items,
  onSelectItem,
  width = "100%",
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={showModal} animationType="slide">
        <AppScreen>
          <Button title="Close" onPress={() => setShowModal(false)} />
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <AppPickerItems
                label={item.label}
                onPress={() => {
                  setShowModal(false);
                  onSelectItem(item);
                }}
              />
            )}
            keyExtractor={(item) => item.value}
          />
        </AppScreen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 25,
    padding: 15,
    // width: "100%",
    marginVertical: 10, // to separate multiple elements on d screen
  },
  textInput: defaultStyles.text,
  placeholder: {
    flex: 1,
    color: colors.medium,
  },
  text: { flex: 1 },
  icon: {
    marginRight: 10,
  },
});
