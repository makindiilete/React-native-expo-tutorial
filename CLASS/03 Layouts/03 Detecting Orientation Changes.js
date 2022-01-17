/*
There are times we will want to detect when the screen orientation changes so we can update our elements accrodingly e.g. When working with a video player.. In portrait mode, we will want the player to take d full width of the screen and the height to be rougly 30% so it stays above the screen but in landscape mode, we will want the player to take the entire screen..

NOTE : - To rotate the iOS emulator screen, press 'cmd + arrow keys'

1). First we need to configure our app tp support both portrait and landscape mode : - Go to app.json file, >> Change the 'orientation' to 'default' for both orientation support, 'portrait' to lock the app to portrait mode only, 'landscape' to lock the app to support landscape mode only...

To detect orientation changes, we will be using a package called react native hooks https://github.com/react-native-community/hooks#usedeviceorientation

2.  Install the library with 'npm install @react-native-community/hooks'
3.  We will use the 'useDimensions' hooks to get the correct dimension of the screen whether we are in portrait mode or landscape mode...
NOTE : - The useDimensions hook is preferred over the dimensions api because everytime we rotate our screen, the dimensions is recalculated...
*/

//useDimensions()
import React from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
import { useDimensions } from "@react-native-community/hooks";

export default function App() {
  const dimensions = useDimensions();
  // or
  const { width, height } = useDimensions().window;
  // or
  const screen = useDimensions().screen;

  console.log("Screen = ", screen);
  console.log("Window width & height = ", width, height);
  return (
    <SafeAreaView>
      <View
        style={{ backgroundColor: "dodgerblue", width: "50%", height: 70 }}
      ></View>
    </SafeAreaView>
  );
}

/*
Screen =  Object {
  "fontScale": 1,
  "height": 414,
  "scale": 2,
  "width": 896,
}
Window width & height =  414 896

*/

//useDeviceOrientation : - Get the current orientation
import React from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";

export default function App() {
  const orientation = useDeviceOrientation();

  console.log("is orientation portrait: ", orientation.portrait);
  console.log("is orientation landscape: ", orientation.landscape);
  return (
    <SafeAreaView>
      <View
        style={{ backgroundColor: "dodgerblue", width: "50%", height: 70 }}
      ></View>
    </SafeAreaView>
  );
}

/*
is orientation portrait:  false
is orientation landscape:  true
*/

// Resize the video player depending on the orientation
import React from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";

export default function App() {
  const { landscape } = useDeviceOrientation();
  return (
    <SafeAreaView>
      {/*  If we are in landscape mode, we take the entire screen by setting height to 100% since width is already 100% else height will be 30%*/}
      <View
        style={{
          backgroundColor: "dodgerblue",
          width: "100%",
          height: landscape ? "100%" : "30%",
        }}
      />
    </SafeAreaView>
  );
}
