// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mokiekie-estate.firebaseapp.com",
  projectId: "mokiekie-estate",
  storageBucket: "mokiekie-estate.firebasestorage.app",
  messagingSenderId: "190352346422",
  appId: "1:190352346422:web:ac4033df01c21b02c7b797",
  measurementId: "G-74DJQVKSR5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);