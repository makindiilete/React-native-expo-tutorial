import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import Constants from "expo-constants/src/Constants";

export function AppScreen(props) {
  return (
    <SafeAreaView style={[styles.screen, props.style]}>
      {/*D SafeAreaView does not supports padding so we apply the padding we passed from the style prop also to a view that wraps the component passed as props.children*/}
      <View style={[props.style, styles.view]}>{props.children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1, // we make ds component take the entire screen so our pull to refresh will not b cut off when we pull down
  },
  view: {
    flex: 1,
  },
});
