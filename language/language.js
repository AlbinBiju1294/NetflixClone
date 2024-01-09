import { setNavbarProfiles,setSearchKeyword } from "../home/home.js";
import { getOptions } from "../script/tmdbkeys.js";

const options = getOptions;


setNavbarProfiles();

document.getElementById('searchIcon').addEventListener('click',() => {
  setSearchKeyword();
})
