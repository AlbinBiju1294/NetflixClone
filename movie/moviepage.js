
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDoc, doc , arrayUnion, updateDoc, getDocs} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { setNavbarProfiles } from '../home/home.js';
import {firebaseConfig} from '../script/config.js'
import { getOptions } from '../script/tmdbkeys.js';
  
// Initializing Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const colRef = collection(db, "profileCollection");
const docRef = doc(colRef,`${localStorage.getItem('userId')}`);

const options = getOptions;
const baseUrl = "https://api.themoviedb.org/3/";
const baseImageUrl = "https://image.tmdb.org/t/p/original";
 
window.onload = () => {
    loadBannerImages();

    setNavbarProfiles();
    showContent("movie/popular?language=en-US&page=1","allmovie");
    showContent("movie/top_rated?language=en-US&page=1","upcomingmovie");
    showContent("movie/upcoming?language=en-US&page=1","topmovie");
    showContent("movie/popular?language=en-US&page=1","popularmovie");
    };
 
    window.addEventListener("scroll", function() {
      const headgenreContainer = document.getElementById("headgenre_container");
      if (window.scrollY > 50) {
          headgenreContainer.style.backgroundColor = "black";
      } else {
          headgenreContainer.style.backgroundColor = "transparent";
      }
    });
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

        // const videoElement = document.createElement("video");
        // const videoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"; // Replace with actual video URL
        // videoElement.src = videoUrl;
        // videoElement.className = "videocard";
        // videoElement.autoplay = true;
        // videoElement.loop = true;
        // videoElement.muted = true;
        // videoElement.style.width = "260px";
        // videoElement.style.height = "150px";
        // videoElement.style.objectFit = "cover";
        // videoElement.style.display = "none";
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
function reload(){
  location.reload();
}
// var originalContent = document.getElementById("movie_container").cloneNode(true);
function movieTypeSelection() {
  const dropdown = document.getElementById("genre_dropdown");
  let selectedOption = dropdown.options[dropdown.selectedIndex].value;
  document.getElementById("movie_container").innerHTML = '';
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
document.getElementById("genre_dropdown").addEventListener("change", movieTypeSelection);

// *******************************
const loadBannerImages = () => {
  console.log("Arrived here");
let imageSpecificUrl = "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28";
let bannerContent = [];
fetch(
  baseUrl+imageSpecificUrl,
  options
)
  .then((response) => response.json())
  .then((response) => {
    bannerContent = response.results;
    const imageIdOne = document.getElementById('bannerid');
    const head=document.getElementById('heading');
    const overview=document.getElementById('overview')
    bannerContent.forEach((item)=>{
      const imageUrl1=baseImageUrl+item.backdrop_path;
      imageIdOne.style.backgroundImage=`url(${imageUrl1})`;
    imageIdOne.style.backgroundSize="cover";
    head.innerText = item.title;
    overview.innerText = item.overview;
    });
    
    })
    .catch((err) => console.error(err));
  
}






function showCard(id1) {
  document.getElementById('nested-card-movie').innerHTML='';
  document.getElementById('nested-card-topmovie').innerHTML='';
  document.getElementById('nested-card-popularmovie').innerHTML='';
  document.getElementById('nested-card-upcoming').innerHTML='';
  const cardContainer = document.getElementById('cardContainer');
  const mainCard = document.querySelector('.main-card');
  const title=document.getElementById('nested-card-movie');
  let headingText = '';
  let headingText1 = '';
  switch(id1){
    case "nested-card-movie":headingText = 'Movies';
                            showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35", "nested-card-movie");
                            headingText1 = 'Moviesdbiwbdbwd';
                              break;
    case "nested-card-topmovie":headingText = 'Top Rated Movies';
                                showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27", "nested-card-topmovie");
                                break;
    case "nested-card-popularmovie":  headingText = 'Popular Movies';
                                    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=36", "nested-card-popularmovie");
                                    break;
    case "nested-card-upcoming":headingText = 'Upcoming Movies';
                                showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12", "nested-card-upcoming");
                                break;
  }
  title.innerHTML = `<h2 style="text-align: center; font-size:50px; padding: 20px;">${headingText}</h2>`;
  cardContainer.style.display = 'flex';

  setTimeout(function() {
    mainCard.style.transform = 'scale(1)';
    cardContainer.style.opacity = 1;
  }, 10); 
}
document.getElementById("movies_exploreall").addEventListener("click", function () {
  showCard('nested-card-movie');
});
document.getElementById("upcoming_exploreall").addEventListener("click", function () {
  showCard('nested-card-upcoming');
});
document.getElementById("top_exploreall").addEventListener("click", function () {
  showCard('nested-card-topmovie');
});
document.getElementById("popular_exploreall").addEventListener("click", function () {
  showCard('nested-card-popularmovie');
});


function closeCard() {
  const cardContainer = document.getElementById('cardContainer');
  const mainCard = document.querySelector('.main-card');
  mainCard.style.transform = 'scale(0.7)';
  cardContainer.style.opacity = 0;
  setTimeout(function() {
    cardContainer.style.display = 'none';
  }, 500); 
}
document.querySelector('.close-btn').addEventListener('click', closeCard);
document.querySelector('.card-container').addEventListener('click', closeCard);

function stopPropagation(event) {
  event.stopPropagation();
}

document.querySelector('.main-card').addEventListener('click', stopPropagation);


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

