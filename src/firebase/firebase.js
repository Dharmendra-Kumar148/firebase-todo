// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyAQgjkHGG0fKDVj18GLQorC7t5gjy_p_uA",
  authDomain: "fire-todo-d7bbf.firebaseapp.com",
  projectId: "fire-todo-d7bbf",
  storageBucket: "fire-todo-d7bbf.firebasestorage.app",
  messagingSenderId: "196947449706",
  appId: "1:196947449706:web:33514644ad4cbf548a7713",
  measurementId: "G-80CEE5NXJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export {app, db ,auth};