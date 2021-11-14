import { initializeApp }  from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react';
export const firebaseConfig = {
  apiKey: "AIzaSyDE3NVKYD0DvQ_HlnUnTRHzyxxzaQBnjnI",
  authDomain: "information-system-vspj.firebaseapp.com",
  projectId: "information-system-vspj",
  storageBucket: "information-system-vspj.appspot.com",
  messagingSenderId: "184939012723",
  appId: "1:184939012723:web:3b2044d526b9e7b63dc006",
  measurementId: "G-2WW65QGQXK"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app);

export function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}


export function logout() {
  signOut(auth)
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])
  return currentUser;

}
