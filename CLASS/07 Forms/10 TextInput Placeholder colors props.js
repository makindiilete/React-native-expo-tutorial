/*
Currently our Category field placeholder color appears very dark than the other placeholders... We need to set the 'placeholderTextColor' to our AppTextInput component so they appear the same
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

export function AppPicker({
  icon,
  selectedItem,
  placeholder,
  items,
  onSelectItem,
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
        <View style={styles.container}>
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
    width: "100%",
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

//AppTextInput.js
import React from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

export function AppTextInput(props) {
  return (
    <View style={styles.container}>
      {props.icon && (
        <MaterialCommunityIcons
          name={props.icon}
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
        placeholder={props.placeholder}
        placeholderTextColor={colors.medium}
        {...props}
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
    width: "100%",
    marginVertical: 10, // to separate multiple elements on d screen
  },

  textInput: defaultStyles.text,
  icon: {
    marginRight: 10,
  },
});
