import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, updatePassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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

const newPasswordContainer = document.getElementById('newpassword');
const newPasswordInput = document.getElementById('epassword');
const sendButton = document.getElementById('submitButton');
const resetButton = document.getElementById('resetbt');

newPasswordContainer.style.display = "none";

//function to authenticate the user

sendButton.addEventListener("click", function () {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Authentication successful, show the new password container
            newPasswordContainer.style.display = "block";
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

//function to update password

resetButton.addEventListener("click", function () {
    const user = auth.currentUser;
    const newPassword = newPasswordInput.value;

    updatePassword(user, newPassword)
        .then(() => {
            console.log("Password updated successfully");
            alert("Password changed successfully");
        })
        .catch((error) => {
            console.error('Password update error:', error.message);
            alert("Error changing password");
        });
});


