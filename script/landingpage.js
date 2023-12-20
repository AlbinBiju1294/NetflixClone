function checktext(){
    if(document.getElementById('email_id').value==""){
        const holder= document.getElementById('email_id');
        holder.setAttribute('placeholder',"Email Address Required");
        holder.style.borderColor="red";
    }
    else{
        if(document.getElementById('email_id').value!=="")
            location.href="./signupstp1.html"
    }
}