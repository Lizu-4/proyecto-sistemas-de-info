// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {} from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsWDu8IIAqZGHrjG7T-M6vB-fBdlJrMFM",
  authDomain: "proyecto-sistemas-de-inf-7d282.firebaseapp.com",
  projectId: "proyecto-sistemas-de-inf-7d282",
  storageBucket: "proyecto-sistemas-de-inf-7d282.appspot.com",
  messagingSenderId: "228314930726",
  appId: "1:228314930726:web:7849e531f65f6bb13b10e7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();