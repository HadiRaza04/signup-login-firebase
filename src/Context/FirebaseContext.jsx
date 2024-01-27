import { createContext, useContext } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

const FirebaseContext = createContext(null);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const signupUserWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
};
const signinUserWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((value) => console.log(value))
    .catch((error) => console.log(error));
};

export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseContextProvider = ({children}) => {
    return (
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword, signinUserWithEmailAndPassword}}>
            {children}
        </FirebaseContext.Provider>
    )
}