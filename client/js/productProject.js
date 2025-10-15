
async function showProducts() {
    
    try {
        const res = await fetch('http://localhost:5002/api/porjproducts/getallprod',{
            method:'GET',
        headers:{
            'content-type':'application/json',
        }
        })

        if(res.status == 200){
            console.log(res)
            const data = await res.json()
            console.log(data)
            apendProducts(data)
        }
        
    } catch (error) {
        alert("fail to connect with server")
    console.log({message:error.message})
    }
}

var tableProduct = document.getElementById('tableProduct')

function apendProducts (products){
    tableProduct.innerHTML = ''
products.forEach(itm => {
    let tableRow = document.createElement('tr')
    tableRow.innerHTML = `
    <td>${itm.name}</td>
    <td>${itm.discription}</td>
    <td>${itm.catagory}</td>
    <td>${itm.price}$</td>
    <td><img src='${itm.photo}' style="width:150px; height:150px;" /></td>
    <td>
    <button onclick="updateprod('${itm.name}','${itm.discription}','${itm.catagory}','${itm.price}','${itm.photo}','${itm._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">update</button>
    <button onclick="deleprod('${itm._id}')" class="btn btn-danger">delete</button>
    </td>
    `
     tableProduct.appendChild(tableRow)
});
}
showProducts()

async function deleprod(id){
    console.log(id)
    try {
        const res = await fetch(`http://localhost:5002/api/porjproducts/delprojprod/${id}`,{
            method:'DELETE',
        headers:{
            'content-type':'application/json',
        }
        })
        if(res.status == 200){
            alert('deleted successfully')
            const data = await res.json()
            console.log(data)
            showProducts()
        }
        
    } catch (error) {
        alert("fail to connect with server")
    console.log({message:error.message})
    }
}

function updateprod(name,discription,catagory,price,photo,id){

var productName = document.getElementById("productName")
var proddiscription = document.getElementById("discription")
var prodprice = document.getElementById("price")
var prodphoto = document.getElementById("photo")
var productId = document.getElementById('productId')

productName.value = name
proddiscription.value = discription
prodprice.value = price
prodphoto.value = photo 
productId.value = id
}
var prodUpdateForm = document.getElementById('prodUpdateForm')
prodUpdateForm.addEventListener('submit',async(event)=>{
    event.preventDefault()
var productName = document.getElementById("productName").value
var proddiscription = document.getElementById("discription").value
var prodprice = document.getElementById("price").value
var prodphoto = document.getElementById("photo").value
var productId = document.getElementById('productId').value

    try {
        const res = await fetch(`http://localhost:5002/api/porjproducts/updateprojprod/${productId}`,{
             method:'PUT',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({name:productName,discription:proddiscription,price:prodprice,photo:prodphoto})
        })
        if(res.status == 200){
            alert('Update Success')
            const data = await res.json()
            console.log(data)
            showProducts()
        }
    } catch (error) {
        alert("fail to connect with server")
    console.log({message:error.message})
    }
})

var proDADDForm = document.getElementById('proDADDForm')
proDADDForm.addEventListener('submit',async(e)=>{
    e.preventDefault()
    addproductName=document.getElementById('addproductName').value
    adddescription=document.getElementById('adddescription').value
    addprice=document.getElementById('addprice').value
    addphoto=document.getElementById('addphoto').value
    addproductCatagory=document.getElementById('addproductCatagory').value

    try {
        const res = await fetch('http://localhost:5002/api/porjproducts/creatprod',{
            method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({name:addproductName,discription:adddescription,price:addprice,photo:addphoto,catagory:addproductCatagory})
        })
        if(res.status == 200){
            alert('created success')
            console.log(res)
            const data = await res.json()
            console.log(data)
            showProducts()
        }

    } catch (error) {
        alert("fail to connect with server")
    console.log({message:error.message})
    }

})


