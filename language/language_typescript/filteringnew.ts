interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
  
  
  interface GetOptions {
    method: string;
    headers: {
      accept: string;
      Authorization: string;
    };
  }
  
  const options: GetOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdhZDgwMjUxNDdlZThkY2ZiYjZjY2ZiNTIxNDMzNCIsInN1YiI6IjYzN2E0ZDgwOTc2ZTQ4MDBiNDU1ZDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iz4uW_emM4tQei3loe66oPYe0Te_HpcSKpfj8u921fk",
    },
  };
  
  window.onload = () => {
    selectLanguage();
  };
  
  document.getElementById('selectlang')?.addEventListener('change', () => {
    selectLanguage();
  });
  
  const selectLanguage = () => {
    let language = (document.getElementById('selectlang') as HTMLSelectElement).value;
    filterByLanguage(language);
  };
  
  const filterByLanguage = (language: string) => {
    let filteredMovies: Movie[] = [];
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=${language}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        filteredMovies = response.results;
        console.log(filteredMovies);
        const parentElement = document.getElementById("filteredcontent");
        if (parentElement) {
          parentElement.innerHTML = '';
          filteredMovies.forEach((item: Movie) => {
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
            if (parentElement) {
              parentElement.appendChild(newElement);
            }
          });
        }
      })
      .catch((err) => console.error(err));
  };
  