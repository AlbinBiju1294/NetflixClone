import {firebaseConfig} from '../script/config.js'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

import { getFirestore, collection, setDoc, doc , arrayUnion, updateDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
  
const db = getFirestore(app);

const colRef = collection(db, "profileCollection");
const docRef = doc(colRef,`${localStorage.getItem('userId')}`);

document.getElementById('createProfileButton').addEventListener('click',() => {
    createProfile();
})

export const createProfile = async () => {
    console.log("Reached here");
    const collection2 = collection(docRef,"profiles");
    const createdDoc = await setDoc(doc(collection2, `${document.getElementById('nameinput').value}`), {
        name: `${document.getElementById('nameinput').value}`,
        watchHistory: [],
        watchList: []
      });
      window.location.href = '../profileselection/profileselection.html';
}