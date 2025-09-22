async function fetchData() {
    
    const res = await fetch('http://localhost:5002/api/product/getAllProducts',{
        method:'GET',
        headers:{
            'content-type':'application/json',

        },
    })
    const data = await res.json()
    console.log(data)
    renderData(data)
}
fetchData()

function renderData(products){
    var maindivCard = document.getElementById('main-div-card')
    maindivCard.innerHTML = ''
    products.forEach(product => {
        var card = document.createElement('div')
        card.className = 'card'
        card.style.width = '18rem'
        card.innerHTML = `
        <img src="${product.image}" class="card-img-top" alt="...">
        <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <p class="card-text">${product.discripton}</p>
     <p class="card-text">$ ${product.price}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>

        `
        maindivCard.appendChild(card)
    });
}
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
          renderCatag(data)
        }
    } catch (error) {
        alert('error uploading catagories')
        console.log({message:message.error})
    }
}
function renderCatag(catagories){
    var categorySelect = document.getElementById('categorySelect')
    // console.log(catagories)
    catagories.forEach(catagory=>{
        let option = document.createElement('option')
        option.value = catagory._id
        option.text = catagory.name 
        categorySelect.appendChild(option)
    })
}
 getCatagories()

 var select = document.getElementById('categorySelect')
    select.addEventListener('change',async function (){
    console.log(select.value)
    if(select.value == 'all'){
    fetchData()
    return
    }

    try {
         var res = await fetch('http://localhost:5002/api/product/getAllProducts')
    var data = await res.json()
     console.log(data)
    filterdproducts = data.filter(product=>select.value == product.catagory._id )
        console.log(filterdproducts)
     renderData(filterdproducts)
    } catch (error) {
        alert('error fetching products by ctatgory')
        console.log({message:message.error})
    }
   
    })
  