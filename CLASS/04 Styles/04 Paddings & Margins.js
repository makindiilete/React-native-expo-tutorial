//Padding
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
          padding: 20, //applies padding on all sides
          paddingHorizontal: 20, //applies padding on the left and right
          paddingLeft: 10, // applies padding to d left hand side of the container
        }}
      >
        <View
          style={{
            backgroundColor: "gold",
            width: 50,
            height: 50,
          }}
        />
      </View>
    </View>
  );
}

//Margin
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
          padding: 20, //applies padding on all sides
          paddingHorizontal: 20, //applies padding on the left and right
          paddingLeft: 10, // applies padding to d left hand side of the container
        }}
      >
        <View
          style={{
            backgroundColor: "gold",
            width: 50,
            height: 50,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "tomato",
          width: 100,
          height: 100,
          margin: 20, // margins on all sizes
        }}
      />
    </View>
  );
}
