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
