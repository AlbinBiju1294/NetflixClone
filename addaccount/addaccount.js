import {firebaseConfig} from '../signup/config.js'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

import { getFirestore, collection, setDoc, doc , arrayUnion, updateDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
  
const db = getFirestore(app);

const colRef = collection(db, "profileCollection");
const docRef = doc(colRef,`${localStorage.getItem('userId')}`);

document.getElementById('createProfileButton').addEventListener('click',() => {
    createProfile();
})

document.getElementById('profileicon').addEventListener('click',() => {
    document.getElementById('imageSelectionId').style.display = 'block';
    document.getElementById('imageSelectionId').style.opacity = 1;

})

let profileImageId = 'profile1';
for(let i=1;i<=10;i++)
{
    document.getElementById(`profile${i}`).addEventListener('click',() => {
        profileImageId = `profile${i}`;
        document.getElementById('imageSelectionId').style.display = 'none';
        document.getElementById('imageSelectionId').style.opacity = 0;
        document.getElementById('profileicon').setAttribute('src',`../common/assets/${profileImageId}.png`)
        console.log(profileImageId);
    })
}



export const createProfile = async () => {
    console.log("Reached here");
    const collection2 = collection(docRef,"profiles");
    const createdDoc = await setDoc(doc(collection2, `${document.getElementById('nameinput').value}`), {
        name: `${document.getElementById('nameinput').value}`,
        profileImageId: profileImageId,
        watchHistory: [],
        watchList: []
      });
      window.location.href = '../profileselection/profileselection.html';
}