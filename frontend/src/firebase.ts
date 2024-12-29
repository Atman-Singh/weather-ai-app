import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAxzlMYIdOK5YIBUbVNQ3K_Iun90Joe2LA',
  authDomain: 'weatherclothing-4bf8e.firebaseapp.com',
  projectId: 'weatherclothing-4bf8e',
  storageBucket: 'weatherclothing-4bf8e.firebasestorage.app',
  messagingSenderId: '693246340584',
  appId: '1:693246340584:web:b24a0ef164ca26ffe9085d',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const firestore = getFirestore();

export { storage, firestore, ref, uploadBytes, getDownloadURL, doc, setDoc };