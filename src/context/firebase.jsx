import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCA4v6uY936zQGIwYT-8Z7umauV7s5ftaA",
  authDomain: "student-teacher-feedback.firebaseapp.com",
  projectId: "student-teacher-feedback",
  storageBucket: "student-teacher-feedback.firebasestorage.app",
  messagingSenderId: "590361486546",
  appId: "1:590361486546:web:1674afb4eeb955b89df90b",
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const FirebaseContext = createContext(null);

export const FirebaseProvider = (props) => {
  const signUpUserWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
  };

  const signInUserWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password).then(()=>alert('User  signed SucesFully')).catch((error)=>alert('error',error));
  };

  return (
    <FirebaseContext.Provider
      value={{ signUpUserWithEmailPassword, signInUserWithEmailPassword }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
