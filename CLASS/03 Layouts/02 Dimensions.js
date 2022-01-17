/*
When setting dimensions of elements on the screen, we often using width and height... In web app, we can set them as pixels e.g. '50px' but in mobile app, we simply set the number without adding any 'px' so we can have : -  width : 50, height : 100... This numbers are set to the mobile phone DPI and with this the element will look almost the same on all screen sizes
*/

import React from "react";
import { SafeAreaView, View } from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView>
      <View
        style={{ backgroundColor: "dodgerblue", width: 150, height: 70 }}
      ></View>
    </SafeAreaView>
  );
}

/*
Percentage : -  We can also set them as a percentage of the entire screen e.g. width : '50%' will make the width of the element take 50% of the phone screen... When using percentage, it must be in quotes as string
*/

import React from "react";
import { SafeAreaView, View } from "react-native";

export default function App() {
  const handleLongPress = console.log("Text long pressed");
  return (
    <SafeAreaView>
      <View
        style={{ backgroundColor: "dodgerblue", width: "50%", height: 70 }}
      ></View>
    </SafeAreaView>
  );
}

/*
Dimensions API : -  We can use these API to get the value of the screen/window dimensions and then we can set our width and height using this values..
Window : - This return the dimension value of the visible application window
Screen : - This return the diemension value of the entire screen
NOTE : - on iOS both Window and Screen dimensions are equal, they are only different on android.. On Android, the window size is a bit smaller than the screen size
NOTE : - By default, the dimensions value does not get updated if we rotate the screen, it stays the same but there is a workaround which we will talk about in the next lesson which is the 'useDimensions()' hook
*/

//ios
import React from "react";
import { Dimensions, SafeAreaView, View } from "react-native";

export default function App() {
  console.log("Screen dimensions = ", Dimensions.get("screen"));
  console.log("Window dimensions = ", Dimensions.get("window"));
  return (
    <SafeAreaView>
      <View
        style={{ backgroundColor: "dodgerblue", width: "50%", height: 70 }}
      ></View>
    </SafeAreaView>
  );
}

/*
Screen dimensions =  Object {
  "fontScale": 1,
  "height": 896,
  "scale": 2, // every point on d screen is 2px
  "width": 414,
}
Window dimensions =  Object {
  "fontScale": 1,
  "height": 896,
  "scale": 2,
  "width": 414,
}

*/
