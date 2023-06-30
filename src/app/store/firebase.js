import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyC3TfLO1hAhFYVymt4aNiM5uP9LY4fSNx8",
  authDomain: "next-create-app.firebaseapp.com",
  projectId: "next-create-app",
  storageBucket: "next-create-app.appspot.com",
  messagingSenderId: "132742249548",
  appId: "1:132742249548:web:f9c3f3f595ff77670288e9",
  measurementId: "G-81K9SP03C2",
};

// const analytics = getAnalytics(app);

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export {
  app,
  signOut,
  getAuth,
  googleProvider,
  githubProvider,
  facebookProvider,
  getApps,
  signInWithPopup,
  firebaseConfig,
};
