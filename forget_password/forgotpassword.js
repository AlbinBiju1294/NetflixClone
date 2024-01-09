import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseConfig } from "../signup/config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document
  .getElementById("submitButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    console.log("mhg");
    const dropdown = document.getElementById("optionsid");
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

    var emailValue = document.getElementById("email").value;
    var securityQuestionValue = selectedQuestion;
    var securityAnswerValue = document.getElementById("securityanswers").value;
    localStorage.setItem("Email", emailValue);
    localStorage.setItem("Security Question", securityQuestionValue);
    localStorage.setItem("Security Answer", securityAnswerValue);

    var userId = localStorage.getItem("uid");

    const collectionName = "profileCollection";
    const docRef = doc(db, collectionName, userId);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Data retrieved:", data);
          localStorage.setItem("retrivedSQ", data.securityQuestion);
          localStorage.setItem("retrivesA", data.userAnswer);

          const securityQuestion = data.securityQuestion;
          const userAnswer = data.userAnswer;
          console.log(securityQuestionValue + "    " + data.securityQuestion);
          console.log(securityAnswerValue + "    " + data.userAnswer);
          if (
            securityQuestionValue.toLowerCase() ==
              data.securityQuestion.toLowerCase() &&
            securityAnswerValue.toLowerCase() == data.userAnswer.toLowerCase()
          ) {
            console.log("Account verified. You can reset the password.");
            document.getElementById("reset-pass-container").style =
              "display: inline-block";

            const emailInput = document.getElementById("emailInput");
            const sendButton = document.getElementById("submitButton2");

            sendButton.addEventListener("click", function (event) {
              event.preventDefault();
              const email = emailInput.value;

              // Function to check if email exists in Firebase Authentication
              sendPasswordResetEmail(auth, email)
                .then(() => {
                  console.log("Password reset email sent.");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.error("Error:", errorCode, errorMessage);
                });
            });

            // Perform actions for a verified account, such as allowing password reset
          } else {
            console.log("Account cannot be verified to reset password");
            alert(
              "Password cannot be verified hence password cannot be resetted."
            );
            // Display an error message or take appropriate action for unverified account
          }

        } else {
          console.log("Document does not exist");
          alert("error");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  });
