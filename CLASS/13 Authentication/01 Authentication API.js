/*
We will be testing our authentication node API with postman...
We then connect it to the frontend in our api layer
1.  Create a new file in the 'api' folder called 'auth.js'
*/

//auth.js
import client from "./client";

const endpoint = "/auth";

const login = (email, password) => client.post(endpoint, { email, password });

export default {
  login,
};
