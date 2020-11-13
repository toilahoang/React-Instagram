import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD8goWz-ZBzPGNLjRRHO5ujHbWKlfkbU8c",
    authDomain: "react-instagram-ce326.firebaseapp.com",
    databaseURL: "https://react-instagram-ce326.firebaseio.com",
    projectId: "react-instagram-ce326",
    storageBucket: "react-instagram-ce326.appspot.com",
    messagingSenderId: "591317180205",
    appId: "1:591317180205:web:aba985d9f5c5bc17e8fda4",
    measurementId: "G-SEC675XX45"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const authGoogle = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();
export { db, firebase, auth, authGoogle };