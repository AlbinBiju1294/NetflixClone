import { userKEy2,serviceKey2,templateKey3 } from "../signup/config.js"
const button=document.getElementById("button")
button.addEventListener('click',function(){
    const nameGet=document.getElementById('name')
    var name=nameGet.value;
    console.log(name)
    const emailGet=document.getElementById('email')
    var email=emailGet.value;
    console.log(email)
    const feedbackGet=document.getElementById('feedback')
    var feedback=feedbackGet.value;
    console.log(feedback)
    const templateParams = {
        to_email: "Nettflix.India@gmail.com",  
       to_name:"Admin",
       from_name:name,
       message:feedback,
       user_email:email
        
        
    };
    emailjs.init(userKEy2)
    emailjs.send(serviceKey2,templateKey3,templateParams)
    .then(response => {
        console.log('Email sent successfully:', response);
        alert("Email Sent Successfully")
        
       
    })
    .catch(error => {
        console.error('Error sending email:', error);
        
        alert('Failed to send mail. Please try again.');
    });
});