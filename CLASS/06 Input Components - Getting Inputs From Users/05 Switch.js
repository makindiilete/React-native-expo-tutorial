/*

We use the switch component for a boolean value and it automatically changes the look depending on the OS we are running on
 */

//Switch.js
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

export default function App() {
  const [isNew, setIsNew] = useState(false);

  return (
    <AppScreen>
      <Switch value={isNew} onValueChange={(newValue) => setIsNew(newValue)} />
    </AppScreen>
  );
}
