// src/service/auth.js
import { getAuth, githubProvider, googleProvider } from "./firebase";

const firebaseAuth = getAuth();
const getProvider = (name: any) => {
  switch (name) {
    case "Google":
      return googleProvider;
    case "Github":
      return githubProvider;
    default:
      throw new Error(`${name} is unknown provider.`);
  }
};

export { getProvider, firebaseAuth };
