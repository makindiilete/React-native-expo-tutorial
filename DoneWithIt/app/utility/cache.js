import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { log } from "./logger";

const prefix = "cache";
const expireInMinutes = 60;

// ds function will store our data
const store = async (key, value) => {
  try {
    const item = {
      value: value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (err) {
    // console.log(err);
    log(err);
  }
};

const isExpired = (item) => {
  const now = moment(Date.now()); // d current datetime
  const storedTime = moment(item.timestamp); // d value of the timestamp of the item
  //calculating the different between the two dateTime : -  if the storedTime in minutes is greater than 5mins then the item has expired
  return now.diff(storedTime, "minutes") > expireInMinutes;
};

//ds function will retrieve our data
const get = async (key) => {
  // console.log("Key = ", prefix + key);
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);
    //if the item does not exist
    if (!item) {
      return null;
    }
    // if the item has expired,, we remove it from the cache and return null
    else if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }
    // if we gt here it means we have a valid item so we return it
    else {
      return item.value;
    }
  } catch (err) {
    // console.log(err);
    log(err);
  }
};

export default {
  store,
  get,
};
