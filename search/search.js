import { getOptions } from "../signup/config.js";
import {
  baseImageUrl,
  baseUrl,
  setNavbarProfiles,
} from "../home/home.js";

window.onload = () => {
  setNavbarProfiles();
  document.getElementById("advancedsearchbox").value =
    localStorage.getItem("searchKeyword");
  searchMoviesAndShows(localStorage.getItem("searchKeyword"));
};

document
  .getElementById("advancedsearchbutton")
  .addEventListener("click", () => {
    searchMoviesAndShows(document.getElementById("advancedsearchbox").value);
  });

const searchMoviesAndShows = (searchKeyword) => {
  document.getElementById("filteredcontent").innerHTML = "";
  let content = [];
  fetch(
    baseUrl +
      `search/multi?query=${searchKeyword}&include_adult=false&language=en-US&page=1`,
    getOptions
  )
    .then((response) => response.json())
    .then((response) => {
      content = response.results;
      const parentElement = document.getElementById("filteredcontent");

      content.forEach(async (item) => {
        const newElement = document.createElement("div");
        newElement.className = "innercard";
        let availabletitle = "";
        if (item.name) {
          availabletitle = item.name;
        } else if (item.title) {
          availabletitle = item.title;
        } else if (item.original_title) {
          availabletitle = item.original_title;
        } else if (item.original_name) {
          availabletitle = item.original_name;
        }

        let posterImage = "";
        if (item.backdrop_path) {
          posterImage = item.backdrop_path;
        } else {
          posterImage = item.poster_path;
        }

        const itemId = item.id;
        let videoKey;

        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${itemId}/videos?language=en-US`,
            getOptions
          );
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            videoKey = data.results[0].key;
            // You can use the videoKey here as needed
          } else {
            console.error("No video results found");
          }
        } catch (err) {
          console.error(err);
        }

        console.log(videoKey);

        const videoFrame = document.createElement("iframe");
        videoFrame.allow = "autoplay";
        videoFrame.className = "videocard";
        console.log(
          `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1`
        );
        videoFrame.src = `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`;
        videoFrame.autoplay = true;
        videoFrame.style.width = "260px";
        videoFrame.style.height = "150px";
        videoFrame.style.objectFit = "cover";
        videoFrame.style.display = "none";
        const imageUrl = baseImageUrl + posterImage;
        newElement.style.backgroundImage = `url(${imageUrl})`;
        newElement.style.backgroundSize = "cover";
        newElement.innerHTML = `<div class="movie-info"><p class="movie-title">${availabletitle}</p><p class="movie-title">Language:${item.original_language}</p><p class="movie-popularity" style="width: 250px;">Release Date:${item.release_date}</p><div class="PWbuttons"><i class="bi bi-play-circle-fill playbutton" id="playbutton${item.id}"></i><i class="bi bi-plus-circle plusbutton" id="plusbutton${item.id}"></i></div></div>`;
        newElement
          .querySelector(`#playbutton${item.id}`)
          .addEventListener("click", () => {
            addHistory(item);
          });
        newElement
          .querySelector(`#plusbutton${item.id}`)
          .addEventListener("click", () => {
            addList(item);
          });

        newElement.addEventListener("mouseenter", () => {
          videoFrame.style.display = "block";
        });

        newElement.addEventListener("mouseleave", () => {
          newElement.style.backgroundImage = `url(${imageUrl})`;
          videoFrame.style.display = "none";
        });
        newElement.appendChild(videoFrame);
        parentElement.appendChild(newElement);
      });
    })
    .catch((err) => console.error(err));
};
