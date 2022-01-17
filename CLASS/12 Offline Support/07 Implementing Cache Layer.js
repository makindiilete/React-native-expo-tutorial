/*
1.  In the app folder, add a new folder 'utility'
2.  Inside the folder, add a new file 'cache.js'

NOTE : - To calculate our expiry, we will use moment.js
*/

//cache.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const prefix = "cache";
const expireInMinutes = 5;

// ds function will store our data
const store = async (key, value) => {
  try {
    const item = {
      value: value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (err) {
    console.log(err);
  }
};

function isExpired(item) {
  const now = moment(Date.now()); // d current datetime
  const storedTime = moment(item.timestamp); // d value of the timestamp of the item
  //calculating the different between the two dateTime : -  if the storedTime in minutes is greater than 5mins then the item has expired
  return now.diff(storedTime, "minutes") > expireInMinutes;
}

//ds function will retrieve our data
const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);
    const isExpired = isExpired(item);
    //if the item does not exist
    if (!item) {
      return null;
    }
    // if the item has expired,, we remove it from the cache and return null
    else if (isExpired) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }
    // if we gt here it means we have a valid item so we return it
    else {
      return item.value;
    }
  } catch (err) {
    console.log(err);
  }
};

export default {
  store,
  get,
};
