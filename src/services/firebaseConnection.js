import firebase from "firebase/app";

import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: 'AIzaSyDgu30IS23utb_Wol9H5csCWoQqBk2SrEw',
    authDomain: 'tarefas-9263d.firebaseapp.com',
    projectId: 'tarefas-9263d',
    storageBucket: 'tarefas-9263d.appspot.com',
    messagingSenderId: '101167528835',
    appId: '1:101167528835:web:2455076a8a4df5b84354b6'
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;