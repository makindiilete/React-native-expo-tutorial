/*
With flex, we can build complex layout that consistently look the same across screen sizes... We have the same in css but flexbox in react native is a little bit different...

flex : 1 : - When we set flex to 1, the view grows to take the entire available space...

With flex, we set a view as a container and then align children/elements inside that container...
*/

// 1
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {/*  The container view will b divided into 3 segments, with each view taking 1/3 of the screen*/}
      <View style={{ backgroundColor: "dodgerblue", flex: 1 }} />
      <View style={{ backgroundColor: "gold", flex: 1 }} />
      <View style={{ backgroundColor: "tomato", flex: 1 }} />
    </View>
  );
}

// 2
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {/*  The container view will b divided into 3 segments, with each view taking 1/3 of the screen*/}
      {/*Setting d first view to 2 will make d view to b twice as big as other views*/}
      <View style={{ backgroundColor: "dodgerblue", flex: 2 }} />
      <View style={{ backgroundColor: "gold", flex: 1 }} />
      <View style={{ backgroundColor: "tomato", flex: 1 }} />
    </View>
  );
}
