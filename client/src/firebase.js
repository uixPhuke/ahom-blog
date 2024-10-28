// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-12a35.firebaseapp.com",
  projectId: "mern-blog-12a35",
  storageBucket: "mern-blog-12a35.appspot.com",
  messagingSenderId: "937544950234",
  appId: "1:937544950234:web:f411532dacca1cd379a0e3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
