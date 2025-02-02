let tovar = document.querySelector(".Tovarlar");
let all = document.querySelector(".all");

function loadLocalStorageData() {
    let savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    showFront(savedProducts);
}

function showFront(data) {
    tovar.innerHTML = ''; 
    data.forEach((e, index) => {
        tovar.insertAdjacentHTML("beforeend", `
            <div class="card" data-id="${index}">
                <h1>${e.name}</h1>
                <h3>${e.price}</h3>
                <p>Color: ${e.color}</p>
                <img src="${e.image}" alt="${e.name}" width="100">
                <button class="delete-btn" data-id="${index}">O'chirish</button>
            </div>
        `);
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", deleteProduct);
    });
}

function deleteProduct(event) {
    let id = event.target.getAttribute('data-id');
    let savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    savedProducts.splice(id, 1);
    localStorage.setItem("products", JSON.stringify(savedProducts));
    loadLocalStorageData();
}

document.addEventListener("DOMContentLoaded", loadLocalStorageData);
