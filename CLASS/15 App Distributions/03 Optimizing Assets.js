/* 
We need to ensure we include only the assets we need when the app render else every asset will increase the size of our app... Anything dt is not essential should be downloaded over the internet e.g. User profile images which we might have used a image stored locally before as a placeholder but now we store it on the backend and fetch it there..

The remaining assets needed to be optimized with npm plugin 'sharp'..
npm i -g sharp-cli

Next run 'npx expo-optimize' inside the project root this libary uses sharp behind the scene to reduce the size of our images
*/