import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyC94rWtSEQI1RUVHeaDDBM6ikMIy8W-XHQ",
  authDomain: "prg3-grupo2-pi2.firebaseapp.com",
  projectId: "prg3-grupo2-pi2",
  storageBucket: "prg3-grupo2-pi2.firebasestorage.app",
  messagingSenderId: "1028289261087",
  appId: "1:1028289261087:web:101c104353020214a6af2a"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
