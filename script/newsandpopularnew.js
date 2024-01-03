

// import options from './config.js'; // Importing the default export from config.js

// console.log("nsjn  " +options)

const dynamicImages=[]
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTE3OTg4MzMyOTg2NmIwMzVjNGEyYzc1NjJmZmNkMCIsInN1YiI6IjY1ODE4ZWNkZDUxOTFmMDhhNGFlMWIyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7D9t0FdYo_NqaFsELFkSVFcyfv-WlRwMSkmx0v_HYrA'
  }
};


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
//   function toptenShows(showspath,numcrpimg,elementdiv)
// {
//     const cardContainer = document.getElementById(elementdiv);

//     const cardHtml = `
//       <div class="card">
//         <div class="card-body">
//           <img src="${showspath}" class="card-img-top" id="topshowsimg">
//           <img src="${numcrpimg}" class="card-img-top" id="numcrpimg">
//         </div>
//       </div>
//     `;

//     // Append the card HTML to the container
//     cardContainer.innerHTML += cardHtml;

// }

  




  window.onload= () =>{
    for(let i=0;i<6;i++)
    {
        apicall(apiFetches[i],containerDivs[i]);
       
    }
      // for(let i=0;i<5;i++){
      //   toptenShows(numimgpaths[i],imagePaths[i],'showscontainer')
      //   toptenShows(numimgpaths[i],dynamicImages[i],'moviesContainer')
        
      // }
   
  }

 

const apiFetches=[
  

    
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    "https://api.themoviedb.org/3/trending/all/day?language=en-US"
]

const containerDivs=[
    "cardContainer",
    "worthWaitContainer",
    "nextWeekContainer",
    "comingThisWeekContainer",
    "showscontainer",
    "moviesContainer",
    "toptestinner"

]


let counter=0;
var k=0;
   const apicall = (apiUrl,containerDiv) => {
    console.log("here");
    let apicall = [];
    fetch(
      apiUrl,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        apicall = response.results;
        console.log("Hello");
        console.log(apicall);
        const parentElement = document.getElementById(containerDiv);
        
       apicall.forEach((movie) => {
        
          console.log("innercard");


          
         

          const cardElement = document.createElement("div");
          cardElement.className = "innercard"; // Use the "innercard" class
          const imageUrl = "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
          console.log(imageUrl);
          cardElement.style.backgroundImage = `url(${imageUrl})`;
          cardElement.style.backgroundSize = "cover";
          
          // Create description elements
          const descriptionContainer = document.createElement("div");
          descriptionContainer.className = "description";
          const titleElement = document.createElement("h3");
          titleElement.textContent = "Title"; // Set the title text content
          const descriptionElement = document.createElement("p");
          descriptionElement.textContent =
            "Additional description goes here. This is some more information about the card.";
          
          // Append description elements to the "innercard" element
          descriptionContainer.appendChild(titleElement);
          descriptionContainer.appendChild(descriptionElement);
          cardElement.appendChild(descriptionContainer);
          
          // Append the "innercard" element to the parent container
          parentElement.appendChild(cardElement);
          
          
          
          
          
        });
      })
      .catch((err) => console.error(err));
    
  };



  