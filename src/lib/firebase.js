// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJarHbkrvGPmhRqDAPxfiKjcYcoNRwiV8",
  authDomain: "testing-testing-2d3ec.firebaseapp.com",
  projectId: "testing-testing-2d3ec",
  storageBucket: "testing-testing-2d3ec.firebasestorage.app",
  messagingSenderId: "208412709983",
  appId: "1:208412709983:web:21660e436f6d07b76ff7ea",
  measurementId: "G-8VGYBNKVNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);