import { createContext, useContext } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

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
const firestore = getFirestore(app);
export const auth = getAuth(app);

const signupUserWithEmailAndPassword = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password, name)
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
const writeData = async () => {
    const result = await addDoc(collection(firestore, 'cities'), {
        name: "Hadi",
        postalCode: 75850,
        lat: 127,
        long: 210,
        isPass: false
    })
}
const writeSubData = async () => {
    const result = await addDoc(collection(firestore, 'cities/QMzqX8wBfQ3sD58UtChl/places'), {
        name: "Metha dar",
        lat: 167,
        long: 221,
        date: Date.now()
    })
    console.log("Result", result);
}
const getDocument = async () => {
    // const docRef = doc(firestore, "cities", "QMzqX8wBfQ3sD58UtChl");
    const result = await getDoc(doc(firestore, "cities", "9J2ARgNxBxM3A3U3uLnR"));
    console.log(result.data());
}
const getDocumentByQuery = async () => {
    const citiesRef = collection(firestore, "cities")
    const q = query(citiesRef, where("isPass", "==", true))
    const result = await getDocs(q);
    result.forEach((data) => console.log(data.data()));

}
const updateDocument = async () => {
    const docRef = doc(firestore, "cities", "9J2ARgNxBxM3A3U3uLnR");
    await updateDoc(docRef, {
        isPass: true
    })
}
const deleteDocument = async () => {
    await deleteDoc(doc(firestore, "cities", "9J2ARgNxBxM3A3U3uLnR"));
}

export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseContextProvider = ({children}) => {
    return (
        <FirebaseContext.Provider value={{  signupUserWithEmailAndPassword, 
                                            signinUserWithEmailAndPassword, 
                                            writeData, 
                                            writeSubData, 
                                            getDocument, 
                                            getDocumentByQuery,
                                            updateDocument,
                                            deleteDocument
                                        }}>
            {children}
        </FirebaseContext.Provider>
    )
}