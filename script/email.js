
const otp=generateOTP();

function sendEmail()
{
    let emailToSend=document.getElementById('email-signup').value;
    console.log(emailToSend);
    sendEmailSender(emailToSend)
}
function sendEmailSender(userEmail) {
   console.log("eneter");
    // const otp=otp();
    // Set up EmailJS parameters
    emailjs.init("QTkWQghtIbd24HWIK");

    // Set up email template parameters
    const templateParams = {
        to_email: userEmail,  // Use the dynamically obtained user's email address
        otp: otp,
        // logoim:"<img src='../assets/netflix1_logo.png" + imageBase64 + "'></img>"
        
        
    };

    // Send email using EmailJS
    emailjs.send("service_zpt3w8h", "template_ir9awjx", templateParams)
        .then(response => {
            console.log('Email sent successfully:', response);
            // Simulate navigating to the OTP verification page (replace this with your actual logic)
            // window.location.href = '../htmlpages/newsandpopular.html';
        })
        .catch(error => {
            console.error('Error sending email:', error);
            // Handle error, e.g., display an error message to the user
            alert('Failed to send OTP. Please try again.');
        });
}

function generateOTP() {
    // Simulate OTP generation (replace this with a secure OTP generation logic)
    return Math.floor(100000 + Math.random() * 900000);
   
  }




