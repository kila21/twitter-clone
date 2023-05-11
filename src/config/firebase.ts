// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUL2EcL84f1KOn4MYAaFs8_9ueUhjYQi8",
  authDomain: "twitter-clone-1e9e1.firebaseapp.com",
  databaseURL: "https://twitter-clone-1e9e1-default-rtdb.firebaseio.com",
  projectId: "twitter-clone-1e9e1",
  storageBucket: "twitter-clone-1e9e1.appspot.com",
  messagingSenderId: "816510181379",
  appId: "1:816510181379:web:90e987b94841e8872e2e36",
  measurementId: "G-XWBH31D65K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)