/*
For calling our apis, we will be using a library called 'apisauce' which is a wrapper around axios...
One of the major advantage of it is because the promise always resolve whether there is an error or not so we do not need to wrap our code with try....catch to catch error, we just need to check the response of the api call to confirm is there is an error or not...

1.  npm i apisauce
2.  Add a new folder inside the app folder 'api' which will contain all the code for talking to our backend
3.  Inside the api folder, add a new file 'client.js'
*/

//client.js
import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.43.239:9000/api",
});

//get request with apiSauce
apiClient.get("/listings").then((response) => {
  // instead of a try catch block we check if response.ok is false i.e. an error ocurred and then we log the error using the 'response.problem' property
  if (!response.ok) {
    console.log(response.problem);
  }
});
