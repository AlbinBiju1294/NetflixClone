


  const imagePaths = [
    "../assets/leo1.jpg",
    "../assets/japan.jpg",
    "../assets/leo2.jpg",
    "../assets/jigar.jpg",
    "../assets/shesham.jpg"
  ];



  const  numimgpaths=[
    "../assets/oneblock.png",
    "../assets/2block.png",
    "../assets/3block.png",
    "../assets/4block.png",
    "../assets/5block.png",
    "../assets/6block.png",
    "../assets/7block.png",
    "../assets/8block.png",
    "../assets/9block.png",
    "../assets/10block.png"
  ]
  
  
  function toptenShows(showspath,numcrpimg)
{
    const cardContainer = document.getElementById('showscontainer');

    const cardHtml = `
      <div class="card">
        <div class="card-body">
          <img src="${showspath}" class="card-img-top" id="topshowsimg">
          <img src="${numcrpimg}" class="card-img-top" id="numcrpimg">
        </div>
      </div>
    `;

    // Append the card HTML to the container
    cardContainer.innerHTML += cardHtml;

}
  for(let i=0;i<5;i++){
    toptenShows(numimgpaths[i],imagePaths[i])
    
  }

 
  //calling functions
  window.onload= () =>{
    showHistoryMovies();
    worthWaiting();
    comingnextweek();
    comingthisweek1();
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTE3OTg4MzMyOTg2NmIwMzVjNGEyYzc1NjJmZmNkMCIsInN1YiI6IjY1ODE4ZWNkZDUxOTFmMDhhNGFlMWIyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7D9t0FdYo_NqaFsELFkSVFcyfv-WlRwMSkmx0v_HYrA'
    }
  };




  const showHistoryMovies = () => {
    console.log("here");
    let historyMovies = [];
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        historyMovies = response.results;
        console.log("Hello");
        console.log(historyMovies);
        const parentElement = document.getElementById('cardContainer');
 
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










  


  

  const worthWaiting = () => {
    console.log("here");
    let worthMovies = [];
      fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",options)
      .then((response) => response.json())
      .then((response) => {
        worthMovies = response.results;
        console.log("Hello");
        console.log(worthMovies);
        const parentElement = document.getElementById('worthWaitContainer');
 
        worthMovies.forEach((movie) => {
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






  // https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1
  // https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1
  // nextweekcontainer
  // comingthisweekcontainer
  // comingthisweek1
  

    

  const comingnextweek = () => {
    console.log("here");
    let worthMovies = [];
      fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",options)
      .then((response) => response.json())
      .then((response) => {
        worthMovies = response.results;
        console.log("Hello");
        console.log(worthMovies);
        const parentElement = document.getElementById('nextWeekContainer');
 
        worthMovies.forEach((movie) => {
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



  const comingthisweek1 = () => {
    console.log("here");
    let worthMovies = [];
      fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",options)
      .then((response) => response.json())
      .then((response) => {
        worthMovies = response.results;
        console.log("Hello");
        console.log(worthMovies);
        const parentElement = document.getElementById('comingThisWeekContainer');
 
        worthMovies.forEach((movie) => {
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

  function toptenmovies(showspath,numcrpimg)
  {
      const cardContainer = document.getElementById('moviesContainer');
  
      const cardHtml = `
        <div class="card">
          <div class="card-body">
            <img src="${showspath}" class="card-img-top" id="topshowsimg">
            <img src="${numcrpimg}" class="card-img-top" id="numcrpimg">
          </div>
        </div>
      `;
  
      // Append the card HTML to the container
      cardContainer.innerHTML += cardHtml;
  
  }
    for(let i=0;i<5;i++){
      toptenmovies(numimgpaths[i],imagePaths[i])
      
    }