import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken";

// to store the token in the storage
const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  if (!token) {
    return null;
  } else {
    return jwtDecode(token);
  }
};

// to retrieve the token from storage
const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting auth token ", error);
  }
};

// to remove the token from storage
const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token ", error);
  }
};

export default {
  getUser,
  getToken,
  storeToken,
  removeToken,
};
