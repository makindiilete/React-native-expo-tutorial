/*
To apply shadows, we have different properties to get this done on iOS and android..

iOS : - To set a shadow on iOS, you set 3 properties : -
shadowColor - d color of d shadow
shadowOffset - an object dt defines d angle of d shadow
shadowOpacity - defines how light or dark d shadow will be (0 - 1)...
shadowRadius - ds make our shadow  softer
*/

//iOS
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "dodgerblue",
          width: 100,
          height: 100,
          shadowColor: "grey",
          shadowOffset: { width: 10, height: 10 },
          shadowOpacity: 1,
          shadowRadius: 10,
        }}
      />
    </View>
  );
}

//android
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "dodgerblue",
          width: 100,
          height: 100,
          elevation: 20,
        }}
      />
    </View>
  );
}
