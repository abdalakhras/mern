async function getProducts() {
    
    try {
        const res = await fetch('http://localhost:5002/api/porjproducts/getallprod',{
            method:"GET",
            headers:{
                 'content-type':'application/json',
            }
        })
        if(res.status == 200){
            const data = await res.json()
            console.log(data)
            appendProductsToCarousel(data)
            newCollection(data)
            xivSectionGrid(data)
        }
    } catch (error) {
            alert("fail to connect with server")
    console.log({message:error.message})
    }
}
function appendProductsToCarousel(products){
    const sliceSize = 2
    let slicedArr = ''
    cutArr = []
    for(i=0; i<products.length ; i+=sliceSize){
        slicedArr = products.slice(i,i+sliceSize)
        cutArr.push(slicedArr)
    }
    console.log(cutArr)
    let carouselInner = document.getElementById('carouselInner')
    cutArr.forEach((slicedArr,index) => {
        let div = document.createElement('div')
        div.classList.add('carousel-item')
        if(index == 0)div.classList.add('active')
        div.innerHTML = slicedArr.map(obj=>`<img src="${obj.photo}">`).join('')
        console.log(div)
        carouselInner.appendChild(div)
    });
}

function newCollection(collection){
    const incr = 3
    let slicearr =''
    let cutarr = []
    for(i=0 ; i<collection.length ; i+=incr){
        slicearr = collection.slice(i,i+incr)
        cutarr.push(slicearr)
    }
    console.log(cutarr)
    var carouselCard = document.getElementById('carouselCard')
    cutarr.forEach((slicearr,index)=>{
        let div = document.createElement('div')
        div.classList.add('carousel-item')
        div.classList.add('carouselImage')
        if(index == 0 ) div.classList.add('active')
            div.innerHTML= slicearr.map(obj=>
        `
         <div class="card" style="width: 18rem;">
  <img src="${obj.photo}" class="card-img-top">
  
  <div class="card-body">
    <p class="card-text">${obj.discription}</p>
    <p>${obj.price}$</p>
  </div>
        </div>

        `  
         ).join('')
         console.log(typeof (div.innerHTML))
         carouselCard.appendChild(div)
    })
}

function xivSectionGrid(productsGrid){
    var xivSectinGrid = document.getElementById('xivSectin-grid')
    
    productsGrid.forEach(itm=>{
    let div = document.createElement('div')
    div.className = 'xivSectin-grid-card'
    div.innerHTML= `
    <img src="${itm.photo}" style="width: 90%; height: 450px; ">
     <p style="margin-top: 10px; margin-bottom: 0px;">${itm.name}</p>
    <div id="xivSectin-grid-card-text">
    <h4>${itm.discription}</h4>
    <p>price : ${itm.price}$</p>
    </div>

    ` 
    xivSectinGrid.appendChild(div)
    })
   
}
 var catagoryFilter = document.getElementById('xivSectin-catagory-filter')
async function appendCatagory(){
   
    try {
        const res = await fetch('http://localhost:5002/api/projcatag/getallCatags',{
            method:"GET",
            headers:{
                'content-type':'application/json',
            },
        })
        if(res.status==200){
            const data = await res.json()
            console.log(data)
           
            data.forEach(obj => {
                let li = document.createElement('li')
                li.innerHTML=`<button>${obj.name}</button>` 
                console.log(li)
                catagoryFilter.appendChild(li)
            });
            
        }
    } catch (error) {
        alert("fail to connect with server")
    console.log({message:error.message})
    }
}



appendCatagory()
getProducts()