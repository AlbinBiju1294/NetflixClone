import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig } from "../../configsecurity.js";



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
document.getElementById("submit").addEventListener("click", sendSecurityQuestion);
 

function sendSecurityQuestion() {
  try {
    const dropdown = document.getElementById('optionsid');
    const selectedIndex = dropdown.selectedIndex;
    const selectedValue = dropdown.options[selectedIndex].value;

    let selectedQuestion = null;

    switch (selectedValue) {
      case "option1":
        selectedQuestion = "Name of your pet";
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

    const userAnswer = document.getElementById('userAnswer').value;

    // Get userId from local storage
    const userId = localStorage.getItem('uid');

    // Check if userId is available
    if (!userId) {
      console.error('User ID not found in local storage');
      
    }

    // Specify the collection, document ID (using userId), and data to be written
    const collectionName = "profileCollection";
    const docRef = doc(db, collectionName, userId);
    console.log(userId)
    const data = {
      securityQuestion: selectedQuestion,
      userAnswer: userAnswer,
    };

    // Set the data for the document
    setDoc(docRef, data)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

  } catch (error) {
    console.error("An error occurred: ", error);
  }
}