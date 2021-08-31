// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqxc8LTs_XT95yvymWmKa1qEUxGB6xmtQ",
  authDomain: "codematic-shared-environment.firebaseapp.com",
  databaseURL: "https://codematic-shared-environment-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "codematic-shared-environment",
  storageBucket: "codematic-shared-environment.appspot.com",
  messagingSenderId: "749119130796",
  appId: "1:749119130796:web:b12c36c895f93f49eb2309",
  measurementId: "G-D5WKWS3QK0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
