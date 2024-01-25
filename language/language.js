import { setNavbarProfiles,setSearchKeyword } from "../home/home.js";


setNavbarProfiles();

document.getElementById('searchIcon').addEventListener('click',() => {
  setSearchKeyword();
})
