const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWM2Yzk2Mjk4YTU4MzE4MjIxMDIwOTgxYzk2MWM2ZSIsInN1YiI6IjY1ODE2Y2E0YmYwZjYzMDg3NTYyYmMyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5ycbZ0CTuLq1Qk_AIXruaSZg-L8n8DdCiF-k9_Z8MEU'
    }
  };
  window.onload=()=>{
    showAllMovies();
    showUpcomingMovies();
    showTopMovies();
    showPopularMovies();
    
  }
const showAllMovies = () => {
    console.log("here");
    let historyMovies = [];
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        historyMovies = response.results;
        console.log("Hello");
        console.log(historyMovies);
        const parentElement = document.getElementById("allmovie");
 
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
 const showUpcomingMovies = () => {
    console.log("here");
    let historyMovies = [];
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        historyMovies = response.results;
        console.log("Hello");
        console.log(historyMovies);
        const parentElement = document.getElementById("upcomingmovie");
 
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

   const showTopMovies = () => {
    console.log("here");
    let historyMovies = [];
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        historyMovies = response.results;
        console.log("Hello");
        console.log(historyMovies);
        const parentElement = document.getElementById("topmovie");
 
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
  const showPopularMovies = () => {
    console.log("here");
    let historyMovies = [];
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        historyMovies = response.results;
        console.log("Hello");
        console.log(historyMovies);
        const parentElement = document.getElementById("popularmovie");
 
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