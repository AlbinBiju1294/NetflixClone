import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDoc, doc , arrayUnion, updateDoc, getDocs} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import {firebaseConfig} from '../script/config.js'
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdhZDgwMjUxNDdlZThkY2ZiYjZjY2ZiNTIxNDMzNCIsInN1YiI6IjYzN2E0ZDgwOTc2ZTQ4MDBiNDU1ZDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iz4uW_emM4tQei3loe66oPYe0Te_HpcSKpfj8u921fk",
  },
};
  
// Initializing Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const colRef = collection(db, "profileCollection");
const docRef = doc(colRef,`${localStorage.getItem('userId')}`);

export const baseUrl = "https://api.themoviedb.org/3/";
export const baseImageUrl = "https://image.tmdb.org/t/p/original";

document.getElementById('dropdownBtn').addEventListener('click',() => {
  toggleDropdown();
});

function toggleDropdown() {
  const dropdownContent = document.getElementById("dropdownContent");
  const arrowIcon = document.getElementById("arrowButton");

  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    arrowIcon.className = 'bi bi-caret-down-fill arrow';

    
  } else {
    dropdownContent.style.display = "block";
    arrowIcon.className = 'bi bi-caret-up-fill arrow';
  }
}


//function to change background colour of navbar on scroll
window.addEventListener("scroll", function() {
  var navbarSelector = document.getElementById("navbarselector");
  if (window.scrollY > 50) {
      navbarSelector.style.backgroundColor = "black";
  } else {
      navbarSelector.style.backgroundColor = "transparent";
  }
});

document.getElementById('searchIcon').addEventListener('click',() => {
  setSearchKeyword();
})

export const setSearchKeyword = () => {
  let searchKeyword =  document.getElementById('searchbox').value;
  localStorage.setItem('searchKeyword',searchKeyword);
  window.location.href = '../search/search.html';
}


//onloading the page we call the given functions to display content
window.onload = () => {
    setNavbarProfiles();
    showWatchHistory();
    showWatchList();
    showContent("trending/all/day?language=en-US","trending-all");
    showContent("movie/popular?language=en-US&page=1","popular-movies");
    showContent("tv/popular?language=en-US&page=1","popular-series");
    // showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27","horror-movies");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12","adventure-movies");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28","action-movies");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749","romantic-movies");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=36","history-movies");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53","thriller-movies");
    showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35","comedy-movies");
};

//showContent function receives the fetch url and the element id to which the content needs to be inserted
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
      const exploreId = elementId+"-span";
      console.log(exploreId);
      document.getElementById(`${exploreId}`).addEventListener('click',() => {
        generateExploreMore(content);
      })

      
      content.forEach((item) => {
        const newElement = document.createElement("div");
        newElement.className = "innercard";
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
        const imageUrl =
          baseImageUrl + item.backdrop_path;
        newElement.style.backgroundImage = `url(${imageUrl})`;
        newElement.style.backgroundSize = "cover";
        newElement.innerHTML = `<div class="movie-info"><p class="movie-title">${item.original_title}</p><p class="movie-title">Language:${item.original_language}</p><p class="movie-popularity" style="width: 250px;">Release Date:${item.release_date}</p><div class="PWbuttons"><i class="bi bi-play-circle-fill playbutton" id="playbutton${item.id}"></i><i class="bi bi-plus-circle plusbutton" id="plusbutton${item.id}"></i></div></div>`
        newElement.querySelector(`#playbutton${item.id}`).addEventListener('click',() => { addHistory(item)});
        newElement.querySelector(`#plusbutton${item.id}`).addEventListener('click',() => { addList(item)});

      //   newElement.addEventListener("mouseenter", () => {
      //     // newElement.style.backgroundImage = "none";
      //     videoElement.style.display = "block";
      // });
   
      // newElement.addEventListener("mouseleave", () => {
      //     newElement.style.backgroundImage = `url(${imageUrl})`;
      //     videoElement.style.display = "none";
      // });
      // newElement.appendChild(videoElement);
        parentElement.appendChild(newElement);

      });
    })
    .catch((err) => console.error(err));
};

//explore more
const generateExploreMore = ( content ) => {
  const exploreContentDiv = document.getElementById('exploreContentId');
  content.forEach((item) => {
    const newElement = document.createElement("div");
    newElement.className = "innercard";
    const imageUrl =
      baseImageUrl + item.backdrop_path;
    newElement.style.backgroundImage = `url(${imageUrl})`;
    newElement.style.backgroundSize = "cover";
    newElement.innerHTML = `<div class="movie-info"><p class="movie-title">${item.original_title}</p><p class="movie-title">Language:${item.original_language}</p><p class="movie-popularity" style="width: 250px;">Release Date:${item.release_date}</p><div class="PWbuttons"><i class="bi bi-play-circle-fill playbutton" id="playbutton${item.id}"></i><i class="bi bi-plus-circle plusbutton" id="plusbutton${item.id}"></i></div></div>`
    newElement.querySelector(`#playbutton${item.id}`).addEventListener('click',() => { addHistory(item)});
    newElement.querySelector(`#plusbutton${item.id}`).addEventListener('click',() => { addList(item)});
    exploreContentDiv.appendChild(newElement);

  });
  document.getElementById('exploreMoreId').style.display = 'block';
  document.getElementById('exploreMoreId').style.opacity = 1;
  document.getElementById('closeButtonId').addEventListener('click',() => {
    closeExploreContent();
  })
}


const addHistory = async (item) => {
  const collection2 = collection(docRef,"profiles");
  const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
  const unionRes = await updateDoc(document2,{
    watchHistory: arrayUnion(item)
  });
  location.reload();
}

// onclicking the play button the movie or tvshow item gets stored in the watch list
const addList = async (item) => {
  const collection2 = collection(docRef,"profiles");
  const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
  const unionRes = await updateDoc(document2,{
    watchList: arrayUnion(item)
  });
  location.reload();
}


//function for showing the watch history
const showWatchHistory = async () => {
  let content = [];
  const parentElement = document.getElementById('watch-history');

  const collection2 = collection(docRef,"profiles");
  const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
  const newDoc = await getDoc(document2);
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

// function for showing the watch list
const showWatchList= async () => {
  let content = [];
  const parentElement = document.getElementById('watch-list');

  const collection2 = collection(docRef,"profiles");
  const document2 = doc(collection2,`${localStorage.getItem('profile')}`);
  const newDoc = await getDoc(document2);
  console.log(newDoc);
  content = newDoc.data().watchList;
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


// for appending profiles
export const setNavbarProfiles = async () => {
  const colRef = collection(db, "profileCollection");
  const docRef = doc(colRef,`${localStorage.getItem('userId')}`);
  const querySnapshot = await getDocs(collection(docRef, "profiles"));
  const parentElement = document.getElementById('profileDivId');
  querySnapshot.forEach((doc) => {
    console.log(doc.data().name);
    if(localStorage.getItem('profile') === doc.data().name )
    {
      console.log("hello");
      document.getElementsByClassName('Navbarprofileicon')[0].id = `${doc.data().profileImageId}`;
    }
    const childElement = document.createElement('a');
    childElement.className = "profileAnchor";
    childElement.innerHTML = `<div class="outerNavbarProfile"><div class="profileimage bg-primary" id="${doc.data().profileImageId}"></div><p class="iconimagep">${doc.data().name}</p></div>`;
    parentElement.appendChild(childElement);
});
}

document.getElementById('signOutLink').addEventListener('click',() => {
  signOut();
})

export const signOut = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('profile');
  window.location.href = '../htmlpages/login.html';
}



const closeExploreContent = () => {
  console.log("Entered");
  const exploreContentDiv = document.getElementById('exploreContentId');
  exploreContentDiv.innerHTML = '';
  document.getElementById('exploreMoreId').style.display = 'none';
  document.getElementById('exploreMoreId').style.opacity = 0;

}


// onclicking the play button the movie or tvshow item gets stored in the watch history
