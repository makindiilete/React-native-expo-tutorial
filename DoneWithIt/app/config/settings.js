import Constants from "expo-constants";

const settings = {
  dev: {
    // apiUrl: "http://192.168.227.126:9000/api",
    apiUrl: "https://desolate-tundra-08896.herokuapp.com/api",
  },
  staging: {
    apiUrl: "https://desolate-tundra-08896.herokuapp.com/api",
  },
  prod: {
    apiUrl: "https://desolate-tundra-08896.herokuapp.com/api",
  },
};

export const getCurrentSettings = () => {
  // ds returns true if we are in dev env.. _DEV_ comes from react native
  if (__DEV__) {
    return settings.dev;
  }
  // Constants.manifest.releaseChannel : - with ds we can build our app for staging or prod
  else if (Constants.manifest.releaseChannel === "staging") {
    return settings.staging;
    // if we get here it means we r in production env
  } else {
    return settings.prod;
  }
};
