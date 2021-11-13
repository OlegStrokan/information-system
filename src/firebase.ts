import { initializeApp }  from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

export const db = getFirestore(app);

