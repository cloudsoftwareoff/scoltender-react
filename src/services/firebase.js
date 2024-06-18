import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration for web
const firebaseConfig = {
  apiKey: "AIzaSyCgcJDcNrZ8iyWT4UucORRWUixH7nnQdRo",
  authDomain: "scoltender.firebaseapp.com",
  databaseURL: "https://scoltender-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scoltender",
  storageBucket: "scoltender.appspot.com",
  messagingSenderId: "672082626189",
  appId: "1:672082626189:web:ecf2e1837eee45503b04c4",
  measurementId: "G-ESEKJSN0GQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const storage =getStorage(app);
export const firestore = getFirestore(app);
