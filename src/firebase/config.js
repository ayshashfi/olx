import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7NjWaupfYvTYdV4XLrK0G7KJEyuYyEEg",
  authDomain: "olx-clone-a4c53.firebaseapp.com",
  projectId: "olx-clone-a4c53",
  storageBucket: "olx-clone-a4c53.appspot.com",
  messagingSenderId: "681695236628",
  appId: "1:681695236628:web:063cb81b0d80e635558d01",
  measurementId: "G-B4PSRFEYQC",
  databaseURL: "https://olx-clone-a4c53-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();