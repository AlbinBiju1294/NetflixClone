const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdhZDgwMjUxNDdlZThkY2ZiYjZjY2ZiNTIxNDMzNCIsInN1YiI6IjYzN2E0ZDgwOTc2ZTQ4MDBiNDU1ZDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iz4uW_emM4tQei3loe66oPYe0Te_HpcSKpfj8u921fk",
    },
  };

window.onload = () => {
  showPopularMovies();
  showNowMovies();
  showTopRated();
  showUpcoming();
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

  const showNowMovies = () => {
    console.log("here");
    let popularMovies = [];
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        popularMovies = response.results;
        console.log(popularMovies);
        const parentElement = document.getElementById("now-playing");
   
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

  const showTopRated = () => {
    console.log("here");
    let popularMovies = [];
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        popularMovies = response.results;
        console.log(popularMovies);
        const parentElement = document.getElementById("top-rated");
   
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

  const showUpcoming = () => {
    console.log("here");
    let popularMovies = [];
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        popularMovies = response.results;
        console.log(popularMovies);
        const parentElement = document.getElementById("upcoming");
   
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
  

  