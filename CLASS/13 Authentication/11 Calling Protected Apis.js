/*
We want to see how we can implement calling protected apis in code by passing our token to every requests we make
*/

//backend - auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // We look for a header called 'x-auth-token'
  const token = req.header("x-auth-token");
  console.log("token", token);
  if (!token)
    return res.status(401).send({ error: "Access denied. No token provided." });

  try {
    const payload = jwt.verify(token, "jwtPrivateKey");
    console.log("payload", payload);
    req.user = payload;
    next();
  } catch (err) {
    res.status(400).send({ error: "Invalid token." });
  }
};

//client.js
import { create } from "apisauce";
import cache from "../utility/cache";
import storage from "../auth/storage";

const apiClient = create({
  // baseURL: "http://192.168.1.153:9000/api",
  baseURL: "http://192.168.43.239:9000/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await storage.getToken();
  if (!authToken) {
    return;
  } else {
    // d backend expect a header with the name 'x-auth-token' which we provided here
    request.headers["x-auth-token"] = authToken;
  }
});

/*Ds implementation will cache every get request, but in ur app, ds might not make sense*/
const get = apiClient.get;
//We make d request
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  // if the api call is a success, we store it in cache and return d api response
  if (response.ok) {
    await cache.store(url, response.data);
    return response;
  } else {
    //If u get to d point, it means the call to the server failed for any reason so we want to look for the data in d cache
    const data = await cache.get(url);
    return data ? { ok: true, data } : response;
  }
};

export default apiClient;
