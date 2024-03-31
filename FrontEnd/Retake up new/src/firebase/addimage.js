// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtaQSamyKvh1OhcoOaT33PAubrfBgW9GY",
  authDomain: "upload-cb0be.firebaseapp.com",
  projectId: "upload-cb0be",
  storageBucket: "upload-cb0be.appspot.com",
  messagingSenderId: "650871893807",
  appId: "1:650871893807:web:a10b610a7525ae0fbc3bda"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDZlCLoqN9YgGoUQq6h4PhSU0jdfXyV6bY",
//   authDomain: "alogin-34427.firebaseapp.com",
//   projectId: "alogin-34427",
//   storageBucket: "alogin-34427.appspot.com",
//   messagingSenderId: "493260224669",
//   appId: "1:493260224669:web:24a7ace7ffaeae90343c74",
//   measurementId: "G-T7180BR387"
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);