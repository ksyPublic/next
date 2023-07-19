import { initializeApp, getApps, FirebaseError } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getFirestore, collection, doc, getDoc, getDocs } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  getRedirectResult,
  signInWithRedirect,
  signInWithCustomToken,
} from "firebase/auth";


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID}`,
  appId: `${process.env.NEXT_PUBLIC_APP_ID}`,
  measurementId: `${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`,
};

// const analytics = getAnalytics(app);

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

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
  createUserWithEmailAndPassword, 
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  FirebaseError,
  initializeAppCheck,
  ReCaptchaV3Provider,
  getRedirectResult,
  signInWithRedirect,
  auth,
  db,
  collection, 
  doc,
  getDoc,
  getDocs,
  signInWithCustomToken
};
