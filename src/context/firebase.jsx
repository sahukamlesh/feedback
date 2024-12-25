import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCA4v6uY936zQGIwYT-8Z7umauV7s5ftaA",
  authDomain: "student-teacher-feedback.firebaseapp.com",
  projectId: "student-teacher-feedback",
  storageBucket: "student-teacher-feedback.firebasestorage.app",
  messagingSenderId: "590361486546",
  appId: "1:590361486546:web:1674afb4eeb955b89df90b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const signUpUserWithEmailPassword = async (email, password, role, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: name,
    });
    // Save role to Firestore
    await setDoc(doc(db, "users", user.uid), { name, email, role });
    return user;
  };

  const signInUserWithEmailPassword = async (email, password) => {
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Retrieve role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    return { user, role: userDoc.data().role };
  };

  return (
    <FirebaseContext.Provider value={{ signUpUserWithEmailPassword, signInUserWithEmailPassword }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
