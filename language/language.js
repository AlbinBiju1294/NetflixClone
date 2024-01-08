import { setNavbarProfiles,setSearchKeyword } from "../home/home.js";
import { getOptions } from "../script/tmdbkeys.js";

const options = getOptions;


setNavbarProfiles();


// document.getElementById('selectlang').addEventListener('change',() => {
//   selectLanguage();
// })

document.getElementById('searchIcon').addEventListener('click',() => {
  setSearchKeyword();
})
  
  
//   const selectLanguage = () => {
//     let language = document.getElementById('selectlang').value;
//     filterByLanguage(language);
// }

// const filterByLanguage = (language) =>{
//     let filteredMovies = [];
//     fetch(
//       `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=${language}`,
//       options
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         filteredMovies = response.results;
//         console.log(filteredMovies);
//         const parentElement = document.getElementById("filteredcontent");
//         parentElement.innerHTML = '';
//         filteredMovies.forEach((item) => {
//           const newElement = document.createElement("div");
//           const newTitle = document.createElement("p");
//           newTitle.innerText = `${item.title}`;
//           newTitle.className = "cardtitle";
//           newElement.appendChild(newTitle);
//           newElement.className = "innercard";
//           const imageUrl =
//             "https://image.tmdb.org/t/p/original" + item.backdrop_path;
//           console.log(imageUrl);
//           newElement.style.backgroundImage = `url(${imageUrl})`;
//           newElement.style.backgroundSize = "cover";
//           parentElement.appendChild(newElement);
//         });
//       })
//       .catch((err) => console.error(err));
// }