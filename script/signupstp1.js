        const validateform=()=>
        { 
            if(document.getElementById('email').value==''){
                document.getElementById('email').style.borderColor='red';
                
            }
            if(document.getElementById('password').value==''){
                document.getElementById('password').style.borderColor='red';
                
            }
            if(document.getElementById('email').value=="skylord@gmail.com" && document.getElementById('password').value=="skylord123")
            {
                location.href='newsandpopular.html'
            }
            else{
                
                alert("Credentials Wrong")
                document.getElementById('email').style.borderColor='red';
                document.getElementById('password').style.borderColor='red';

            }
        

        }