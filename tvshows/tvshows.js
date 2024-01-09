import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDoc, doc , arrayUnion, updateDoc, getDocs} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

import {firebaseConfig} from '../script/config.js'
import { getOptions } from '../script/tmdbkeys.js';

// import { addHistory,addList } from '../home/home.js';
import { setNavbarProfiles } from '../home/home.js';
import { signOut } from '../home/home.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const colRef = collection(db, "profileCollection");
const docRef = doc(colRef,`${localStorage.getItem('userId')}`);

const options = getOptions;
 
const baseUrl = "https://api.themoviedb.org/3/";
const baseImageUrl = "https://image.tmdb.org/t/p/original";
 
window.onload = () => {
    setNavbarProfiles();
    showContent("tv/popular?language=en-US&page=1","popular-movies");
    showContent("tv/top_rated?language=en-US&page=1","top-rated");
    showContent("tv/on_the_air?language=en-US&page=1","now-playing");
    showContent("tv/airing_today?language=en-US&page=1","upcoming");
    showBanner("tv/on_the_air?language=en-US&page=1");
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
 
      content.forEach(async (item) => {
        // console.log(item);
        const newElement = document.createElement("div");
        newElement.className = "innercard";
        let availabletitle = "";
        if (item.name) {
          availabletitle = item.name;
        } else if (item.title) {
          availabletitle = item.title;
        } else if (item.original_title) {
          availabletitle = item.original_title;
        } else if (item.original_name) {
          availabletitle = item.original_name;
        }
 
        let posterImage = "";
        if (item.backdrop_path) {
          posterImage = item.backdrop_path;
        } else {
          posterImage = item.poster_path;
        }
 
        const itemId = item.id;
        let videoKey;
 
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${itemId}/videos?language=en-US`,
            getOptions
          );
          const data = await response.json();
 
          if (data.results && data.results.length > 0) {
            videoKey = data.results[0].key;
            // You can use the videoKey here as needed
          } else {
            console.error("No video results found");
          }
        } catch (err) {
          console.error(err);
        }
 
        console.log(videoKey);
 
        const videoFrame = document.createElement("iframe");
        videoFrame.allow = "autoplay";
        videoFrame.className = "videocard";
        console.log(
          `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1`
        );
        videoFrame.src = `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`;
        videoFrame.autoplay = true;
        videoFrame.style.width = "260px";
        videoFrame.style.height = "150px";
        videoFrame.style.objectFit = "cover";
        videoFrame.style.display = "none";
        const imageUrl = baseImageUrl + posterImage;
        newElement.style.backgroundImage = `url(${imageUrl})`;
        newElement.style.backgroundSize = "cover";
        newElement.innerHTML = `<div class="movie-info"><p class="movie-title">${availabletitle}</p><p class="movie-title">Language:${item.original_language}</p><p class="movie-popularity" style="width: 250px;">Release Date:${item.release_date}</p><div class="PWbuttons"><i class="bi bi-play-circle-fill playbutton" id="playbutton${item.id}"></i><i class="bi bi-plus-circle plusbutton" id="plusbutton${item.id}"></i></div></div>`;
        newElement
          .querySelector(`#playbutton${item.id}`)
          .addEventListener("click", () => {
            addHistory(item);
          });
        newElement
          .querySelector(`#plusbutton${item.id}`)
          .addEventListener("click", () => {
            addList(item);
          });
 
        newElement.addEventListener("mouseenter", () => {
          // newElement.style.backgroundImage = "none";
          videoFrame.style.display = "block";
        });
 
        newElement.addEventListener("mouseleave", () => {
          newElement.style.backgroundImage = `url(${imageUrl})`;
          videoFrame.style.display = "none";
        });
        newElement.appendChild(videoFrame);
        parentElement.appendChild(newElement);
      });
    })
    .catch((err) => console.error(err));
};
window.addEventListener("scroll", function() {
  var headgenreContainer = document.getElementById("banner");
  if (window.scrollY > 50) {
      headgenreContainer.style.backgroundColor = "black";
  } else {
      headgenreContainer.style.backgroundColor = "transparent";
  }
});

function showVideoCard() {
  const imageContainer = document.getElementById('imageContainer');
  const videoCard = document.getElementById('videoCard');

  // Show the card
  videoCard.style.display = 'block';

}

function closeVideoCard() {
const videoCard = document.getElementById('videoCard');
const video = videoCard.querySelector('video');

// Pause the video
video.pause();
video.currentTime = 0; // Reset the video to the beginning

// Close the card
videoCard.style.display = 'none';
}


// *******************************************************************************************************************
          //  Working On It 
var id1;
function showCard(id1) {
  document.getElementById('nested-card-movie').innerHTML='';
  document.getElementById('nested-card-topmovie').innerHTML='';
  document.getElementById('nested-card-popularmovie').innerHTML='';
  document.getElementById('nested-card-upcoming').innerHTML='';
  const cardContainer = document.getElementById('cardContainer');
  const mainCard = document.querySelector('.main-card');
  switch(id1){
    case "nested-card-movie":  showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35", "nested-card-movie");
                              break;
    case "nested-card-topmovie":  showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27", "nested-card-topmovie");
                                break;
    case "nested-card-popularmovie":  showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=36", "nested-card-popularmovie");
                                    break;
    case "nested-card-upcoming":showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12", "nested-card-upcoming");
                                break;
  }
  cardContainer.style.display = 'flex';
  setTimeout(function() {
    mainCard.style.transform = 'scale(1)';
    cardContainer.style.opacity = 1;
  }, 10); 
}

function closeCard() {
  const cardContainer = document.getElementById('cardContainer');
  const mainCard = document.querySelector('.main-card');
  mainCard.style.transform = 'scale(0.7)';
  cardContainer.style.opacity = 0;
  setTimeout(function() {
    cardContainer.style.display = 'none';
  }, 500); 
}

function stopPropagation(event) {
  event.stopPropagation();
}

// ********************************************************************************************************************



function reload(){
  location.reload();
}


// document.getElementById("movies_exploreall").addEventListener("click", function () {
//   showCard('nested-card-movie');
// });
// document.getElementById("upcoming_exploreall").addEventListener("click", function () {
//   showCard('nested-card-upcoming');
// });
// document.getElementById("top_exploreall").addEventListener("click", function () {
//   showCard('nested-card-topmovie');
// });
// document.getElementById("popular_exploreall").addEventListener("click", function () {
//   showCard('nested-card-popularmovie');
// });

// document.querySelector('.close-btn').addEventListener('click', closeCard);
// document.querySelector('.card-container').addEventListener('click', closeCard);

// document.querySelector('.main-card').addEventListener('click', stopPropagation);

function movieTypeSelection() {
  var dropdown = document.getElementById("genre_dropdown");
  var selectedOption = dropdown.options[dropdown.selectedIndex].value;
  document.getElementById("moviescontainer").innerHTML = '';
  document.getElementById("movie_container_outside").innerHTML = '';

  switch (selectedOption) {
      case "defaults":reload();
          break;
      case "horror":
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27", "movie_container_outside"); // horror
          break;
      case "romantic":
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749", "movie_container_outside"); // romantic
          break;
      case "comedy":
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35", "movie_container_outside"); // comedy
          break;
      case "action":
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28", "movie_container_outside"); // action
          break;
      case "adventure":
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12", "movie_container_outside"); // adventure
          break;
      case "history":
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=36", "movie_container_outside"); // history
          break;
      case "thriller":
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53", "movie_container_outside"); // thriller
          break;
  }
}

document.getElementById("genre_dropdown").addEventListener("change",movieTypeSelection);



const addHistory = async (item) => {
  const collection2 = collection(docRef,"profiles");
  const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
  const unionRes = await updateDoc(document2,{
    watchHistory: arrayUnion(item)
  });
  location.reload();
}

const addList = async (item) => {
  const collection2 = collection(docRef,"profiles");
  const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
  const unionRes = await updateDoc(document2,{
    watchList: arrayUnion(item)
  });
  location.reload();
}

document.getElementById('signOutLink').addEventListener('click',() => {
  signOut();
})



const showBanner = (url) => {
  console.log("hj");
  let content = [];
  fetch(
    baseUrl+url,
    options
  )
          .then((response) => response.json())
          .then((response) => {
            content = response.results;
            const parentElement = document.getElementById("preview");
            const seriesName = document.getElementById("name");
            const overview = document.getElementById("description");
            content.forEach((item) => {
              const imageUrl =
                baseImageUrl + item.backdrop_path;
              console.log(imageUrl);
              parentElement.style.backgroundImage = `url(${imageUrl})`;
              parentElement.style.backgroundSize = "cover";
              let availabletitle = "";
              if (item.name) {
                availabletitle = item.name;
              } else if (item.title) {
                availabletitle = item.title;
              } else if (item.original_title) {
                availabletitle = item.original_title;
              } else if (item.original_name) {
                availabletitle = item.original_name;
              }
              const description = item.overview;
              seriesName.innerHTML = `<h1 style="font-family: 'Rubik Doodle Shadow';font-size: 50px;">${availabletitle}</h1>`;
              overview.innerHTML = `<p>${description}</p>`;
            });
          })
          .catch((err) => console.error(err));
      };

      // const generateExploreMore = ( content ) => {
      //   const exploreContentDiv = document.getElementById('exploreContentId');
      //   content.forEach((item) => {
      //     const newElement = document.createElement("div");
      //     newElement.className = "innercard";
      //     const imageUrl =
      //       baseImageUrl + item.backdrop_path;
      //     newElement.style.backgroundImage = `url(${imageUrl})`;
      //     newElement.style.backgroundSize = "cover";
      //     newElement.innerHTML = `<div class="movie-info"><p class="movie-title">${item.original_title}</p><p class="movie-title">Language:${item.original_language}</p><p class="movie-popularity" style="width: 250px;">Release Date:${item.release_date}</p><div class="PWbuttons"><i class="bi bi-play-circle-fill playbutton" id="playbutton${item.id}"></i><i class="bi bi-plus-circle plusbutton" id="plusbutton${item.id}"></i></div></div>`
      //     newElement.querySelector(`#playbutton${item.id}`).addEventListener('click',() => { addHistory(item)});
      //     newElement.querySelector(`#plusbutton${item.id}`).addEventListener('click',() => { addList(item)});
      //     exploreContentDiv.appendChild(newElement);
      
      //   });
      //   document.getElementById('exploreMoreId').style.display = 'block';
      //   document.getElementById('exploreMoreId').style.opacity = 1;
      //   document.getElementById('closeButtonId').addEventListener('click',() => {
      //     closeExploreContent();
      //   })
      // }

