import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBf52CODpzzjWfacjoe_JuIRv8kbCO1xqE",
  authDomain: "checklist-app-v2.firebaseapp.com",
  databaseURL: "https://checklist-app-v2.firebaseio.com",
  projectId: "checklist-app-v2",
  storageBucket: "checklist-app-v2.appspot.com",
  messagingSenderId: "232719028816",
  appId: "1:232719028816:web:ad2484473a365c657af755",
  measurementId: "G-JS88FCTED2"
};


export const initFirebase = () => firebase.initializeApp(firebaseConfig);
export const initFirestore = () => firebase.firestore().enablePersistence()
  .then((response) => {
    console.log('enablePersistence')
  })
  .catch(function (err: any) {
    console.error(err);
  });

export const fire = {
  loginWithGoogle: () => firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
}
