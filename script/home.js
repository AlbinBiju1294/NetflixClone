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
  
  // Initialize Firebase
 const app = initializeApp(firebaseConfig);
  
const db = getFirestore(app);

const colRef = collection(db, "profileCollection");
const docRef = doc(colRef,"user1");



const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdhZDgwMjUxNDdlZThkY2ZiYjZjY2ZiNTIxNDMzNCIsInN1YiI6IjYzN2E0ZDgwOTc2ZTQ4MDBiNDU1ZDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iz4uW_emM4tQei3loe66oPYe0Te_HpcSKpfj8u921fk",
  },
};

const baseUrl = "https://api.themoviedb.org/3/";
const baseImageUrl = "https://image.tmdb.org/t/p/original";

window.addEventListener("scroll", function() {
  var navbarSelector = document.getElementById("navbarselector");
  if (window.scrollY > 50) {
      navbarSelector.style.backgroundColor = "black";
  } else {
      navbarSelector.style.backgroundColor = "transparent";
  }
});

window.onload = () => {
    showWatchHistory();
    showContent("trending/all/day?language=en-US","trending-all");
    showContent("movie/popular?language=en-US&page=1","popular-movies");
    showContent("tv/popular?language=en-US&page=1","popular-series");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27","horror-movies");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12","adventure-movies");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28","action-movies");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749","romantic-movies");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=36","history-movies");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53","thriller-movies");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35","comedy-movies");
};


const showContent = (url,elementId) => {
  let content = [];
  fetch(
    baseUrl+url,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      content = response.results;
      const parentElement = document.getElementById(elementId);

      content.forEach((item) => {
        const newElement = document.createElement("div");
        newElement.className = "innercard";
        const imageUrl =
          baseImageUrl + item.backdrop_path;
        newElement.style.backgroundImage = `url(${imageUrl})`;
        newElement.style.backgroundSize = "cover";



        newElement.addEventListener('click', () => { addHistory(item)});



        parentElement.appendChild(newElement);

      });
    })
    .catch((err) => console.error(err));
};



const addHistory = async (item) => {
  const collection2 = collection(docRef,"profiles");
  const document2 = doc(collection2,"profile1");
  const unionRes = await updateDoc(document2,{
    watchHistory: arrayUnion(item)
  });

console.log(unionRes);
}

const showWatchHistory = async () => {
  let content = [];
  const parentElement = document.getElementById('watch-history');

  const collection2 = collection(docRef,"profiles");
  const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
  const newDoc = await getDoc(document2);
  console.log(newDoc);
  content = newDoc.data().watchHistory;
  console.log(content);

  content.forEach((item) => {
    const newElement = document.createElement("div");
    newElement.className = "innercard";
    const imageUrl =
      baseImageUrl + item.backdrop_path;
    newElement.style.backgroundImage = `url(${imageUrl})`;
    newElement.style.backgroundSize = "cover";
    parentElement.appendChild(newElement);
  });
};