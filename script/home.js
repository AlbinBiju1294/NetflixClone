const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdhZDgwMjUxNDdlZThkY2ZiYjZjY2ZiNTIxNDMzNCIsInN1YiI6IjYzN2E0ZDgwOTc2ZTQ4MDBiNDU1ZDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iz4uW_emM4tQei3loe66oPYe0Te_HpcSKpfj8u921fk",
  },
};



fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

//   fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=horror', options)

window.onload = () => {
  fetch('https://api.themoviedb.org/3/configuration/languages', options)
  .then(response => response.json())
  .then(response =>{
    console.log("language");
     console.log(response);
  })
  .catch(err => console.error(err));
  showPopularMovies();
    showTrending();
    showPopularSeries();
    showHorrorMovies();
    showAdventureMovies();
    showRomanticMovies();
    showHistoryMovies();
    showThrillerMovies();
    showActionMovies();
};

const showTrending = () => {
    let trending = [];
    fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        trending = response.results;
        const parentElement = document.getElementById("trending-all");
  
        trending.forEach((item) => {
          const newElement = document.createElement("div");
          newElement.className = "innercard";
          const imageUrl =
            "https://image.tmdb.org/t/p/original" + item.backdrop_path;
          console.log(imageUrl);
          newElement.style.backgroundImage = `url(${imageUrl})`;
          newElement.style.backgroundSize = "cover";
          parentElement.appendChild(newElement);
        });
      })
      .catch((err) => console.error(err));
  };

const showPopularMovies = () => {
  console.log("here");
  let popularMovies = [];
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      popularMovies = response.results;
      console.log(popularMovies);
      const parentElement = document.getElementById("popular-movies");

      popularMovies.forEach((movie) => {
        console.log("inner card");
        const newElement = document.createElement("div");
        newElement.className = "innercard";
        const imageUrl =
          "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
        console.log(imageUrl);
        newElement.style.backgroundImage = `url(${imageUrl})`;
        newElement.style.backgroundSize = "cover";
        parentElement.appendChild(newElement);
      });
    })
    .catch((err) => console.error(err));
};

const showPopularSeries = () => {
    console.log("here");
    let popularSeries = [];
    fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        popularSeries = response.results;
        console.log(popularSeries);
        const parentElement = document.getElementById("popular-series");
  
        popularSeries.forEach((item) => {
          console.log("inner card");
          const newElement = document.createElement("div");
          newElement.className = "innercard";
          const imageUrl =
            "https://image.tmdb.org/t/p/original" + item.backdrop_path;
          console.log(imageUrl);
          newElement.style.backgroundImage = `url(${imageUrl})`;
          newElement.style.backgroundSize = "cover";
          parentElement.appendChild(newElement);
        });
      })
      .catch((err) => console.error(err));
  };


  const showHorrorMovies = () => {
    console.log("here");
    let horrorMovies = [];
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        horrorMovies = response.results;
        console.log(horrorMovies);
        const parentElement = document.getElementById("horror-movies");
  
        horrorMovies.forEach((movie) => {
          console.log("inner card");
          const newElement = document.createElement("div");
          newElement.className = "innercard";
          const imageUrl =
            "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
          console.log(imageUrl);
          newElement.style.backgroundImage = `url(${imageUrl})`;
          newElement.style.backgroundSize = "cover";
          parentElement.appendChild(newElement);
        });
      })
      .catch((err) => console.error(err));
  };

  const showActionMovies = () => {
    console.log("here");
    let actionMovies = [];
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        actionMovies = response.results;
        console.log(actionMovies);
        const parentElement = document.getElementById("action-movies");
  
        actionMovies.forEach((movie) => {
          console.log("innercard");
          const newElement = document.createElement("div");
          newElement.className = "innercard";
          const imageUrl =
            "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
          console.log(imageUrl);
          newElement.style.backgroundImage = `url(${imageUrl})`;
          newElement.style.backgroundSize = "cover";
          parentElement.appendChild(newElement);
        });
      })
      .catch((err) => console.error(err));
  };

  const showAdventureMovies = () => {
    console.log("here");
    let adventureMovies = [];
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        adventureMovies = response.results;
        console.log(adventureMovies);
        const parentElement = document.getElementById("adventure-movies");
  
        adventureMovies.forEach((movie) => {
          console.log("innercard");
          const newElement = document.createElement("div");
          newElement.className = "innercard";
          const imageUrl =
            "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
          console.log(imageUrl);
          newElement.style.backgroundImage = `url(${imageUrl})`;
          newElement.style.backgroundSize = "cover";
          parentElement.appendChild(newElement);
        });
      })
      .catch((err) => console.error(err));
  };

  const showRomanticMovies = () => {
    console.log("here");
    let romanceMovies = [];
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        romanceMovies = response.results;
        const parentElement = document.getElementById("romantic-movies");
  
        romanceMovies.forEach((movie) => {
          console.log("innercard");
          const newElement = document.createElement("div");
          newElement.className = "innercard";
          const imageUrl =
            "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
          console.log(imageUrl);
          newElement.style.backgroundImage = `url(${imageUrl})`;
          newElement.style.backgroundSize = "cover";
          parentElement.appendChild(newElement);
        });
      })
      .catch((err) => console.error(err));
  };

  const showHistoryMovies = () => {
    console.log("here");
    let historyMovies = [];
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=36",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        historyMovies = response.results;
        console.log("Hello");
        console.log(historyMovies);
        const parentElement = document.getElementById("history-movies");
  
        historyMovies.forEach((movie) => {
          console.log("innercard");
          const newElement = document.createElement("div");
          newElement.className = "innercard";
          const imageUrl =
            "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
          console.log(imageUrl);
          newElement.style.backgroundImage = `url(${imageUrl})`;
          newElement.style.backgroundSize = "cover";
          parentElement.appendChild(newElement);
        });
      })
      .catch((err) => console.error(err));
  };

  const showThrillerMovies = () => {
    console.log("here");
    let thrillerMovies = [];
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        thrillerMovies = response.results;
        console.log("Hello");
        console.log(thrillerMovies);
        const parentElement = document.getElementById("thriller-movies");
  
        thrillerMovies.forEach((movie) => {
          console.log("innercard");
          const newElement = document.createElement("div");
          newElement.className = "innercard";
          const imageUrl =
            "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
          console.log(imageUrl);
          newElement.style.backgroundImage = `url(${imageUrl})`;
          newElement.style.backgroundSize = "cover";
          parentElement.appendChild(newElement);
        });
      })
      .catch((err) => console.error(err));
  };
