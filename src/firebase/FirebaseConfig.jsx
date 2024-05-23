// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnSWxLZx_HNWUH5JvpWdDxlN2v75IPvC8",
  authDomain: "hamd-ecom.firebaseapp.com",
  projectId: "hamd-ecom",
  storageBucket: "hamd-ecom.appspot.com",
  messagingSenderId: "579132184492",
  appId: "1:579132184492:web:8cb5474b18f2fef8c84c09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}