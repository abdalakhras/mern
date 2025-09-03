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