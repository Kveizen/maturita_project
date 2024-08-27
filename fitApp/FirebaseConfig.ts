// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9sueqnMpRTWPd1RKyjw9C1BBfcJx-MfQ",
  authDomain: "fitapp-f664c.firebaseapp.com",
  projectId: "fitapp-f664c",
  storageBucket: "fitapp-f664c.appspot.com",
  messagingSenderId: "137989969720",
  appId: "1:137989969720:web:d6af49c8faae25436c93cd"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)