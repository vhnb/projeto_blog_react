
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPkerWvmdQaPGJ3aoKVI-rgdQVnlzE_V0",
  authDomain: "miniblog-ee744.firebaseapp.com",
  projectId: "miniblog-ee744",
  storageBucket: "miniblog-ee744.appspot.com",
  messagingSenderId: "951881100120",
  appId: "1:951881100120:web:87913a6b683330d4ba932d"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db };