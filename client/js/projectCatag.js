
async function getCatagories() {
    
    try {
        const res = await fetch('http://localhost:5002/api/projcatag/getallCatags',{
             method:'GET',
        headers:{
             'content-type':'application/json',
        },
        })
        if(res.status == 200){
            console.log(res)
            const data = await res.json()
            console.log(data)
            appendCatagory (data)
        }
    } catch (error) {
        alert('failed to connect with server')
        console.log(error.message)
    }
}

var tablecatagory = document.getElementById('tablecatagory')

function appendCatagory (catagories){
    tablecatagory.innerHTML = ''
    catagories.forEach(element => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${element.name}</td>
        <td>${element.description}</td>
        <td><img src="${element.photoUrl}" style="width:150px; height:150px;"></td>
        <td>
        <button onclick="updatecatag('${element._id}','${element.name}','${element.description}','${element.photoUrl}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">update</button>
        <button onclick="delecatag('${element._id}')" class="btn btn-danger">delete</button>
        </td>
        `
        tablecatagory.appendChild(row)
    });
}
getCatagories()

async function delecatag(id){

    try {
        const res = await fetch(`http://localhost:5002/api/projcatag/deleteCatag/${id}`,{
            method:'DELETE',
        headers:{
             'content-type':'application/json',
        },
        })
        if(res.status==200){
            alert('deleted success')
            getCatagories()
        }
    } catch (error) {
         alert('failed to connect with server')
        console.log(error.message)
    }
}

function updatecatag (id,name,description,photoUrl) {
  
const catagoryName = document.getElementById('catagoryName')
const catagdescription = document.getElementById('description')
const photo = document.getElementById('photo')
const catagoryId =document.getElementById('catagoryId')

catagoryName.value = name
catagdescription.value = description
photo.value = photoUrl
catagoryId.value = id    
}
var catagUpdateForm = document.getElementById('catagUpdateForm')

catagUpdateForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
        const catagoryId = document.getElementById('catagoryId').value
        const catagoryName = document.getElementById('catagoryName').value
        const catagdescription = document.getElementById('description').value
        const photo = document.getElementById('photo').value
        
    try {
        const res = await fetch(`http://localhost:5002/api/projcatag/updateprojCatag/${catagoryId}`,{
            method:'PUT',
        headers:{
             'content-type':'application/json',
        },
        body:JSON.stringify({name:catagoryName,description:catagdescription,photo:photo})
        })
        if(res.status==200){
            alert('update sucess')
            const data = await res.json()
            console.log(data)
            getCatagories()
        }
    } catch (error) {
        alert('failed to connect with server')
        console.log(error.message)
    }
    
})

var catagADDForm = document.getElementById('catagADDForm')

catagADDForm.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const addcatagName = document.getElementById('addcatagName').value
     const addcatagdescription = document.getElementById('addcatagdescription').value
      const addcatagphoto = document.getElementById('addcatagphoto').value

      try {
        const res = await fetch('http://localhost:5002/api/projcatag/creatprojCatag',{
            method:'POST',
        headers:{
             'content-type':'application/json',
        },
        body:JSON.stringify({name:addcatagName,description:addcatagdescription,photo:addcatagphoto})
        })
        if(res.status==200){
            alert('created success')
            const data =await res.json()
            console.log(data)
            getCatagories()
        }
      } catch (error) {
        alert('failed to connect with server')
        console.log(error.message)
      }
})



