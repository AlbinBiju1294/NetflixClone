import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDoc, doc , arrayUnion, updateDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import {firebaseConfig,getOptions} from '../signup/config.js';
import { setNavbarProfiles } from '../home/home.js';
 
const baseImageUrl = "https://image.tmdb.org/t/p/original";
 
//Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const options = getOptions;
const colRef = collection(db, "profileCollection");
const docRef = doc(colRef,`${localStorage.getItem('userId')}`);
window.onload = () => {
  setNavbarProfiles();
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
    newElement.innerHTML = `<div class="movie-info"><p class="movie-title">${item.original_title}</p><p class="movie-title">Language:${item.original_language}</p><p class="movie-popularity" style="width: 250px;">Release Date:${item.release_date}</p><div class="PWbuttons"><i class="bi bi-play-circle-fill playbutton" id="playbutton${item.id}"></i><i class="bi bi-dash-circle plusbutton" id="minusbutton${item.id}"></i></div></div>`
        newElement.querySelector(`#playbutton${item.id}`).addEventListener('click',() => { addHistory(item)});
        newElement.querySelector(`#minusbutton${item.id}`).addEventListener('click',() => { removeList(item)});
        // newElement.querySelector(`#infobutton${item.id}`).addEventListener('click',() => { showContentDetails(item)});
    const imageUrl =
      "https://image.tmdb.org/t/p/original" + item.backdrop_path;
    console.log(imageUrl);
    newElement.style.backgroundImage = `url(${imageUrl})`;
    newElement.style.backgroundSize = "cover";
    parentElement.appendChild(newElement);
  });
};
 
const addHistory = async (item) => {
  const collection2 = collection(docRef,"profiles");
  const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
  const unionRes = await updateDoc(document2,{
    watchHistory: arrayUnion(item)
  });
  location.reload();
}
 
// const removeList = async (item) => {
//   const collection2 = collection(docRef,"profiles");
//   const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
//   const unionRes = await updateDoc(document2,{
//     watchList: arrayUnion(item)
//   });
//   location.reload();
// }
 
 
const removeList = async (item) => {
  try {
    const collection2 = collection(docRef, "profiles");
    const document2 = doc(collection2, `${localStorage.getItem('profile')}`);
    const documentSnapshot = await getDoc(document2);
 
    if (documentSnapshot.exists()) {
      const currentData = documentSnapshot.data();
      const itemExistsInWatchList = currentData.watchList && currentData.watchList.some((historyItem) => historyItem.title === item.title);
 
      if (itemExistsInWatchList) {
        const updatedHistory = currentData.watchList.filter((historyItem) => historyItem.title !== item.title);
        await updateDoc(document2, {
          watchList: updatedHistory
        });
        console.log("Item removed successfully");
        location.reload();
      } else {
        console.log("Item not found in watchList");
      }
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.error("Error removing item from watchList:", error);
  }
};