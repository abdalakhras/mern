
const logOut = document.getElementById('logOut2')
logOut.addEventListener('click',()=>{
    localStorage.clear('token')
    window.location.href = 'login.html'
})


async function checkrole() {
const token = localStorage.getItem('token')

try {
    var res = await fetch('http://localhost:5002/api/users/userrole',{
        method:"GET",
         headers:{
             'content-type':'application/json',
             'auth':token
           },
    })
    console.log(res)
    if(res.status == 200){
        var data = await res.json();
        console.log(data)
        document.getElementById('userRole').innerText = "USer Role :" + data.message + data.userRole.role
    }else if(res.status === 403){
        console.log('not admin')
            window.location.href = 'home.html';
            console.log('dsfjdshj')
            return;
        }
        else{
                        window.location.href = 'login.html';

        }
        console.log(res.status)
       
       
    
} catch (error) {
    alert("error in server")
    console.log("error:",error.message)
}
}

checkrole()

var usersBody = document.getElementById('userBody')
async function loadUsers() {
    
    const token = localStorage.getItem('token')
    try {
        var res = await fetch('http://localhost:5002/api/users/getusersdata',{
            method:"GET",
         headers:{
             'content-type':'application/json',
             'auth':token
           },
        })
        if(res.status == 201 ){
            var data = await res.json()
            console.log(data)
            renderUser(data)
        }else {
            console.log('error in loadind users data')
        }
    } catch (error) {
         alert("error in server")
    console.log("error:",error.message)
    }
}
function renderUser(users){
    usersBody.innerHTML = ''
    users.forEach(user => {
        var row = document.createElement('tr')
      row.innerHTML = `
      <td>${user._id}</td>
       <td>${user.username}</td>
        <td>${user.email}</td>
         <td>${user.role}</td>
         <td>
         <button onclick = "deleteuser('${user._id}')">delete</button>
         <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "updateuser('${user._id}','${user.username}','${user.email}','${user.role}')">update</button>
         </td>
       `
       usersBody.appendChild(row)
    });

}
loadUsers()

async function deleteuser(userID) {
    const token = localStorage.getItem('token')

    try {
        var res = await fetch(`http://localhost:5002/api/users/delete/${userID}`,{
              method:"DELETE",
         headers:{
             'content-type':'application/json',
             'auth':token
           },

        })
        if(res.status ==201){
           alert('user deleted succefully')
           var data = await res.json()
           console.log(data)
           loadUsers()
        }
        
    } catch (error) {
         alert("error in server")
    console.log("error:",error.message)
    }
    
}

async function updateuser(id,name,email,role) {
    console.log(id,name,email,role)
     var userName = document.getElementById('userName')
    var userEmail = document.getElementById('userEmail')
    var userRole = document.getElementById('userRole')
    var userId = document.getElementById('userId')
     userId.value = id
    userName.value = name
    userEmail.value = email
    userRole.value = role
   

}

var updatedataform = document.getElementById('updatedataform')
updatedataform.addEventListener('submit',async function (e) {
    e.preventDefault()
    var userName = document.getElementById('userName').value
    var userEmail = document.getElementById('userEmail').value
    var userRole = document.getElementById('userRole').value
    var userId = document.getElementById('userId').value
      const token = localStorage.getItem('token')

    try {
        const res = await fetch(`http://localhost:5002/api/users/updatebyAdmin`,{
            method:'PUT',
             headers:{
             'content-type':'application/json',
             'auth':token
           },
           body : JSON.stringify({id:userId,username:userName,email:userEmail,role:userRole})
        })
        if(res.status == 200){
         const data = await res.json()
         console.log(data)
            alert('updated succssefully')
             loadUsers()
        }
    } catch (error) {
         alert("error in server")
    console.log("error:",error.message)
    }

})

var addUser = document.getElementById('addUser')
addUser.addEventListener('submit',async function(e){
e.preventDefault()
const newuserName = document.getElementById('newuserName').value
const newuserEmail = document.getElementById('newuserEmail').value
const newuserRole = document.getElementById('newuserRole').value
const newuserPass = document.getElementById('newuserPass').value
const token = localStorage.getItem('token')

try {
    const res = await fetch(`http://localhost:5002/api/users/admincreate`,{
        method:'POST',
             headers:{
             'content-type':'application/json',
             'auth':token
           },
           body : JSON.stringify({username:newuserName,email:newuserEmail,role:newuserRole,password:newuserPass})
    })
    if(res.status == 200){
        const data = await res.json()
        console.log(data)
        alert('created successfully')
        loadUsers()
    }
    else{
        alert('didnot created')
    }
    
} catch (error) {
    alert("error in server")
    console.log("error:",error.message)
}
})