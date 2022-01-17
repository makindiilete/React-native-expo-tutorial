/*
On our msgs screen, when we pull down the list to refresh, we see a cut off...This is because our AppScreen which we wrap our MessagesScreen code with, even though we set its flex to one, we have a view inside it which does not grow to take the entire available space... So we need to set this also to one...
*/

//AppScreen.js
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
