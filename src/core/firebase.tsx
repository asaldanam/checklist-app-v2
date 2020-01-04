import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useEffect, useState } from 'react';

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
    // console.log('enablePersistence')
  })
  .catch(function (err: any) {
    console.error(err);
  });

export const fire = {

  // getList: (listId: string) => {
  //   return firebase.firestore()
  //   .collection('Lists')
  //   .doc(listId)
  //   .collection('Products')
  //   .where('onList', '==', true)
  // },

  getProductList: (listId: string, searchBy: string) => {
    const productsStore = firebase.firestore()
      .collection('Lists')
      .doc(listId)
      .collection('Products')
    return Boolean(searchBy) 
      ? productsStore
        // .where('onList', '==', false)
        .where('tags', 'array-contains', searchBy)
      : productsStore
        .where('onList', '==', true);
  },

  loginWithGoogle: () => firebase
    .auth()
    .signInWithRedirect(new firebase.auth.GoogleAuthProvider()),

  updateItem: (listId: string, itemId: string, state: boolean) => {
    return firebase.firestore().collection('Lists')
    .doc(listId)
    .collection('Products')
    .doc(itemId)
    .update({onList: state})
  },

  addProduct: (listId: string, product: any) => firebase.firestore()
    .collection('Lists')
    .doc(listId)
    .collection('Products')
    .add(product)
}


export function useProductList(filter) {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState({query: '', list: []})

  useEffect(() => {

    const ref = firebase
      .firestore()
      .collection('Lists')
      .doc('lzCiykDQBPMjr1rCBCZK')
      .collection('Products')

    const query = filter 
      ? ref.where('tags', 'array-contains', filter)
      : ref.where('onList', '==', true);

    const subscription = query
      .onSnapshot(snapshot => { 
        setLoading(false)
        setItems({
          query: filter ? 'product' : 'list',
          list: snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        }) 
      }, err => { setError(err) } )

    return () => subscription()
  }, [filter])

  return [ items, loading, error ]
}
