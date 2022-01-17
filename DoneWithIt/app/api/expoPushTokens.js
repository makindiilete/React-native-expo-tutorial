import client from "./client";

const endpoint = "/expoPushTokens";

// ds function receives the pushToken and pass it to our endpoint
const register = (pushToken) => {
  client.post(endpoint, { token: pushToken });
};

export default {
  register,
};
