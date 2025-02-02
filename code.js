let all = document.querySelector(".all");
let iname = document.querySelector("#name");
let iprice = document.querySelector("#price");
let icolor = document.querySelector("#color");
let iphoto = document.querySelector("#image");
let ibutton = document.querySelector("#create");

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
    fetch(`https://679a16d6747b09cdcccda4c4.mockapi.io/api/Home${id}`, {
        method: "DELETE",
    }).then(() => {
        fetch("https://679a16d6747b09cdcccda4c4.mockapi.io/api/Home")
            .then(res => res.json())
            .then(res => output(res)); 
    });
}

function addProduct() {
    fetch("https://679a16d6747b09cdcccda4c4.mockapi.io/api/Home", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            name: iname.value,
            price: iprice.value,
            color: icolor.value,
            image: iphoto.value,
        }),
    }).then(() => {
        fetch("https://679a16d6747b09cdcccda4c4.mockapi.io/api/Home")
            .then(res => res.json())
            .then(res => output(res)); 
    });
}

fetch("https://679a16d6747b09cdcccda4c4.mockapi.io/api/Home")
    .then(res => res.json())
    .then(res => output(res));

ibutton.addEventListener("click", addProduct);