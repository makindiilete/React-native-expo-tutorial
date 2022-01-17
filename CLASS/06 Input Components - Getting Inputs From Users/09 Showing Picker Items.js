/*
Now we want to render a list of items inside our modal
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
          <AppText style={styles.text}>{props.placeholder}</AppText>
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
                onPress={() => console.log(item)}
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
