import firebase from 'firebase';



const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "linkedin-clone-52c13.firebaseapp.com",
  projectId: "linkedin-clone-52c13",
  storageBucket: "linkedin-clone-52c13.appspot.com",
  messagingSenderId: "151525013585",
  appId: "1:151525013585:web:8ab6a5d769915b730a2070"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

