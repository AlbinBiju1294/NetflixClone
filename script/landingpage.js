var id1,id2;
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
function checktext(id1,id2){
    if(document.getElementById(id1).value==""){
        const holder= document.getElementById(id1);
        holder.style.borderColor="red";
        const msg=document.getElementById(id2);
        msg.innerHTML='⮾ Email is required.';
        msg.style.color="rgb(255, 0, 0)";
    }
    else{
        if(document.getElementById(id1).value!=="")
        {
            var emailInput = document.getElementById(id1);
            var email = emailInput.value;
            if (isValidEmail(email)) {
                location.href="./signupstp1.html"
              }  
            else {
                const msg=document.getElementById(id2);
                msg.innerHTML='⮾ Enter valid email id';
                msg.style.color="rgb(255, 0, 0)";
                emailInput.style.borderColor="red";
              }

        }
            
    }
}


