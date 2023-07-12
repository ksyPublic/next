// src/service/auth.js
import {
  getAuth,
  githubProvider,
  googleProvider,
  facebookProvider,
} from "./firebase";

const firebaseAuth = getAuth();
const getProvider = (name: any) => {
  switch (name) {
    case "Google":
      return googleProvider;
    case "Github":
      return githubProvider;
    case "Facebook":
      return facebookProvider;
    default:
      throw new Error(`${name} is unknown provider.`);
  }
};

export { getProvider, firebaseAuth };
