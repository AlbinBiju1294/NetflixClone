var elementIds = [
    'signin_button_id',
    'landing_text_getstart_headline',
    'landing_text_getstart_line2',
    'landing_text_getstart_line3',
    'getstart_buttonid',
    'tvoutside_text_headline',
    'tvoutside_text_line2',
    'strangerThings_text_download',
    'mobileoutside_text_headline',
    'mobileoutside_text_line2',
    'tvmobileoutside_text_headline',
    'tvmobileoutside_text_line2',
    'childrenoutside_text_headline',
    'childrenoutside_text_line2',
    'question_text_headline',
    'frequent_questions_question1',
    'frequent_questions_question1_content',
    'frequent_questions_question2',
    'frequent_questions_question2_content',
    'frequent_questions_question3',
    'frequent_questions_question3_content',
    'frequent_questions_question4',
    'frequent_questions_question4_content',
    'frequent_questions_question5',
    'frequent_questions_question5_content',
    'frequent_questions_question6',
    'frequent_questions_question6_content',
    'question_container_outside_text',
    'getstart_buttonid_end',
    'footer_text_call',
    'col1_item2',
    'col1_item3',
    'col1_item4',
    'col2_item1',
    'col2_item2',
    'col2_item3',
    'col2_item4',
    'col3_item1',
    'col3_item2',
    'col3_item3',
    'col3_item4',
    'col4_item1',
    'col4_item2',
    'col4_item3',
    'nav_home',
    'nav_tvshows',
    'nav_movies',
    'nav_newpopular',
    'nav_mylist',
    'nav_browse',
    'movieid',
    'genre',
    'horror',
    'romantic',
    'comedy',
    'action',
    'adventure',
    'history',
    'thriller',
    'category_movies',
    'movies_exploreall',
    'category_upcoming',
    'upcoming_exploreall',
    'category_toprated',
    'top_exploreall',
    'category_popularmovie',
    'popular_exploreall',
    'footer_col1_item1',
    'footer_col1_item2',
    'footer_col1_item3',
    'footer_col2_item1',
    'footer_col2_item2',
    'footer_col2_item3',
    'footer_col3_item1',
    'footer_col3_item2',
    'footer_col3_item3',
    'footer_col4_item1',
    'footer_col4_item2',
    'footer_col4_item3',
    'servicebutton_id',
    'lastp_id',
    'title',
    'head',
    'popular',
    'nowplaying',
    'top',
    'upc',
    'signIn_head',
    'remember_me',
    'need_help',
    'signUpNow',
    'page_endLine',
    'signUp_head',
    'mainhead_line1',
    'mainhead_line2',
    'fewmoresteps',
    'yourname_id',
    'emailentryfield_id',
    'passwordEntryField_id',
    'getOtp',
    'otpLabel',
    'remember-me',
    'trending',
    'watchhistory',
    'mylist',
    'popularmovies',
    'popularseries',
    'actionmovies',
    'adventuremovies',
    'romanticmovies',
    'historymovies',
    'thrillermovies'
];
function checkLocalStorage() {
    var storedValue = localStorage.getItem('languageSelected');
    if (storedValue) {
        console.log("entered if ");
        languageChange(storedValue);
    }
    else {
        console.log('Value is not set or not true in local storage.');
    }
}
checkLocalStorage();
var languagedropdown = document.getElementById('languageselect_dropdown');
var language = languagedropdown.options[languagedropdown.selectedIndex].value;
function languageChange(language) {
    localStorage.setItem('languageSelected', language);
    fetch("../JSON/".concat(language, ".json"))
        .then(function (response) { return response.json(); })
        .then(function (language) {
        elementIds.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                element.textContent = language === null || language === void 0 ? void 0 : language[id];
            }
        });
    })
        .catch(function (error) { return console.error('Error fetching data:', error); });
}
