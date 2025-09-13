async function getProducts(){
try {
    const res = await fetch('http://localhost:5002/api/product/getAllProducts',{
        method:'GET',
        headers:{
            'content-type':'application/json',

        },
    })
    console.log(res)
} catch (error) {
    alert("fail to connect with server")
    console.log({message:error.message})
}
}
getProducts()