/*
Let see how to make use of AsyncStorage in expo : -

1.  expo install @react-native-async-storage/async-storage@1.13.4
*/

//App.js
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const demo = async () => {
    try {
      await AsyncStorage.setItem("Person", JSON.stringify({ id: 1 }));
      const value = await AsyncStorage.getItem("Person");
      const person = JSON.parse(value);
      console.log(person);
    } catch (e) {
      console.log(e);
    }
  };

  demo();

  return null;
}
/*
Object {
  "id": 1,
}
*/
