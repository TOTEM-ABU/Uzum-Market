let tovar = document.querySelector(".Tovarlar");
let all = document.querySelector(".all");
let iname = document.querySelector("#name");
let iprice = document.querySelector("#price");
let icolor = document.querySelector("#color");
let iphoto = document.querySelector("#image");
let ibutton = document.querySelector("#create");

function showFront(data) {
    tovar.innerHTML = ''; 
    data.forEach(e => {
        tovar.insertAdjacentHTML("beforeend", `
            <div class="card" data-id="${e.id}">
                <h1>${e.name}</h1>
                <h3>${e.price}</h3>
                <img src="${e.image}" alt="${e.name}">
                <button class="delete-btn" data-id="${e.id}">O'chirish</button>
            </div>
        `);
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", deleteProduct);
    });
}

function updateProductList() {
    fetch("https://679a6524747b09cdcccebe3e.mockapi.io/Tovarlar")
        .then(res => res.json())
        .then(res => showFront(res))  
        .catch(error => console.error('Error fetching products:', error));
}

function deleteProduct(event) {
    let id = event.target.getAttribute('data-id');
    if (!id) return;

    fetch(`https://679a6524747b09cdcccebe3e.mockapi.io/Tovarlar/${id}`, {
        method: "DELETE",
    }).then(() => {
        updateProductList(); 
    }).catch(error => console.error('Delete error:', error));
}

function addProduct() {
    if (!iname.value || !iprice.value || !icolor.value || !iphoto.value) {
        alert("Iltimos, barcha maydonlarni to'ldiring.");
        return;
    }

    fetch("https://679a6524747b09cdcccebe3e.mockapi.io/Tovarlar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: iname.value,
            price: iprice.value,
            color: icolor.value,
            image: iphoto.value,
        }),
    })
    .then(() => {
        updateProductList();
        location.reload(); 
    })
    .catch(error => console.error('Add product error:', error));
}

fetch("https://679a6524747b09cdcccebe3e.mockapi.io/Tovarlar")
    .then(res => res.json())
    .then(res => showFront(res)) 
    .catch(error => console.error('Initial fetch error:', error));

ibutton.addEventListener("click", addProduct);

updateProductList();
