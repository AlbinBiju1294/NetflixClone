import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth , sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



const firebaseConfig = {
  apiKey: "AIzaSyAcbi3_oCi8ZvIaVJCo_nity5rZnjpObow",
  authDomain: "netflixclone-28d52.firebaseapp.com",
  projectId: "netflixclone-28d52",
  storageBucket: "netflixclone-28d52.appspot.com",
  messagingSenderId: "478121105015",
  appId: "1:478121105015:web:f14cdfd963421075805872"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth=getAuth(app);


document.getElementById("submitButton").addEventListener("click", function(event)
{event.preventDefault()

   console.log("mhg");
    const dropdown = document.getElementById('optionsid');
    const selectedIndex = dropdown.selectedIndex;
    const selectedValue = dropdown.options[selectedIndex].value;
    
    console.log("Hello");
    let selectedQuestion = null;
   
    switch (selectedValue) {
      case "option1":
        selectedQuestion = "Name of your pet";
        console.log("hlih");
        break;
      case "option2":
        selectedQuestion = "The Book you love";
        break;
      case "option3":
        selectedQuestion = "Brand of your car";
        break;
      default:
        console.log("Enter a valid option");
        return; // Exit the function if the selected value is not valid
    }
   
//Fetching values from the form
var emailValue = document.getElementById('email').value;
var securityQuestionValue = selectedQuestion;
var securityAnswerValue = document.getElementById('securityanswers').value;
// console.log("Hi");
//You can use these values as needed, for example, send them to a server or perform further actions
// console.log('Email:', emailValue);
// console.log('Security Question:', securityQuestionValue);
// console.log('Security Answer:', securityAnswerValue);
localStorage.setItem('Email', emailValue);
localStorage.setItem('Security Question', securityQuestionValue);
localStorage.setItem('Security Answer', securityAnswerValue);




var userId=localStorage.getItem('uid');

const collectionName = "profileCollection";
const docRef = doc(db, collectionName, userId);

getDoc(docRef)
  .then((docSnap) => {
    if (docSnap.exists()) {
      // Document exists, you can access the data
      const data = docSnap.data();
      console.log("Data retrieved:", data);
      localStorage.setItem("retrivedSQ",data.securityQuestion)
      localStorage.setItem('retrivesA',data.userAnswer)

      // Now you can use the data as needed
      const securityQuestion = data.securityQuestion;
      const userAnswer = data.userAnswer;
      console.log(securityQuestionValue+"    "+data.securityQuestion)
      console.log(securityAnswerValue+"    "+data.userAnswer)
      if (
        securityQuestionValue.toLowerCase() == data.securityQuestion.toLowerCase() &&
        securityAnswerValue.toLowerCase() == data.userAnswer.toLowerCase()
      ) {
        console.log("Account verified. You can reset the password.");
        document.getElementById('reset-pass-container').style="display: inline-block";


        const emailInput = document.getElementById('emailInput');
        const sendButton = document.getElementById('submitButton2');
         
        sendButton.addEventListener('click', function(event)  {
          event.preventDefault()
            const email = emailInput.value;
         
         
        // Function to check if email exists in Firebase Authentication
        sendPasswordResetEmail(auth, email)
            .then(() => {
              console.log("Password reset email sent.");
              // You can redirect the user to a confirmation page or show a success message
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error("Error:", errorCode, errorMessage);
              // Display error message to the user
            });
        });











        // Perform actions for a verified account, such as allowing password reset
      } else {
        console.log("Account cannot be verified to reset password");
        alert("Password cannot be verified hence password cannot be resetted.")
        // Display an error message or take appropriate action for unverified account
      }
      

      // Do something with the retrieved data...
    } else {
      console.log("Document does not exist");
      alert("error")
    }
  })
  .catch((error) => {
    console.error("Error getting document:", error);
  });

});

















