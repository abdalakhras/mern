
var token = localStorage.getItem('token')
 if(!token){
    window.location.href = "login.html"
 }
// alert('jkhkjhkh')
var catagoriesform = document.getElementById('catagoriesform')
catagoriesform.addEventListener('submit',async (e)=>{
e.preventDefault()
var token = localStorage.getItem('token')
const name = document.getElementById('catgname').value
const description = document.getElementById('catgdescription').value
const image = document.getElementById('catgimg').value

console.log(name,description,image)
try {
    const res = await fetch('http://localhost:5002/api/catagory/createcatag',{
        method:'POST',
        headers:{
             'content-type':'application/json',
            'auth':token
        },
        body:JSON.stringify({name:name,description:description,imageurl:image})
    })
    if(res.status == 200){
        alert('catagory created successfully')
        const data = await res.json()
        console.log(data)
        getCatagories()
    }
} catch (error) {
    alert("fail to connect with server")
    console.log({message:error.message})
}
})

async function getCatagories() {
    
    try {
        const res = await fetch('http://localhost:5002/api/catagory/getgatag',{
                 method:'GET',
        headers:{
             'content-type':'application/json',
        },
        })
        if(res.status == 200){
            const data = await res.json()
            console.log(data)
            renderCatagories(data)
        }
    } catch (error) {
          alert("fail to connect with server")
    console.log({message:error.message})
    }
}
var catagoriestable = document.getElementById('catagoriestable')
function renderCatagories(catagories){
    catagoriestable.innerHTML=''
    console.log(catagories)
    catagories.forEach(catagory => {
        let row = document.createElement('tr')
      row.innerHTML = `
    <td>${catagory._id}</td>
     <td>${catagory.name}</td>
      <td>${catagory.description}</td>
       <td>${catagory.imageurl}</td>
       <button>update</button>
       <button onclick="deleteCatag('${catagory._id}')">delete</button>
    
    `
        catagoriestable.appendChild(row)
    });

}
getCatagories()

async function deleteCatag(id) {
    console.log(id)
    var token = localStorage.getItem('token')
    console.log(token)
    try {
        const res = await fetch(`http://localhost:5002/api/catagory/delcatag/${id}`,{
              method:"DELETE",
         headers:{
             'content-type':'application/json',
             'auth':token
           },
        })
        if(res.status == 200){
            alert('catagory deleted')
            const data = await res.json()
            console.log(data)
             console.log(token)
            getCatagories()
        }
    } catch (error) {
         alert("fail to connect with server")
    console.log({message:error.message})
    }
}