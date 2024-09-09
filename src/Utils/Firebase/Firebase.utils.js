import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCIFn-LUZ9UghHI5oF8_jepcNlUpu-Ix2U",
  authDomain: "e-commerce-db-e603f.firebaseapp.com",
  projectId: "e-commerce-db-e603f",
  storageBucket: "e-commerce-db-e603f.appspot.com",
  messagingSenderId: "598396765274",
  appId: "1:598396765274:web:972070cb96157f82f08463",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createAuthUserDocumentFromAuth = async (
  userAuth,
  additionalInfo
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
export const createAuthUserDocumentFromUserAndPass = async (
  email,
  password
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserDocumentFromUserAndPass = async (
  email,
  password
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
