import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
function checktext(id1,id2){
    if(document.getElementById(id1).value==""){
        const holder= document.getElementById(id1);
        holder.style.borderColor="red";
        const msg=document.getElementById(id2);
        msg.innerHTML='⮾ Email is required.';
        msg.style.color="rgb(255, 0, 0)";
    }
    else{
        if(document.getElementById(id1).value!=="")
        {
            const emailInput = document.getElementById(id1);
            const email = emailInput.value;
            if (isValidEmail(email)) {
                console.log("valid email");
                
              }  
            else {
                const msg=document.getElementById(id2);
                msg.innerHTML='⮾ Enter valid email id';
                msg.style.color="rgb(255, 0, 0)";
                emailInput.style.borderColor="red";
              }

        }
            
    }
}

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

function emailAuthentication(id3,id4){
    const emailInput = document.getElementById(id3);
    const email = emailInput.value;

    if (!email) {
        checktext(id3,id4);
        console.log("Please enter an email.");
        return;
    }
    else if (!isValidEmail(email)) {
        checktext(id3, id4); 
        console.log("Enter a valid email id");
        return;
    }
    fetchSignInMethodsForEmail(auth, email)
        .then((signInMethods) => {
          localStorage.setItem('Email',email);
            if (signInMethods && signInMethods.length > 0) {
                console.log("Email exists. User can sign in.");
                location.href='../htmlpages/login.html';
            } else { 
                console.log("Email does not exist.");
                location.href='../htmlpages/signuptry.html';
            }
        })
        .catch((error) => {
            console.error("Error checking email existence:", error);
        });
};


const checkEmailButton = document.getElementById('getstart_buttonid');
const checkEmailButtonEnd=document.getElementById('getstart_buttonid_end');
checkEmailButton.addEventListener('click', () => {
    emailAuthentication('email_id', 'errormsg');
});
checkEmailButtonEnd.addEventListener('click',()=>{
  emailAuthentication('email_id_end','errormsg_end');
})
let userInputField = document.getElementById("email_id");
userInputField.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    emailAuthentication('email_id', 'errormsg');
  }
});
let userInputFieldend = document.getElementById("email_id_end");
userInputFieldend.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    emailAuthentication('email_id_end', 'errormsg_end');
  }
});
checkEmailButton.addEventListener("click", emailAuthentication);
checkEmailButtonEnd.addEventListener("click", emailAuthentication);
