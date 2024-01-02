import { firebaseConfig } from "../script/config.js"

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

import { getFirestore, collection, getDocs, doc , arrayUnion, updateDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
  
const db = getFirestore(app);

window.onload = async () => {
    const colRef = collection(db, "profileCollection");
    const docRef = doc(colRef,`${localStorage.getItem('userId')}`);
    const querySnapshot = await getDocs(collection(docRef, "profiles"));
    const parentElement = document.getElementById('profiledetailsid');
    let count = 1;
  querySnapshot.forEach((doc) => {
    const childElement = document.createElement('div');
    childElement.className = "profileinnerdetails d-flex flex-column me-3";
    childElement.innerHTML = `<div class="profileimage bg-primary" id="profile${count++}"></div><p class="iconimagep">${doc.data().name}</p>`;
    childElement.addEventListener('click',() => {
        localStorage.setItem('profile',doc.id);
        window.location.href = '../htmlpages/home.html'
    })
    parentElement.appendChild(childElement);
  });
  const childAddElement = document.createElement('div');
  childAddElement.className = "profileinnerdetails d-flex flex-column me-3";
  childAddElement.innerHTML = `<div class="addicon"><i class="bi bi-plus-circle-fill"></i></div><p class="iconp" style="text-align: center;">Add profile</p>`;
  childAddElement.addEventListener('click',() => {
    window.location.href = '../addaccount/addaccount.html';
  })
  parentElement.appendChild(childAddElement);

}