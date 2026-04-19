import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Casa Burger Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDRXbUyiVEe3wXzohJWzZuBlIzHN0A6Yk",
  authDomain: "casa-burger-4fe1e.firebaseapp.com",
  projectId: "casa-burger-4fe1e",
  storageBucket: "casa-burger-4fe1e.firebasestorage.app",
  messagingSenderId: "731977589023",
  appId: "1:731977589023:web:75ed7c5d1d002ac004902a",
  measurementId: "G-1087ZTX0TX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
