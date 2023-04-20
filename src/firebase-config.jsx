// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth,GoogleAuthProvider, ProviderId} from 'firebase/auth'
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvrp_2hmeLoohoGvY3QKmsiXnj257qMkw",
  authDomain: "smobili-a8847.firebaseapp.com",
  projectId: "smobili-a8847",
  storageBucket: "smobili-a8847.appspot.com",
  messagingSenderId: "456541818972",
  appId: "1:456541818972:web:353daccad76490c278d699"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);