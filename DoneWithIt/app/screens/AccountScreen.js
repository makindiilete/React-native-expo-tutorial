import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { AppScreen } from "../Components/AppScreen";
import { AppListItem } from "../Components/AppListItem";
import colors from "../config/colors";
import { AppIcon } from "../Components/AppIcon";
import { AppListItemSeparator } from "../Components/AppListItemSeparator";
import { useNavigation } from "@react-navigation/native";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];
export function AccountScreen() {
  //we get the user object from the authContext so we can get d name and email
  const { user, logOut } = useAuth();

  const navigation = useNavigation();

  return (
    <AppScreen style={styles.screen}>
      <View style={styles.container}>
        <AppListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/mosh.jpg")}
          style={{ backgroundColor: "white" }}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItems) => menuItems.title.toString()}
          ItemSeparatorComponent={AppListItemSeparator}
          renderItem={({ item }) => (
            <AppListItem
              IconComponent={
                <AppIcon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              title={item.title}
              style={{ backgroundColor: "white" }}
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <View style={styles.container}>
        {/*  We set the user to null when we click the logOut button*/}
        <AppListItem
          IconComponent={<AppIcon name="logout" backgroundColor="#ffe66d" />}
          title="Log Out"
          style={{ backgroundColor: "white" }}
          onPress={() => logOut()}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 10,
  },
});
