import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"; 
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; 

const firebaseConfig = {
  apiKey: "AIzaSyAcbi3_oCi8ZvIaVJCo_nity5rZnjpObow",
  authDomain: "netflixclone-28d52.firebaseapp.com",
  projectId: "netflixclone-28d52",
  storageBucket: "netflixclone-28d52.appspot.com",
  messagingSenderId: "478121105015",
  appId: "1:478121105015:web:f14cdfd963421075805872"
};
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

const emailGet = document.getElementById("email-signup");
const passwordGet= document.getElementById("password-signup");
const buttonGet = document.getElementById("create-acct-btn");
var signupEmail, signupPassword;
buttonGet.addEventListener("click", function(event) {
  event.preventDefault();
  
  var isVerified = true;

  signupEmail = emailGet.value;
  signupPassword = passwordGet.value;
  
  if(signupEmail == null || signupPassword == null) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  console.log(signupEmail);
  console.log(signupPassword);
  
  if(isVerified) {
      createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
          .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              console.log(user.uid);
             
              window.alert("Success! Account created.");
              window.location.href='../htmlpages/home.html'
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              if (errorCode === 'auth/email-already-in-use') {
                  window.alert("Email address already exists. Try Signing in.");
                  window.location.href='../htmlpages/login.html'
              } else {
                  window.alert("Error occurred. Try again.");
              }
          });
  }
});
