import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, child, push, update } from "firebase/database";

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID}`,
  appId: `${process.env.NEXT_PUBLIC_APP_ID}`,
  measurementId: `${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`,
  databaseURL: `${process.env.NEXT_PUBLIC_ADMIN_DATABASE_URL}`,
};

// Initialize Firebase
let app;
// Check if any Firebase app already initialized
if (!getApps().length) {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // use the already initialized app
} 

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export {
  database,
  getDatabase,
  ref,
  child,
  push,
  update,
}
