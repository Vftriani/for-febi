import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { addDoc, collection, getDocs, getFirestore, orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvBLCr7G3SysrWl-1FYit9b9pIbTkK8cM",
  authDomain: "for-febi.firebaseapp.com",
  projectId: "for-febi",
  storageBucket: "for-febi.firebasestorage.app",
  messagingSenderId: "732521205366",
  appId: "1:732521205366:web:508164c63315dfdd775957",
  measurementId: "G-TQ7PVQKQ6B"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { addDoc, collection, getDocs, orderBy, query };

