import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChUz5sOs10bkSadcEV61jH2gBqEExt3Og",
  authDomain: "arcade-manage.firebaseapp.com",
  projectId: "arcade-manage",
  storageBucket: "arcade-manage.appspot.com",
  messagingSenderId: "659337956985",
  appId: "1:659337956985:web:01b2df7778d58fbba40ea8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);