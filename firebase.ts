// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGMxR5G1DEVDElaxPZcSyrCaoiSeXR46E",
  authDomain: "novi-note-app-e1a08.firebaseapp.com",
  projectId: "novi-note-app-e1a08",
  storageBucket: "novi-note-app-e1a08.firebasestorage.app",
  messagingSenderId: "384223467342",
  appId: "1:384223467342:web:138c5eff6a81aa2635f01f",
  measurementId: "G-HTRFPZN98B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app); 