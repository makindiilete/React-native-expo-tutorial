/*
Now we want to build our AppCategoryPickerItem component that will display our categories with colorful icons
*/

//AppCategoryPickerItem.js
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
import { AppCategoryPickerItem } from "./AppCategoryPickerItem";
import { AppButton } from "./AppButton";

export function AppPicker({
  icon,
  selectedItem,
  placeholder,
  items,
  onSelectItem,
  width = "100%",
  PickerItemComponent,
  numberOfColumns,
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
            numColumns={numberOfColumns}
            renderItem={({ item }) =>
              PickerItemComponent ? (
                <AppCategoryPickerItem
                  item={item}
                  onPress={() => {
                    setShowModal(false);
                    onSelectItem(item);
                  }}
                />
              ) : (
                <AppPickerItems
                  label={item.label}
                  onPress={() => {
                    setShowModal(false);
                    onSelectItem(item);
                  }}
                />
              )
            }
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

//AppPickerItems.js
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "./AppText";

export function AppPickerItems(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <AppText style={styles.text}> {props.label} </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: { padding: 20 },
});

//AppFormPicker.js
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

//ListingEditScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";
import { AppScreen } from "../Components/AppScreen";
import { AppForm } from "../Components/Forms/AppForm";
import { AppFormField } from "../Components/Forms/AppFormField";
import { AppFormPicker } from "../Components/Forms/AppFormPicker";
import { AppSubmitButton } from "../Components/Forms/AppSubmitButton";
import { AppCategoryPickerItem } from "../Components/AppCategoryPickerItem";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"), //label : the name to refer to d input field i the error msg
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
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
