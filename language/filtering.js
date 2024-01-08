const getOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdhZDgwMjUxNDdlZThkY2ZiYjZjY2ZiNTIxNDMzNCIsInN1YiI6IjYzN2E0ZDgwOTc2ZTQ4MDBiNDU1ZDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iz4uW_emM4tQei3loe66oPYe0Te_HpcSKpfj8u921fk",
    },
  };


window.onload = () => {
    selectLanguage();
}

document.getElementById('selectlang').addEventListener('change',() => {
    selectLanguage();
})

const selectLanguage = () => {
    let language = document.getElementById('selectlang').value;
    filterByLanguage(language);
}

const filterByLanguage = (language) =>{
    let filteredMovies = [];
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=${language}`,
      getOptions
    )
      .then((response) => response.json())
      .then((response) => {
        filteredMovies = response.results;
        console.log(filteredMovies);
        const parentElement = document.getElementById("filteredcontent");
        parentElement.innerHTML = '';
        filteredMovies.forEach((item) => {
            console.log(item);
          const newElement = document.createElement("div");
          const newTitle = document.createElement("p");
          newTitle.innerText = `${item.title}`;
          newTitle.className = "cardtitle";
          newElement.appendChild(newTitle);
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
}