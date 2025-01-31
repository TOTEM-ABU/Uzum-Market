let tovar = document.querySelector(".Tovarlar");
let all = document.querySelector(".all");
let iname = document.querySelector("#name");
let iprice = document.querySelector("#price");
let icolor = document.querySelector("#color");
let iphoto = document.querySelector("#image");
let ibutton = document.querySelector("#create");

function updateProductList() {
    fetch("https://679a6524747b09cdcccebe3e.mockapi.io/Tovarlar")
        .then(res => res.json())
        .then(res => output(res))
        .catch(error => console.error('Fetch xatolik:', error));
}

function showFront(data) {
    data.forEach(e => {
        tovar.insertAdjacentHTML("beforeend", `
            <h1>${e.name}</h1>
            <h3>${e.price}</h3>
            <img src="${e.image}" alt="${e.name}">   
        `);
    });
}

function output(products) {
    all.innerHTML = ''; 
    products.forEach(e => {
        all.insertAdjacentHTML("beforeend", `
            <div class="card">
                <h1>${e.name}</h1>
                <p>${e.color}</p>
                <p>${e.price}</p>
                <img src="${e.image}" alt="">
                <button class="delete" data-id="${e.id}">Delete</button>
            </div>    
        `);
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', deleteProduct);
    });
}

function deleteProduct(event) {
    let id = event.target.getAttribute('data-id');
    fetch(`https://679a6524747b09cdcccebe3e.mockapi.io/Tovarlar/${id}`, {
        method: "DELETE",
    }).then(() => {
        updateProductList(); 
    }).catch(error => console.error('Delete xatolik:', error));
}

function addProduct() {
    if (!iname.value || !iprice.value || !icolor.value || !iphoto.value) {
        alert("Iltimos, barcha maydonlarni to'ldiring.");
        return;
    }

    fetch("https://679a6524747b09cdcccebe3e.mockapi.io/Tovarlar", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: iname.value,
            price: iprice.value,
            color: icolor.value,
            image: iphoto.value,
        }),
    }).then(() => {
        updateProductList(); 
    }).catch(error => console.error('Add xatolik:', error));
}

fetch("https://679a6524747b09cdcccebe3e.mockapi.io/Tovarlar")
    .then(res => res.json())
    .then(res => showFront(res))
    .catch(error => console.error('Initial fetch xatolik:', error));

ibutton.addEventListener("click", addProduct);

updateProductList();
