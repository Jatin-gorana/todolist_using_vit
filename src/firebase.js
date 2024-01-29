// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmFWtnKhk6Di7gBYHhHK8FzBR5rLlggQ0",
  authDomain: "todo-app-44a5a.firebaseapp.com",
  projectId: "todo-app-44a5a",
  storageBucket: "todo-app-44a5a.appspot.com",
  messagingSenderId: "235906372780",
  appId: "1:235906372780:web:69d5256cf424bfe78e3b09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);