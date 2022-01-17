import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

export default {
  // We copy all the properties inside the DefaultTheme overriding the colors
  ...DefaultTheme,
  colors: {
    // we copy/spread all the colors available in the default theme overriding the following colors
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white, // d background color to be apply to all screens
  },
};
