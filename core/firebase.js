// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCrs2LimqpU-NmeiIo4aSqLFE_AUVRCe4",
  authDomain: "rnchatapp-4fc69.firebaseapp.com",
  projectId: "rnchatapp-4fc69",
  storageBucket: "rnchatapp-4fc69.appspot.com",
  messagingSenderId: "469717751762",
  appId: "1:469717751762:web:247a83d896f1f8e65bda0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export {firestore, auth, storage};