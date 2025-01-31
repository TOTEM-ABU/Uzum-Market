let tovar = document.querySelector(".Tovarlar")

function showFront(data){
    data.forEach(e => {
        tovar.insertAdjacentHTML("beforeend",`
            <div class="card"
            <h1>${e.name}</h1>
            <h3>${e.price}</h3>
            <img src="${e.image}" alt="Rasm bor edi"> 
            </div>  
        `)
    });
    
}

fetch("https://679a6524747b09cdcccebe3e.mockapi.io/Tovarlar").then(resp => resp.json()).then(resp=>showFront(resp))