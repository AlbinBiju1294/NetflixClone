window.addEventListener("scroll", function() {
  const headgenreContainer = document.getElementById("headgenre_container");
  if (window.scrollY > 50) {
      headgenreContainer.style.backgroundColor = "black";
  } else {
      headgenreContainer.style.backgroundColor = "transparent";
  }
});
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
    showContent("movie/popular?language=en-US&page=1","allmovie");
    showContent("movie/top_rated?language=en-US&page=1","upcomingmovie");
    showContent("movie/upcoming?language=en-US&page=1","topmovie");
    showContent("movie/popular?language=en-US&page=1","popularmovie");
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
        console.log(imageUrl);
        newElement.style.backgroundImage = `url(${imageUrl})`;
        newElement.style.backgroundSize = "cover";
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


// *******************************
let id1;
function showCard(id1) {
  document.getElementById('nested-card-movie').innerHTML='';
  document.getElementById('nested-card-topmovie').innerHTML='';
  document.getElementById('nested-card-popularmovie').innerHTML='';
  document.getElementById('nested-card-upcoming').innerHTML='';
  const cardContainer = document.getElementById('cardContainer');
  const mainCard = document.querySelector('.main-card');
  switch(id1){
    case "nested-card-movie":const title=document.getElementById('nested-card-movie').innerHTML='Movie';
                            title.t
                            showContent("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35", "nested-card-movie");
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
let audioEnabled = true;

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
