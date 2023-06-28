// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3TfLO1hAhFYVymt4aNiM5uP9LY4fSNx8",
  authDomain: "next-create-app.firebaseapp.com",
  projectId: "next-create-app",
  storageBucket: "next-create-app.appspot.com",
  messagingSenderId: "132742249548",
  appId: "1:132742249548:web:f9c3f3f595ff77670288e9",
  measurementId: "G-81K9SP03C2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
