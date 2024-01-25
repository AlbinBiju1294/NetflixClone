var _a;
var options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdhZDgwMjUxNDdlZThkY2ZiYjZjY2ZiNTIxNDMzNCIsInN1YiI6IjYzN2E0ZDgwOTc2ZTQ4MDBiNDU1ZDI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iz4uW_emM4tQei3loe66oPYe0Te_HpcSKpfj8u921fk",
    },
};
window.onload = function () {
    selectLanguage();
};
(_a = document.getElementById('selectlang')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () {
    selectLanguage();
});
var selectLanguage = function () {
    var language = document.getElementById('selectlang').value;
    filterByLanguage(language);
};
var filterByLanguage = function (language) {
    var filteredMovies = [];
    fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=".concat(language), options)
        .then(function (response) { return response.json(); })
        .then(function (response) {
        filteredMovies = response.results;
        console.log(filteredMovies);
        var parentElement = document.getElementById("filteredcontent");
        if (parentElement) {
            parentElement.innerHTML = '';
            filteredMovies.forEach(function (item) {
                var newElement = document.createElement("div");
                var newTitle = document.createElement("p");
                newTitle.innerText = "".concat(item.title);
                newTitle.className = "cardtitle";
                newElement.appendChild(newTitle);
                newElement.className = "innercard";
                var imageUrl = "https://image.tmdb.org/t/p/original" + item.backdrop_path;
                console.log(imageUrl);
                newElement.style.backgroundImage = "url(".concat(imageUrl, ")");
                newElement.style.backgroundSize = "cover";
                newElement.innerHTML = "<div class=\"movie-info\"><p class=\"movie-title\">".concat(item.title, "</p><p class=\"movie-title\">Language:").concat(item.original_language, "</p><p class=\"movie-popularity\" style=\"width: 250px;\">Release Date:").concat(item.release_date, "</p><div class=\"PWbuttons\"><i class=\"bi bi-play-circle-fill playbutton\" id=\"playbutton").concat(item.id, "\"></i></div></div>");
                newElement
                    .querySelector("#playbutton".concat(item.id))
                    .addEventListener("click", function () {
                    window.location.href = '../video/video.html';
                });
                if (parentElement) {
                    parentElement.appendChild(newElement);
                }
            });
        }
    })
        .catch(function (err) { return console.error(err); });
};
