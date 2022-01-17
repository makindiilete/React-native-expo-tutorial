/*
We want to extend our Api and add functionality to post data to the server...
*/

//listings.js
import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const addListings = (listing) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);
  listing.images.forEach((image, index) => {
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    });
  });
  //our listing can optionally contains a location
  if (listing.location) {
    data.append("location", JSON.stringify(listing.location));
  }
  return client.post(endpoint, data);
};

export default {
  addListings,
  getListings,
};
