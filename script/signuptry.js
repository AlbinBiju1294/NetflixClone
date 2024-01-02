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

const signupEmailIn = document.getElementById("email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const createacctbtn = document.getElementById("create-acct-btn");


var signupEmail, signupPassword;

createacctbtn.addEventListener("click", function(event) {
    event.preventDefault();
    
    var isVerified = true;

    signupEmail = signupEmailIn.value;
    signupPassword = signupPasswordIn.value;
    
    if(signupEmail == null || signupPassword == null) {
      window.alert("Please fill out all required fields.");
      isVerified = false;
    }

    console.log(signupEmail);
    console.log(signupPassword);
    
    if(isVerified) 
    {
        if(true)    //Put condition here
        {
            createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
              .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              console.log(user.uid);
              // ...
              window.alert("Success! Account created.");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
              window.alert("Error occurred. Try again.");
            });
        }
        else
        {
            console.log("Your program sucks!!");
        }
    }
    
  });