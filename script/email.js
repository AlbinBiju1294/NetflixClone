import { userKEy,serviceKey,templateKey,templateKey2 } from "./config.js";
 let otp;
export function returnOTP() {
    // Simulate OTP generation (replace this with a secure OTP generation logic)
    otp = generateOTP();
    return otp;
   
}
document.getElementById('getOtp').addEventListener("click",function(event){
    console.log("reached here")
    event.preventDefault()
   
    let emailToSend=document.getElementById('email-signup').value;
    console.log(emailToSend);
    let userName=document.getElementById('usersname').value;
    sendEmailSender(emailToSend,userName)
    document.getElementById('otp-signup').style.display="block";
    document.getElementById('create-acct-btn').style.display="block";
    
    
    console.log("Success! mail sent final");

    // window.alert("Success! mail sent final");
   
});
export function sendEmailSender(userEmail,userName) {
    console.log("Success! mail sent before final");
    
    // window.alert("Success! mail sent before final");
    
    // alert("A mail is sent to your email")
   console.log("enter");
    // const otp=otp();
    // Set up EmailJS parameters
    emailjs.init(userKEy);

    // Set up email template parameters
    const templateParams = {
        to_email: userEmail,  // Use the dynamically obtained user's email address
       to_name:userName,
       otp:otp
        // logoim:"<img src='../assets/netflix1_logo.png" + imageBase64 + "'></img>"
        
        
    };

    // Send email using EmailJS
    if(localStorage.getItem("successKey")=="true")
    {
        emailjs.send(serviceKey, templateKey2, templateParams)
        localStorage.setItem("successKey",false)
        
    }
    else
    {
    emailjs.send(serviceKey, templateKey, templateParams)
        .then(response => {
            console.log('Email sent successfully:', response);
            
            // window.location.href = '../htmlpages/newsandpopular.html';
        })
        .catch(error => {
            console.error('Error sending email:', error);
            // Handle error, e.g., display an error message to the user
            alert('Failed to send mail. Please try again.');
        });
    }
}

function generateOTP() {
    // Simulate OTP generation (replace this with a secure OTP generation logic)
    return Math.floor(100000 + Math.random() * 900000);
   
}





