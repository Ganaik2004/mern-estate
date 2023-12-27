
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b7f0f.firebaseapp.com",
  projectId: "mern-estate-b7f0f",
  storageBucket: "mern-estate-b7f0f.appspot.com",
  messagingSenderId: "406564232931",
  appId: "1:406564232931:web:21b6ad0135f62a4bc3efd6"
};


export const app = initializeApp(firebaseConfig);