/*
Now we want to use the user object property values in our app starting by replacing the hard coded Name and Email in AccountScreen with the value.
*/

//App.js
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { AppOfflineNotice } from "./app/Components/AppOfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";

export default function App() {
  const [user, setUser] = useState();
  return (
    //  We wrap our entire app with ds AuthContext provider and anything we supply to d value prop will be available to the entire components
    //  we pass d user object and the function to set the user
    <AuthContext.Provider value={{ user, setUser }}>
      <AppOfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

//AccountScreen.js
import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { AppScreen } from "../Components/AppScreen";
import { AppListItem } from "../Components/AppListItem";
import colors from "../config/colors";
import { AppIcon } from "../Components/AppIcon";
import { AppListItemSeparator } from "../Components/AppListItemSeparator";
import { useNavigation } from "@react-navigation/native";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";

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
  const { user } = useContext(AuthContext);

  const navigation = useNavigation();

  return (
    <AppScreen style={styles.screen}>
      <View style={styles.container}>
        <AppListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/myAvatar.jpg")}
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
        <AppListItem
          IconComponent={<AppIcon name="logout" backgroundColor="#ffe66d" />}
          title="Log Out"
          style={{ backgroundColor: "white" }}
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
