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