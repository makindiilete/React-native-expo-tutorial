import { create } from "apisauce";
import cache from "../utility/cache";
import storage from "../auth/storage";
import { getCurrentSettings } from "../config/settings";

const apiClient = create({
  baseURL: getCurrentSettings().apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await storage.getToken();
  if (!authToken) {
    return;
  } else {
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
