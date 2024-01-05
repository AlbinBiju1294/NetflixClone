import { userKEy,serviceKey,templateKey,templateKey2 } from "./config.js";
 let otp;
export function returnOTP() {
   
    otp = generateOTP();
    return otp;
   
}
document.getElementById('getOtp').addEventListener("click",function(event){

    event.preventDefault()
   
    let emailToSend=document.getElementById('email-signup').value;
    console.log(emailToSend);
    let userName=document.getElementById('usersname').value;
    sendEmailSender(emailToSend,userName)
    document.getElementById('otp-signup').style.display="block";
    document.getElementById('create-acct-btn').style.display="block";
    
    
    

    
   
});
export function sendEmailSender(userEmail,userName) {
    
    emailjs.init(userKEy);

    const templateParams = {
        to_email: userEmail,  
       to_name:userName,
       otp:otp
       
        
        
    };

   
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
            
           
        })
        .catch(error => {
            console.error('Error sending email:', error);
            
            alert('Failed to send mail. Please try again.');
        });
    }
}

function generateOTP() {
    
    return Math.floor(100000 + Math.random() * 900000);
   
}





