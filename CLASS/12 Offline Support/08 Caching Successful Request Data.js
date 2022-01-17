/*
We want to implement caching our response.. So when we fetch data from the api, we store it in the cache and later when we call the server and we get a failure, we load the data stored in the cache...

We will implement our caching logic inside our client.js file.. We do not want to implement it inside the listing.js api file so that if we want to cache messages or another stuff in the future, we wont have to duplicate and move codes around
*/

//client.js
import { create } from "apisauce";
import cache from "../utility/cache";

const apiClient = create({
  // baseURL: "http://192.168.1.153:9000/api",
  baseURL: "http://192.168.43.239:9000/api",
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

/*
To test the cache, turn off your backend server and reload the app, we see we still have the listing list even though the image is no longer there... We will see how to cache the images in the next lesson
*/
