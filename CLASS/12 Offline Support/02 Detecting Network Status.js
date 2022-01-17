/*
To detect if a user is offline and notify them, we use the 'netinfo' api in expo

1.  expo install @react-native-community/netinfo
*/

//Method 1 Using NetInfo
import React from "react";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  NetInfo.fetch().then((netInfo) => console.log(netInfo));
  return null;
}

/*
Response from netInfo : -

 "details": Object {
    "bssid": null,
    "ipAddress": "192.168.1.153",
    "isConnectionExpensive": false,
    "ssid": null,
    "subnet": "255.255.255.0",
  },
  "isConnected": true,
  "isInternetReachable": true,
  "type": "wifi",
}


Some people only use the 'isConnected' property for network status but for a reliable network check, you need to combine both the 'isConnected' & 'isInternetReachable' properties... The isInternetReachable property is determine by netInfo trying to access a remote server e.g. google.com..

NOTE : - The netInfo method is good but not that reliable because it checks for the network status only once not continuously so it might not be able to pick up updated status if there is a change in network condition...
*/

//METHOD 2 : -
import React from "react";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  NetInfo.addEventListener((netInfo) => console.log(netInfo));
  return null;
}

// 3 - NetInfo Hook
import React from "react";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { Text, View } from "react-native";
import { AppScreen } from "./app/Components/AppScreen";

export default function App() {
  const netInfo = useNetInfo();

  return netInfo.isInternetReachable ? (
    <AppScreen>
      <Text> Connected</Text>
    </AppScreen>
  ) : (
    <AppScreen>
      <Text> Not Connected</Text>
    </AppScreen>
  );
}

// 4
import React from "react";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { Text, View } from "react-native";
import { AppScreen } from "./app/Components/AppScreen";
import { AppButton } from "./app/Components/AppButton";

export default function App() {
  const netInfo = useNetInfo();

  return (
    <AppScreen>
      <AppButton title={!netInfo.isInternetReachable ? "Offline" : "Online"} />
    </AppScreen>
  );
}
