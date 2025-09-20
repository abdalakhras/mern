 var token = localStorage.getItem('token')
async function getProducts(){
try {
    const res = await fetch('http://localhost:5002/api/product/getAllProducts',{
        method:'GET',
        headers:{
            'content-type':'application/json',

        },
    })
    // console.log(res)
    if(res.status == 200){
        const data = await res.json()
        console.log(data)
        appedndDAta (data)
    }
} catch (error) {
    alert("fail to connect with server")
    console.log({message:error.message})
}
}
var productTable = document.getElementById('productTable')
function appedndDAta (products){
    productTable.innerHTML = ''
    products.forEach(itm => {
       let row = document.createElement('tr')
       if(itm.catagory && itm.catagory.name){
        itm.catagory = itm.catagory.name
       }else{
        itm.catagory = itm.catagory
       }
       row.innerHTML= `
       <td class="Name">${itm.name}</td>
        <td>${itm.discripton}</td>
         <td>${itm.catagory}</td>
          <td>${itm.price}</td>
           <td>${itm.image}</td> 
            <td>
            <button  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="updateProduct('${itm._id}','${itm.name}','${itm.price}','${itm.discripton}','${itm.image}')">Update product</button>
            <button onclick="deleteProduct('${itm._id}')">Delete product</button>
            </td>
       `
        productTable.appendChild(row)
    });
   }
getProducts()

async function deleteProduct (itemID) {
    
    try {
        const res = await fetch(`http://localhost:5002/api/product/deleteProduct/${itemID}`,{
             method:'DELETE',
        headers:{
            'content-type':'application/json',
        },

        })
        
        if(res.status == 200){
            alert('product deleted successfully')
            const data = await res.json()
            console.log(data)
            getProducts()
        }
     
        
    } catch (error) {
        alert("fail to connect with server")
    console.log({message:error.message})
    }
}

function updateProduct(id,name,price,discripton,image){
     var productName = document.getElementById('productName')
     var productprice = document.getElementById('price')
     var productdescription = document.getElementById('description')
     var productimage = document.getElementById('image')
     var productId = document.getElementById('productId')
     productName.value = name
     productprice.value =price
     productdescription.value = discripton
     productimage.value =image
     productId.value = id
}

var updateProd = document.getElementById('updateProd')
updateProd.addEventListener('submit',async function productUpdate(e) {
     e.preventDefault()
    var productName = document.getElementById('productName').value
    var productdescription = document.getElementById('description').value
    var prdctpric = document.getElementById('price').value
    var productimage = document.getElementById('image').value
    var productId = document.getElementById('productId').value
    try {
        const res = await fetch(`http://localhost:5002/api/product/updateProduct/${productId}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({name:productName,discripton:productdescription,price:prdctpric,image:productimage})
        })
        if(res.status == 200){
            alert('product updated successfully')
            const data = await res.json()
            console.log(data)
            getProducts()
        }
        
    } catch (error) {
        alert("fail to connect with server")
    console.log({message:error.message})
    }
   }) 

   async function findbyname() {
    var findname = document.getElementById('findname').value
    try {
        const res = await fetch('http://localhost:5002/api/product/getbyname',{
          method:'PUT',
        headers:{
            'content-type':'application/json',

        },
        body:JSON.stringify({name:findname})
        })
        if(res.status == 200){
            alert(' product founded successfully')
            var data = await res.json()
            console.log(data)
            console.log(data.product.name) //Destructure Data = {message:"founded",product:{findName}} ,inside the product object , .name

                 var cells = document.querySelectorAll('.Name')
                    cells.forEach(cell=>{
                        if(cell.innerHTML == data.product.name){
                    console.log('matched')
                       cell.style.color = 'blue'
                 }
                    })                
        }
        else{
            alert('no such a product')
        }
    } catch (error) {
          alert("fail to connect with server")
    console.log({message:error.message})
    }
   }
var AddProducts = document.getElementById('AddProd')
AddProducts.addEventListener('submit',async function (e) {
    e.preventDefault()
var addproductName = document.getElementById('addproductName').value
var adddescription = document.getElementById('adddescription').value
var addprice = document.getElementById('addprice').value
var addcatagory = document.getElementById('catagory').value
var addimage = document.getElementById('addimage').value

try {
    var res = await fetch('http://localhost:5002/api/product/createproducts',{
         method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({name:addproductName,discripton:adddescription,price:addprice,catagory:addcatagory,img:addimage})
    })

    if(res.status == 201){
        alert('product added successfully')
        var data = await res.json()
        console.log(data)
          getProducts()
    }
} catch (error) {
     alert("fail to connect with server")
    console.log({message:error.message})
}


})

async function loadcatagforprodct(){

    try {
        const res = await fetch('http://localhost:5002/api/catagory/getgatag',{
                 method:'GET',
        headers:{
             'content-type':'application/json',
        },
        })
        if(res.status == 200){
            const data = await res.json()
            var catagoryselect  =document.getElementById('catagory')
            data.forEach(catagory=>{
                let option = document.createElement('option')
                option.value = catagory._id
                option.text = catagory.name
               catagoryselect.appendChild(option)
             })

        }
    } catch (error) {
        lert("fail to connect with server")
    console.log({message:error.message})
    }
}
loadcatagforprodct()