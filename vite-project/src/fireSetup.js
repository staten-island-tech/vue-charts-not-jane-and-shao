import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl07EWkPgvOKsKoLZOPb_FmUxVqdyuq5A",
  authDomain: "sithsbox.firebaseapp.com",
  projectId: "sithsbox",
  storageBucket: "sithsbox.appspot.com",
  messagingSenderId: "740260122779",
  appId: "1:740260122779:web:e50e14e02f208e9419363e"
};


const app = initializeApp(firebaseConfig)


const db = getFirestore(app);

export{
    db
}
