// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPAHVG4ocUArOtKZx60GJfJfA8fHhlxxI",
  authDomain: "blog-cbcc6.firebaseapp.com",
  projectId: "blog-cbcc6",
  storageBucket: "blog-cbcc6.appspot.com",
  messagingSenderId: "299650597395",
  appId: "1:299650597395:web:f52be599b1b871ef63b5e6",
  measurementId: "G-MLPQCP0QZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
