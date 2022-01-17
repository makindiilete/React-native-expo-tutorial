import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const addListings = (listing, onUploadProgress) => {
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
  return client.post(endpoint, data, {
    onUploadProgress: (progressEvent) =>
      onUploadProgress(
        Math.floor((progressEvent.loaded / progressEvent.total) * 100)
      ),
  });
};

export default {
  addListings,
  getListings,
};
