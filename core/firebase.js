import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    updateDoc,
    deleteDoc,
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Firebase App Config
export const firebaseConfig = {
  apiKey: "AIzaSyDPGKnKOeBXeHh6JX1Kyfs3iLORUZTkd4Y",
  authDomain: "mmislamic-f16d0.firebaseapp.com",
  databaseURL: "https://mmislamic-f16d0-default-rtdb.firebaseio.com",
  projectId: "mmislamic-f16d0",
  storageBucket: "mmislamic-f16d0.firebasestorage.app",
  messagingSenderId: "45340291290",
  appId: "1:45340291290:web:a1aa9ad7a812bc5b61f5e3",
  measurementId: "G-E4NTQV2NTZ"
};

// Initialize Primary Instances
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Non-negotiable Super Admin UID Lock
export const SUPER_ADMIN_UID = "0gzsLXNUjuZgZhO0FXpFflx2Ryi2";

export { 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    doc, 
    getDoc, 
    setDoc,
    updateDoc,
    deleteDoc,
    collection,
    getDocs,
    query,
    where
};
