import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, updateEmail } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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

const newEmailContainer = document.getElementById('newEmail');
const newEmailInput = document.getElementById('newemailinp');
const sendButton = document.getElementById('emailsubmit');
const resetButton = document.getElementById('resetbtem');


newEmailContainer.style.display = "none";

//function to authenticate the user

sendButton.addEventListener("click", function () {
    const email = document.getElementById('currentEmail').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
           
            newEmailContainer.style.display = "block";
            errormessage.innerHTML = "";
        })
        .catch((error) => {
            // Handle sign-in errors
            console.error('Sign-in error:', error.message);
            const errormessage=document.getElementById('success');
            errormessage.innerHTML = "";
            const newText = document.createTextNode('Invalid Inputs');
            errormessage.appendChild(newText);

        });
});

//function to update email

resetButton.addEventListener("click", function () {
    const user = auth.currentUser;
    const newEmail = newEmailInput.value;

    updateEmail(user, newEmail)
            .then(() => {
                alert("Email updated successfully");
            })
            .catch((error) => {
                console.error("Error updating email:", error.message);
            });
    })
    

