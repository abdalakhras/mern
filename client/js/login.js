var loginform = document.getElementById('loginform')
loginform.addEventListener('submit',async function(event){
    event.preventDefault()
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    try {
        const response = await fetch('http://localhost:5002/api/users/userlogin',{
           method:'POST',
           headers:{
             'content-type':'application/json'
           },
           body:JSON.stringify({email:email,password:password})
        })
        console.log(response)
        if(response.status == 200){
            console.log('login success')
            alert('login success')
        }else{
            alert("login faild ,please check credential")
        }
    } catch (error) {
        console.log('error in server',error)
    }
})