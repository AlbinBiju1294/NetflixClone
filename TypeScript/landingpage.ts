import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, fetchSignInMethodsForEmail, Auth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

function isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function checktext(id1: string, id2: string): void {
    const inputElement: HTMLInputElement | null = document.getElementById(id1) as HTMLInputElement;
    const msgElement: HTMLElement | null = document.getElementById(id2);

    if (inputElement?.value === "") {
        inputElement.style.borderColor = "red";
        if (msgElement) {
            msgElement.innerHTML = '⮾ Email is required.';
            msgElement.style.color = "rgb(255, 0, 0)";
        }
    } else {
        const emailInput: HTMLInputElement | null = document.getElementById(id1) as HTMLInputElement;
        if (emailInput?.value !== "") {
            const email: string = emailInput.value;
            if (isValidEmail(email)) {
                console.log("valid email");
            } else {
                if (msgElement) {
                    msgElement.innerHTML = '⮾ Enter valid email id';
                    msgElement.style.color = "rgb(255, 0, 0)";
                }
                if (emailInput) {
                    emailInput.style.borderColor = "red";
                }
            }
        }
    }
}

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

function emailAuthentication(id3: string, id4: string): void {
    const emailInput: HTMLInputElement | null = document.getElementById(id3) as HTMLInputElement;
    const email: string = emailInput?.value || "";

    if (!email) {
        checktext(id3, id4);
        console.log("Please enter an email.");
        return;
    } else if (!isValidEmail(email)) {
        checktext(id3, id4);
        console.log("Enter a valid email id");
        return;
    }

    fetchSignInMethodsForEmail(auth, email)
        .then((signInMethods: string[] | null) => {
            localStorage.setItem('Email', email);
            if (signInMethods && signInMethods.length > 0) {
                console.log("Email exists. User can sign in.");
                location.href = './login.html';
            } else {
                console.log("Email does not exist.");
                location.href = './signuptry.html';
            }
        })
        .catch((error: Error) => {
            console.error("Error checking email existence:", error);
        });
}

const checkEmailButton: HTMLElement | null = document.getElementById('getstart_buttonid');
const checkEmailButtonEnd: HTMLElement | null = document.getElementById('getstart_buttonid_end');

if (checkEmailButton) {
    checkEmailButton.addEventListener('click', () => {
        emailAuthentication('email_id', 'errormsg');
    });
}

if (checkEmailButtonEnd) {
    checkEmailButtonEnd.addEventListener('click', () => {
        emailAuthentication('email_id_end', 'errormsg_end');
    });
}

let userInputField: HTMLElement | null = document.getElementById("email_id");

if (userInputField) {
    userInputField.addEventListener("keyup", function (event: KeyboardEvent) {
        if (event.key === "Enter") {
            emailAuthentication('email_id', 'errormsg');
        }
    });
}

let userInputFieldend: HTMLElement | null = document.getElementById("email_id_end");

if (userInputFieldend) {
    userInputFieldend.addEventListener("keyup", function (event: KeyboardEvent) {
        if (event.key === "Enter") {
            emailAuthentication('email_id_end', 'errormsg_end');
        }
    });
}
