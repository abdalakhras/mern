async function payload (){

    var token = localStorage.getItem('token')
    if(!token){
        alert('not logged in, please login')
        window.location.href="login.html"
        return;
    }
    try {
        const res = await fetch('http://localhost:5002/api/users/userprofile',{
             method:'GET',
           headers:{
             'content-type':'application/json',
             'auth':token
           },
              
        })
         console.log(res)
         if(res.status==200){
            var data = await res.json()
         console.log(data)
        document.getElementById('userName').innerText=data.username
         document.getElementById('role').innerHTML=data.role
         document.getElementById('email').innerHTML=data.email
         }else{
            alert('failed to enter profile')
            window.location.href="login.html"
         }
         
         
        
    } catch (error) {
        console.log("error",error)
        alert('error loading the profile')
    }
}
payload()

var logout = document.getElementById('logout')
logout.addEventListener('click',function(){
    localStorage.clear('token')
    window.location.href = 'login.html'
})

var editProfile = document.getElementById('editprofile')
editProfile.addEventListener('submit',async function(e){
e.preventDefault()
console.log('hi')
var editUserName = document.getElementById('editUserName').value
var editEmail = document.getElementById('editEmail').value
var token = localStorage.getItem('token')

try {
    const res = await fetch('http://localhost:5002/api/users/updateuser',{
           method:'PUT',
           headers:{
             'content-type':'application/json',
             'auth':token
           },
           body:JSON.stringify({email:editEmail,username:editUserName})
        })
    console.log(res)
    if(res.status==200){
        console.log('updated successfully')
        alert("updated successfully")
        payload()
    }else{
        alert('update failed')
    }
    
} catch (error) {
    console.log("error",error.message)
        alert('error updating the profile')
}
})

const editpassword = document.getElementById('editpassword')
editpassword.addEventListener('submit', async function (e) {
  e.preventDefault()
  const oldpassword = document.getElementById('oldPassword').value
  const newpassword = document.getElementById('newpassword').value
  var token = localStorage.getItem('token')

  try {
    const response = await fetch('http://localhost:5002/api/users/updateuserpass',{
         method:'PUT',
           headers:{
             'content-type':'application/json',
             'auth':token
           },
           body:JSON.stringify({oldpassword:oldpassword,newpassword:newpassword})
    })
    console.log(response)
    if(response.status==200){
        const data = await response.json()
        console.log(data)
        console.log('password changed successfully')
        alert('password changed successfully')
        localStorage.removeItem('token')
        window.location.href='login.html'
    }else{
        alert('password changed faild')
    }

  } catch (error) {
    console.log("error",error.message)
        alert('error updating the password')
  }
})
const gotoDashboard = document.getElementById('dashboard')
gotoDashboard.addEventListener('click',()=>{
  var token = localStorage.getItem('token')
  if(!token){
    alert('you are not an admin')
    window.location.href = 'login.js'
  }
   window.location.href = 'dashboard.html';
})