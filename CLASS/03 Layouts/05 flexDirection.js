/*
By default, react native vertically align items in a container because we always hold our phone in portrait mode (vertically) unlike web where our laptop is always in landscape mode...
*/

//flexDirection : row (items laid out horizontally from left to right)
// primaryAxis = horizontal, secondaryAxis = vertical
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    // to lay items horizontally, we set d flexDirection property to row inside the container the house d laid out elements
    <View style={{ backgroundColor: "#fff", flexDirection: "row" }}>
      <View
        style={{ backgroundColor: "dodgerblue", width: 100, height: 100 }}
      />
      <View style={{ backgroundColor: "gold", width: 100, height: 100 }} />
      <View style={{ backgroundColor: "tomato", width: 100, height: 100 }} />
    </View>
  );
}

// flexDirection : row-reverse (items laid out horizontally from right to left)
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ backgroundColor: "#fff", flexDirection: "row-reverse" }}>
      <View
        style={{ backgroundColor: "dodgerblue", width: 100, height: 100 }}
      />
      <View style={{ backgroundColor: "gold", width: 100, height: 100 }} />
      <View style={{ backgroundColor: "tomato", width: 100, height: 100 }} />
    </View>
  );
}

//flexDirection : "column-reverse"
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    // to lay items horizontally, we set d flexDirection property to row inside the container the house d laid out elements
    <View style={{ backgroundColor: "#fff", flexDirection: "column-reverse" }}>
      <View
        style={{ backgroundColor: "dodgerblue", width: 100, height: 100 }}
      />
      <View style={{ backgroundColor: "gold", width: 100, height: 100 }} />
      <View style={{ backgroundColor: "tomato", width: 100, height: 100 }} />
    </View>
  );
}

//flexDirection : "column" (The default)
// primaryAxis = vertical, secondaryAxis = horizontal
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    // to lay items horizontally, we set d flexDirection property to row inside the container the house d laid out elements
    <View
      style={{
        backgroundColor: "#fff",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <View
        style={{ backgroundColor: "dodgerblue", width: 100, height: 100 }}
      />
      <View style={{ backgroundColor: "gold", width: 100, height: 100 }} />
      <View style={{ backgroundColor: "tomato", width: 100, height: 100 }} />
    </View>
  );
}
