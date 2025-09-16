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
       row.innerHTML= `
       <td>${itm.name}</td>
        <td>${itm.discripton}</td>
         <td>${itm.catagory}</td>
          <td>${itm.price}</td>
           <td>${itm.image}</td> 
            <td>
            <button onclick="updateProduct('${itm._id}','${itm.name}','${itm.price}','${itm.discripton}','${itm.image}')">Update product</button>
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