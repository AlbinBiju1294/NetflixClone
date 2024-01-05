import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"; 
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; 
import { sendEmailSender } from "./email.js";

import { firebaseConfig } from "./config.js";
import {returnOTP} from "./email.js";
const otp=returnOTP();



  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

const emailGet = document.getElementById("email-signup");
const passwordGet= document.getElementById("password-signup");
const buttonGet = document.getElementById("create-acct-btn");
const userNameGet=document.getElementById("usersname")
const checkOtp=document.getElementById('otp-signup');

var signupEmail, signupPassword,userName;
buttonGet.addEventListener("click", function(event) {
  event.preventDefault();
  

  
  var isVerified = true;

  signupEmail = emailGet.value;
  signupPassword = passwordGet.value;

  userName=userNameGet.value;

  
  if(signupEmail == null || signupPassword == null) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }


  if(isVerified && checkOtp.value==otp) {
      createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
          .then((userCredential) => {
            localStorage.setItem("successKey","true");
     
              const user = userCredential.user;             
             sendEmailSender(signupEmail,userName);
              
            const videoElement = document.createElement("video");
            videoElement.id='videosign'
            videoElement.src = "../assets/netflixlogovideo.mp4";
            videoElement.autoplay = true;
            videoElement.loop = true;
            videoElement.muted = false;
            videoElement.playbackRate = 2;
            
            videoElement.style.width = "1150px";
            videoElement.style.height = "100vh";
            videoElement.style.position = "fixed";
            videoElement.style.top = "0";
            videoElement.style.left = "0";
            videoElement.style.zIndex = "9999";
            

         
            document.body.appendChild(videoElement);
            document.body.style.overflow="hidden";


              setTimeout(function() {
                window.location.href = '../htmlpages/login.html';
            }, 8000); 
            
          })
          .catch((error) => {
            
              const errorCode = error.code;
              const errorMessage = error.message;

              if (errorCode === 'auth/email-already-in-use') {
                  window.alert("Email address already exists. Try Signing in.");
                  window.location.href='../htmlpages/login.html'
              } 
              
              else {
                  window.alert("Error occurred. Try again.");
              }
          });
  }
  else{
    window.alert("Otp Wrong.")
  }
});
