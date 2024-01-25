import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {firebaseConfig} from '../signup/config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signInButton = document.getElementById('signInButton');

signInButton.addEventListener("click",() => {
    const emailInput = document.getElementById('email-box');
    const passwordInput = document.getElementById('password-box');
    let email = emailInput.value;
    console.log(email);
    let password = passwordInput.value;
    console.log(password);
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const auth = getAuth();
        const user = auth.currentUser;
        localStorage.setItem('userId',user.uid);
        window.location.href = '../profileselection/profileselection.html';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error occurred. Try again.");
        document.getElementById('invalidId').style.display = 'block';
        
      });
  });