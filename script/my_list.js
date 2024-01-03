import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

import { getFirestore, collection, getDoc, doc , arrayUnion, updateDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyAcbi3_oCi8ZvIaVJCo_nity5rZnjpObow",
    authDomain: "netflixclone-28d52.firebaseapp.com",
    projectId: "netflixclone-28d52",
    storageBucket: "netflixclone-28d52.appspot.com",
    messagingSenderId: "478121105015",
    appId: "1:478121105015:web:f14cdfd963421075805872"
  };

  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  
  // Initialize Firebase
 const app = initializeApp(firebaseConfig);
  
const db = getFirestore(app);

const colRef = collection(db, "profileCollection");
const docRef = doc(colRef,`${localStorage.getItem('userId')}`);
window.onload = () => {
  showWatchList();
}

const showWatchList= async () => {
  let content = [];
  const parentElement = document.getElementById('filteredcontent');

  const collection2 = collection(docRef,"profiles");
  const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
  const newDoc = await getDoc(document2);
  console.log(newDoc);
  content = newDoc.data().watchList;
  console.log(content);

  content.forEach((item) => {
    const newElement = document.createElement("div");
    const newTitle = document.createElement("p");
    newTitle.innerText = `${item.title}`;
    newTitle.className = "cardtitle";
    newElement.appendChild(newTitle);
    newElement.className = "innercard";
    const imageUrl =
      "https://image.tmdb.org/t/p/original" + item.backdrop_path;
    console.log(imageUrl);
    newElement.style.backgroundImage = `url(${imageUrl})`;
    newElement.style.backgroundSize = "cover";
    parentElement.appendChild(newElement);
  });
};