import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDoc, doc , arrayUnion, updateDoc, getDocs} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

import {firebaseConfig, getOptions} from '../signup/config.js';

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
    showBanner("tv/top_rated?language=en-US&page=1");
};


 //function to display the film posters
 
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
        newElement.innerHTML = `<div class="movie-info"><p class="movie-title">${availabletitle}</p><p class="movie-title">Language:${item.original_language}</p><p class="movie-popularity" style="width: 250px;">Release Date:${item.release_date}</p><div class="PWbuttons"><i class="bi bi-play-circle-fill playbutton" id="playbutton${item.id}"></i><i class="bi bi-plus-circle plusbutton" id="plusbutton${item.id}"></i><i class="bi bi-info-circle infobutton" id="infobutton${item.id}"></i></div></div>`
        newElement.querySelector(`#playbutton${item.id}`).addEventListener('click',() => { addHistory(item)});
        newElement.querySelector(`#plusbutton${item.id}`).addEventListener('click',() => { addList(item)});
        newElement.querySelector(`#infobutton${item.id}`).addEventListener('click',() => { showContentDetails(item)});
        newElement.querySelector("#playbutton".concat(item.id)).addEventListener("click",() => {videoPlayer()});
                    

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

//video player

const videoPlayer = () =>{
  window.location.href = '../video/video.html';
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



function reload(){
  location.reload();
}


//function to sort by genre

function movieTypeSelection() {
  console.log("mpog");
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


//function to add to watchlist

const addHistory = async (item) => {
  const collection2 = collection(docRef,"profiles");
  const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
  const unionRes = await updateDoc(document2,{
    watchHistory: arrayUnion(item)
  });
  location.reload();
}

//function to add to my list

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

//function to display the first banner poster dynamically

const showBanner = (url) => {
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
              document.getElementById("info").addEventListener('click',() => { showContentDetails(item)});
              document.getElementById("play").addEventListener('click',() => {videoPlayer()});
            });
          })
          .catch((err) => console.error(err));
      };

      //function to show more info card

      const showContentDetails = (item) => {
        const moreInfoPage = document.getElementById('moreInfoPageId');
        const imageUrl = baseImageUrl + item.backdrop_path;
        document.getElementById('contentPosterImageId').style.backgroundImage = `url(${imageUrl})`;
        document.getElementById('contentTitleId').innerText = item.original_name;
        document.getElementById('contentOverviewId').innerText = item.overview;
        document.getElementById('contentReleaseDateId').innerText = item.release_date;
        document.getElementById('contentLanguageId').innerText = item.original_language;
        moreInfoPage.style.display = 'block';
        moreInfoPage.style.opacity = 1;
        document.getElementById('moreInfoCloseButtonId').addEventListener('click',() => {
          closeMoreInfoPage();
        })
      }

      const closeMoreInfoPage = () => {
        const moreInfoPage = document.getElementById('moreInfoPageId');
        moreInfoPage.style.display = 'none';
        moreInfoPage.style.opacity = 0;
      }

