import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyD4TxhHN2qEiJkqBs8NhHX91-zLVf9MGqM",
  authDomain: "block-master1.firebaseapp.com",
  projectId: "block-master1",
  storageBucket: "block-master1.appspot.com",
  messagingSenderId: "628794416865",
  appId: "1:628794416865:web:065bd138b9bdad213921a0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export {
    db,
    googleAuthProvider,
    facebookAuthProvider,
    firebase
}