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
 
window.onload = () => {
    showContent("tv/popular?language=en-US&page=1","popular-movies");
    showContent("tv/top_rated?language=en-US&page=1","top-rated");
    showContent("tv/on_the_air?language=en-US&page=1","now-playing");
    showContent("tv/airing_today?language=en-US&page=1","upcoming");
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

        const videoElement = document.createElement("video");
        const videoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"; // Replace with actual video URL
        videoElement.src = videoUrl;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.style.objectFit = "cover";
        videoElement.style.display = "none";


        const imageUrl =
          baseImageUrl + item.backdrop_path;
        console.log(imageUrl);
        newElement.style.backgroundImage = `url(${imageUrl})`;
        newElement.style.backgroundSize = "cover";

        newElement.addEventListener("mouseenter", () => {
          newElement.style.transformOrigin = "center top";
          newElement.style.transform = "scale(1.2)";
          videoElement.style.display = "block";
      });

      newElement.addEventListener("mouseleave", () => {
        newElement.style.transformOrigin = "center top";
        newElement.style.transform = "scale(1)";
        videoElement.style.display = "none";
    });

    newElement.appendChild(videoElement);

    // Append the new element to the parent
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

function movieTypeSelection() {
  var dropdown = document.getElementById("genre_dropdown");
  var selectedOption = dropdown.options[dropdown.selectedIndex].value;
  document.getElementById("moviescontainer").innerHTML = '';
  document.getElementById("movie_container_outside").innerHTML = '';

  switch (selectedOption) {
      case "defaults":reload();
          break;
      case "horror":
          document.getElementById("movie_container_outside").innerHTML=`<h2 style="color : white; font-family: Arial, Helvetica, sans-serif;">HORROR</h2>`
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27", "movie_container_outside"); // horror
          break;
      case "romantic":
        document.getElementById("movie_container_outside").innerHTML=`<h2 style="color : white; font-family: Arial, Helvetica, sans-serif;">ROMANTIC</h2>`
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749", "movie_container_outside"); // romantic
          break;
      case "comedy":
        document.getElementById("movie_container_outside").innerHTML=`<h2 style="color : white; font-family: Arial, Helvetica, sans-serif;">COMEDY</h2>`
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35", "movie_container_outside"); // comedy
          break;
      case "action":
        document.getElementById("movie_container_outside").innerHTML=`<h2 style="color : white; font-family: Arial, Helvetica, sans-serif;">ACTION</h2>`
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28", "movie_container_outside"); // action
          break;
      case "adventure":
        document.getElementById("movie_container_outside").innerHTML=`<h2 style="color : white; font-family: Arial, Helvetica, sans-serif;">ADVENTURE</h2>`
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12", "movie_container_outside"); // adventure
          break;
      case "history":
        document.getElementById("movie_container_outside").innerHTML=`<h2 style="color : white; font-family: Arial, Helvetica, sans-serif;">HISTORY</h2>`
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=36", "movie_container_outside"); // history
          break;
      case "thriller":
        document.getElementById("movie_container_outside").innerHTML=`<h2 style="color : white; font-family: Arial, Helvetica, sans-serif;">THRILLER</h2>`
          showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53", "movie_container_outside"); // thriller
          break;
  }
}

// Function to read content of #content div
// Load JSON data
let elementIds;

fetch('../elements.json')
  .then(response => response.json())
  .then(data => {
    elementIds = data;
    // Set up event delegation for the entire document
    document.addEventListener('mouseover', function (event) {
      handleMouseover(event);
    });
  });

// Function to toggle audio
let audioEnabled = false;

function toggleAudio() {
  audioEnabled = !audioEnabled; // Toggle audio state
}

// Function to handle mouseover event using event delegation
function handleMouseover(event) {
  // console.log("qwertyuiop");
  if (audioEnabled && elementIds) {
    // Get the ID from the event target
    const elementId = event.target.id;
    // console.log(elementIds[elementId])
    // Check if the ID is in the JSON file
    if (elementIds[elementId]) {
      const contentElement = document.getElementById(elementIds[elementId]);
      if (contentElement) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(contentElement.innerText);
        synth.speak(utterance);
      }
    }
  }
}
