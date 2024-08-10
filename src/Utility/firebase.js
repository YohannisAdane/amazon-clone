// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
//authenitication prpose
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAv0Z_QK1wCi7N3oSnJs8hk_4QJ7x0rU8",
  authDomain: "clone-cf921.firebaseapp.com",
  projectId: "clone-cf921",
  storageBucket: "clone-cf921.appspot.com",
  messagingSenderId: "746220907739",
  appId: "1:746220907739:web:e25c0bc4925e8bd19eb0fe",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
