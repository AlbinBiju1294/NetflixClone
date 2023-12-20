// function createCard(cardNumber,imagePath) {
//     const cardContainer = document.getElementById('cardContainer');

//     const cardHtml = `
//       <div class="card">
//         <div class="card-body">
//           <img src="${imagePath}" class="card-img-top" alt="Image for Card ${cardNumber}" id="cardimg">
         
          
//         </div>
//       </div>
//     `;

//     cardContainer.innerHTML += cardHtml;
//   }



  const imagePaths = [
    "../assets/leo1.jpg",
    "../assets/japan.jpg",
    "../assets/leo2.jpg",
    "../assets/jigar.jpg",
    "../assets/shesham.jpg"
  ];

  // Loop to create five cards
  // for (let i = 1; i <= 5; i++) {
  //   createCard(i,imagePaths[i-1]);
  // }

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

const numcrpimg=[
  "	https://occ-0-5452-3662.1.nflxso.net/dnm/api/v6/WNXvwmBb8WUeFCw5votVRuO1ZMUhRI8q7sQcm80mg.jpg?r=6fa",
  "	https://occ-0-5452-3662.1.nflxso.net/dnm/api/v6/WN…Lf5_Y7vovT9E3H52kySnc_pJTsa_KwHUNE7vBAA.jpg?r=002",
  "	https://occ-0-5452-3662.1.nflxso.net/dnm/api/v6/WN…lsVbWz_UmRRFC4GA9GCS7XTnKtmFGWk8CXd41qg.jpg?r=e3c",
  "	https://occ-0-5452-3662.1.nflxso.net/dnm/api/v6/WN…NsSFyBRxb2h8MqIKBtHWPqUqX077o_6l-WEF_-w.jpg?r=d1d",

  
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







  function topMovies(showspath,numcrpimg)
{
    const cardContainer = document.getElementById('moviescontainer');

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
    topMovies(numimgpaths[i],imagePaths[i])
    
  }


  function nextWeek(imagePath) {
    const cardContainer = document.getElementById('nextweekcontainer');

    const cardHtml = `
      <div class="card">
        <div class="card-body">
          <img src="${imagePath}" class="card-img-top" id="topmoviesimg">
         
          
        </div>
      </div>
    `;

    cardContainer.innerHTML += cardHtml;
  }
  for(let i=0;i<5;i++){
    nextWeek(imagePaths[i])
    
  }


  function worthwait(imagePath) {
    const cardContainer = document.getElementById('worthwaitcontainer');

    const cardHtml = `
      <div class="card">
        <div class="card-body">
          <img src="${imagePath}" class="card-img-top" id="topmoviesimg">
         
          
        </div>
      </div>
    `;

    cardContainer.innerHTML += cardHtml;
  }
  for(let i=0;i<5;i++){
    worthwait(imagePaths[i])
    
  }




  function comingthisweek(imagePath) {
    const cardContainer = document.getElementById('comingthisweekcontainer');

    const cardHtml = `
      <div class="card">
        <div class="card-body">
          <img src="${imagePath}" class="card-img-top" id="topmoviesimg">
         
          
        </div>
      </div>
    `;

    cardContainer.innerHTML += cardHtml;
  }
  for(let i=0;i<5;i++){
    comingthisweek(imagePaths[i])
    
  }





  window.onload= () =>{
    showHistoryMovies();
    worthWaiting();
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
      fetch("https://api.themoviedb.org/3/movie/movie_id/recommendations?language=en-US&page=1",options)
      .then((response) => response.json())
      .then((response) => {
        worthMovies = response.results;
        console.log("Hello");
        console.log(worthMovies);
        const parentElement = document.getElementById('worthwaitcontainer');
 
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



