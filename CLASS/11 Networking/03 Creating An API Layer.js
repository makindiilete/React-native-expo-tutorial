//client.js
import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.43.239:9000/api",
});

export default apiClient;

//api/listings.js
import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

export default {
  getListings,
};
