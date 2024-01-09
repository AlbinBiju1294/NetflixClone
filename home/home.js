import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  arrayUnion,
  updateDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig } from "../script/config.js";
import { getOptions } from "../script/tmdbkeys.js";

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const colRef = collection(db, "profileCollection");
const docRef = doc(colRef, `${localStorage.getItem("userId")}`);
const options = getOptions;

//base urls for tmdb api
export const baseUrl = "https://api.themoviedb.org/3/";
export const baseImageUrl = "https://image.tmdb.org/t/p/original";

//definitions end

//onloading the page we call the given functions to display content
window.onload = () => {
  loadBannerImages();
  setNavbarProfiles();
  showWatchHistory();
  showWatchList();
  showContent("trending/all/day?language=en-US", "trending-all");
  showContent("movie/popular?language=en-US&page=1", "popular-movies");
  showContent("tv/popular?language=en-US&page=1", "popular-series");
  showContent(
    "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12",
    "adventure-movies"
  );
  showContent(
    "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28",
    "action-movies"
  );
  showContent(
    "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749",
    "romantic-movies"
  );
  showContent(
    "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=36",
    "history-movies"
  );
  showContent(
    "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53",
    "thriller-movies"
  );
  showContent(
    "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35",
    "comedy-movies"
  );
};

//navbar dropdown functions
document.getElementById("dropdownBtn").addEventListener("click", () => {
  toggleDropdown();
});

function toggleDropdown() {
  const dropdownContent = document.getElementById("dropdownContent");
  const arrowIcon = document.getElementById("arrowButton");

  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    arrowIcon.className = "bi bi-caret-down-fill arrow";
  } else {
    dropdownContent.style.display = "block";
    arrowIcon.className = "bi bi-caret-up-fill arrow";
  }
}
// end

//adding images to banners
const loadBannerImages = () => {
  let imageSpecificUrl = "trending/all/day?language=en-US";
  let bannerContent = [];
  fetch(baseUrl + imageSpecificUrl, options)
    .then((response) => response.json())
    .then((response) => {
      bannerContent = response.results;
      const imageIdOne = document.getElementById("bannerImage1");
      const imageIdTwo = document.getElementById("bannerImage2");
      const imageIdThree = document.getElementById("bannerImage3");
      const imageUrl1 = baseImageUrl + bannerContent[0].backdrop_path;
      console.log(imageUrl1);
      imageIdOne.setAttribute("src", imageUrl1);
      document.getElementById("firstBannerTitle").innerText =
        bannerContent[0].original_title;
      document.getElementById("secondBannerTitle").innerText =
        bannerContent[1].original_title;
      document.getElementById("thirdBannerTitle").innerText =
        bannerContent[2].original_title;
      document.getElementById("firstBannerOverview").innerText =
        bannerContent[0].overview;
      document.getElementById("secondBannerOverview").innerText =
        bannerContent[1].overview;
      document.getElementById("thirdBannerOverview").innerText =
        bannerContent[2].overview;
      const imageUrl2 = baseImageUrl + bannerContent[1].backdrop_path;
      console.log(imageUrl2);
      imageIdTwo.setAttribute("src", imageUrl2);
      const imageUrl3 = baseImageUrl + bannerContent[2].backdrop_path;
      imageIdThree.setAttribute("src", imageUrl3);
    })
    .catch((err) => console.error(err));
};

//function to change background colour of navbar on scroll
window.addEventListener("scroll", function () {
  var navbarSelector = document.getElementById("navbarselector");
  if (window.scrollY > 50) {
    navbarSelector.style.backgroundColor = "black";
  } else {
    navbarSelector.style.backgroundColor = "transparent";
  }
});

document.getElementById("searchIcon").addEventListener("click", () => {
  setSearchKeyword();
});

//end

//Setting search word
export const setSearchKeyword = () => {
  let searchKeyword = document.getElementById("searchbox").value;
  localStorage.setItem("searchKeyword", searchKeyword);
  window.location.href = "../search/search.html";
};
//end

//showContent function receives the fetch url and the element id to which the content needs to be inserted
export const showContent = (url, elementId) => {
  let content = [];
  fetch(baseUrl + url, options)
    .then((response) => response.json())
    .then((response) => {
      content = response.results;
      const parentElement = document.getElementById(elementId);
      const exploreId = elementId + "-span";
      console.log(exploreId);
      document.getElementById(`${exploreId}`).addEventListener("click", () => {
        generateExploreMore(content);
      });
      generateInnerCard(parentElement, content);
    })
    .catch((err) => console.error(err));
};
//end

//generating innercard
export const generateInnerCard = (parentElement, content) => {
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
    // for video

    // const itemId = item.id;
    // let videoKey;
    // try {
    //   const response = await fetch(
    //     `https://api.themoviedb.org/3/movie/${itemId}/videos?language=en-US`,
    //     getOptions
    //   );
    //   const data = await response.json();

    //   if (data.results && data.results.length > 0) {
    //     videoKey = data.results[0].key;
    //     // You can use the videoKey here as needed
    //   } else {
    //     console.error("No video results found");
    //   }
    // } catch (err) {
    //   console.error(err);
    // }

    // console.log(videoKey);

    // const videoFrame = document.createElement("iframe");
    // videoFrame.allow = "autoplay";
    // videoFrame.className = "videocard";
    // console.log(
    //   `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1`
    // );
    // videoFrame.src = `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`;
    // videoFrame.autoplay = true;
    // videoFrame.style.width = "260px";
    // videoFrame.style.height = "150px";
    // videoFrame.style.objectFit = "cover";
    // videoFrame.style.display = "none";
    // end
    const imageUrl = baseImageUrl + item.backdrop_path;
    newElement.style.backgroundImage = `url(${imageUrl})`;
    newElement.style.backgroundSize = "cover";
    newElement.innerHTML = `<div class="movie-info"><p class="movie-title">${
      availabletitle
    }</p><p class="movie-title">Language:${
      item.original_language
    }</p><p class="movie-popularity" style="width: 250px;">Release Date:${
      item.release_date
    }</p><div class="PWbuttons"><i class="bi bi-play-circle-fill playbutton" id="playbutton${
      item.id
    }"></i><i class="bi bi-plus-circle plusbutton" id="plusbutton${
      item.id
    }"></i><i class="bi bi-info-circle infobutton" id="infobutton${
      item.id
    }"></i></div></div>`;
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
    newElement
      .querySelector(`#infobutton${item.id}`)
      .addEventListener("click", () => {
        showContentDetails(item);
      });
    //video function

    // newElement.addEventListener("mouseenter", () => {
    //   videoFrame.style.display = "block";
    // });

    // newElement.addEventListener("mouseleave", () => {
    //   newElement.style.backgroundImage = `url(${imageUrl})`;
    //   videoFrame.style.display = "none";
    // });
    // newElement.appendChild(videoFrame);

    // end
    parentElement.appendChild(newElement);
  });
};

// showing individual content details
export const showContentDetails = (item) => {
  const moreInfoPage = document.getElementById("moreInfoPageId");
  const imageUrl = baseImageUrl + item.backdrop_path;
  document.getElementById(
    "contentPosterImageId"
  ).style.backgroundImage = `url(${imageUrl})`;
  document.getElementById("contentTitleId").innerText = item.original_title;
  document.getElementById("contentOverviewId").innerText = item.overview;
  document.getElementById("contentReleaseDateId").innerText = item.release_date;
  document.getElementById("contentLanguageId").innerText =
    item.original_language;
  document.getElementById("overlayId").style.display = "block";
  moreInfoPage.style.display = "block";
  moreInfoPage.style.opacity = 1;
  document
    .getElementById("moreInfoCloseButtonId")
    .addEventListener("click", () => {
      closeMoreInfoPage();
    });
};

//generating explore more pop up
export const generateExploreMore = (content) => {
  const exploreContentDiv = document.getElementById("exploreContentId");
  content.forEach((item) => {
    const newElement = document.createElement("div");
    newElement.className = "innercard";
    const imageUrl = baseImageUrl + item.backdrop_path;
    newElement.style.backgroundImage = `url(${imageUrl})`;
    newElement.style.backgroundSize = "cover";
    newElement.innerHTML = `<div class="movie-info"><p class="movie-title">${
      item.original_title ? item.original_title : item.name
    }</p><p class="movie-title">Language:${
      item.original_language
    }</p><p class="movie-popularity" style="width: 250px;">Release Date:${
      item.release_date
    }</p><div class="PWbuttons"><i class="bi bi-play-circle-fill playbutton" id="playbutton${
      item.id
    }"></i><i class="bi bi-plus-circle plusbutton" id="plusbutton${
      item.id
    }"></i></div></div>`;
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
    exploreContentDiv.appendChild(newElement);
  });
  document.getElementById("overlayId").style.display = "block";
  document.getElementById("exploreMoreId").style.display = "block";
  document.getElementById("exploreMoreId").style.opacity = 1;
  document.getElementById("closeButtonId").addEventListener("click", () => {
    closeExploreContent();
  });
};
//end

//adding clicked item to watchHistory
export const addHistory = async (item) => {
  const collection2 = collection(docRef, "profiles");
  const document2 = doc(collection2, `${localStorage.getItem("profile")}`);
  const unionRes = await updateDoc(document2, {
    watchHistory: arrayUnion(item),
  });
  window.location.href = "../video/video.html";
  showWatchHistory();
};
//end

// onclicking the play button the movie or tvshow item gets stored in the watch list
export const addList = async (item) => {
  const collection2 = collection(docRef, "profiles");
  const document2 = doc(collection2, `${localStorage.getItem("profile")}`);
  const unionRes = await updateDoc(document2, {
    watchList: arrayUnion(item),
  });
  showWatchList();
};
//end

//function for showing the watch history
const showWatchHistory = async () => {
  let content = [];
  const parentElement = document.getElementById("watch-history");

  const collection2 = collection(docRef, "profiles");
  const document2 = doc(collection2, `${localStorage.getItem("profile")}`);
  const newDoc = await getDoc(document2);
  content = newDoc.data().watchHistory;
  console.log(content);

  generateInnerCard(parentElement, content);
};
//end

// function for showing the watch list
const showWatchList = async () => {
  let content = [];
  const parentElement = document.getElementById("watch-list");

  const collection2 = collection(docRef, "profiles");
  const document2 = doc(collection2, `${localStorage.getItem("profile")}`);
  const newDoc = await getDoc(document2);
  console.log(newDoc);
  content = newDoc.data().watchList;
  console.log(content);

  generateInnerCard(parentElement, content);
};
//end

// for appending profiles
export const setNavbarProfiles = async () => {
  const colRef = collection(db, "profileCollection");
  const docRef = doc(colRef, `${localStorage.getItem("userId")}`);
  const querySnapshot = await getDocs(collection(docRef, "profiles"));
  const parentElement = document.getElementById("profileDivId");
  querySnapshot.forEach((doc) => {
    console.log(doc.data().name);
    if (localStorage.getItem("profile") === doc.data().name) {
      console.log("hello");
      document.getElementsByClassName("Navbarprofileicon")[0].id = `${
        doc.data().profileImageId
      }`;
    }
    const childElement = document.createElement("a");
    childElement.className = "profileAnchor";
    childElement.innerHTML = `<div class="outerNavbarProfile"><div class="profileimage bg-primary" id="${
      doc.data().profileImageId
    }"></div><p class="iconimagep">${doc.data().name}</p></div>`;
    childElement.addEventListener("click", () => {
      localStorage.setItem("profile", doc.id);
      window.location.href = "../home/home.html";
    });
    parentElement.appendChild(childElement);
  });
};
//end

//signout function
document.getElementById("signOutLink").addEventListener("click", () => {
  signOut();
});

export const signOut = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("profile");
  window.location.href = "../htmlpages/login.html";
};
//end

//closing the more explore content
export const closeExploreContent = () => {
  document.getElementById("overlayId").style.display = "none";
  console.log("Entered");
  const exploreContentDiv = document.getElementById("exploreContentId");
  exploreContentDiv.innerHTML = "";
  document.getElementById("exploreMoreId").style.display = "none";
  document.getElementById("exploreMoreId").style.opacity = 0;
};
//end

// closing more info page
export const closeMoreInfoPage = () => {
  document.getElementById("overlayId").style.display = "none";
  const moreInfoPage = document.getElementById("moreInfoPageId");
  moreInfoPage.style.display = "none";
  moreInfoPage.style.opacity = 0;
};
