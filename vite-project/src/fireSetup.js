import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCcXx8_n9hDyezqJ9OvHow6LJUDEfVphts",
  authDomain: "main-pro-c51c8.firebaseapp.com",
  projectId: "main-pro-c51c8",
  storageBucket: "main-pro-c51c8.appspot.com",
  messagingSenderId: "927449551588",
  appId: "1:927449551588:web:49419adb5ae1adcc0712f1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
    app
}
export{
    db
}