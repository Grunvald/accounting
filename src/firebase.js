import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAtLS59icZ4hzUY0YuElNzjxm1PxwR017c",
  authDomain: "homeaccounting-bba8d.firebaseapp.com",
  databaseURL: "https://homeaccounting-bba8d.firebaseio.com",
  projectId: "homeaccounting-bba8d",
  storageBucket: "homeaccounting-bba8d.appspot.com",
  messagingSenderId: "729782110521"
};

firebase.initializeApp(config);

const firestore = firebase.firestore();
export const firestoreDb = firestore;
