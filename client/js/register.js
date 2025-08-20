var myform = document.getElementById('myform')
myform.addEventListener('submit',async function(event){
event.preventDefault()
var username = document.getElementById('username').value
var email = document.getElementById('email').value
var password =  document.getElementById('password').value
var confirmPassword =  document.getElementById('confirmPassword').value
if(password!=confirmPassword){
    alert("password incorrect")
    return
}

try {
    var user ={
        username :username,
        password :password,
        email : email
    }
    console.log(email,password,username)

    var res = await fetch('http://localhost:5002/api/users/create',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body : JSON.stringify(user)
        
    }) 
    console.log(res)
    if(res.status == 200){
        alert ('register success')
    }else{
        alert("register faild, please check credintial ")
    }

} catch (error) {
    console.log('error during register',error)
    alert("register faild")
}

})