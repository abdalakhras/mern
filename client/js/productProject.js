
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
    <td>${itm.price}</td>
    <td><img src='${itm.photo}' style="width:150px; height:150px;" /></td>
    <td>
    <button onclick="updateprod('${itm._id}')">update</button>
    <button onclick="deleprod('${itm._id}')">delete</button>
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
