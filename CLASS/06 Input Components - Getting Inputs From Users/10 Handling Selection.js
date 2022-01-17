/*
Now when we tap an item from the modal, the modal should be closed and the selected item should show in the picker
*/

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

export function AppPicker(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
        <View style={styles.container}>
          {props.icon && (
            <MaterialCommunityIcons
              name={props.icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          <AppText style={styles.text}>
            {props.selectedItem ? props.selectedItem.label : props.placeholder}
          </AppText>
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
            data={props.items}
            renderItem={({ item }) => (
              <AppPickerItems
                label={item.label}
                onPress={() => {
                  setShowModal(false);
                  props.onSelectItem(item);
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
    width: "100%",
    marginVertical: 10, // to separate multiple elements on d screen
  },

  textInput: defaultStyles.text,
  text: { flex: 1 },
  icon: {
    marginRight: 10,
  },
});

//AppPickeritems.js
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

//App.js
import React, { useState } from "react";
import { WelcomeScreen } from "./app/screens/WelcomeScreen";
import { SafeAreaView, Switch, Text, TextInput, View } from "react-native";
import { AppCard } from "./app/Components/AppCard";
import { ListingDetailsScreen } from "./app/screens/ListingDetailsScreen";
import { ViewImageScreen } from "./app/screens/ViewImageScreen";
import { MessagesScreen } from "./app/screens/MessagesScreen";
import { AppIcon } from "./app/Components/AppIcon";
import { AppScreen } from "./app/Components/AppScreen";
import { AppListItem } from "./app/Components/AppListItem";
import { AccountScreen } from "./app/screens/AccountScreen";
import { ListingScreen } from "./app/screens/ListingScreen";
import colors from "./app/config/colors";
import { AppTextInput } from "./app/Components/AppTextInput";
import { AppPicker } from "./app/Components/AppPicker";

const categories = [
  { label: "Furniture", value: 1 },
  { label: "Clothing", value: 2 },
  { label: "Camera", value: 3 },
];

export default function App() {
  const [category, setCategory] = useState(categories[0]);

  return (
    <AppScreen>
      <AppPicker
        selectedItem={category}
        onSelectItem={(item) => setCategory(item)}
        items={categories}
        icon="apps"
        placeholder="Category"
      />
      <AppTextInput icon="email" placeholder="Email" />
    </AppScreen>
  );
}
