let tovar = document.querySelector(".Tovarlar");
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
                <button class="add-to-cart-btn" data-id="${e.id}">Savatga</button>
                <button class="edit-btn" data-id="${e.id}">Tahrirlash</button>
            </div>
        `);
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", deleteProduct);
    });
    
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("dblclick", editProduct);
    });

    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", addToCart);
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", editProduct);
    });
}

function updateProductList() {
    fetch("https://679a6524747b09cdcccebe3e.mockapi.io/tovarlar")
        .then(res => res.json())
        .then(res => showFront(res))  
        .catch(error => console.error('Error fetching products:', error));
}

function deleteProduct(event) {
    let id = event.target.getAttribute('data-id');
    if (!id) return;

    fetch(`https://679a6524747b09cdcccebe3e.mockapi.io/tovarlar/${id}`, {
        method: "DELETE",
    }).then(() => {
        updateProductList(); 
    }).catch(error => console.error('Delete error:', error));
}

ibutton.addEventListener("click", addProduct);
function addProduct() {
    let name = iname.value;
    let price = iprice.value;
    let color = icolor.value;
    let image = iphoto.value;

    if (!name || !price || !color || !image) {
        alert("Please fill in all fields");
        return;
    }

    let newProduct = {
        name: name,
        price: price,
        color: color,
        image: image
    };

    fetch("https://679a6524747b09cdcccebe3e.mockapi.io/tovarlar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    }).then(() => {
        updateProductList();
    }).catch(error => console.error('Add product error:', error));
}

function editProduct(event) {
    let id = event.target.getAttribute('data-id');
    if (!id) return;

    fetch(`https://679a6524747b09cdcccebe3e.mockapi.io/tovarlar/${id}`)
        .then(res => res.json())
        .then(product => {
            let name = prompt("Enter new name:", product.name);
            let price = prompt("Enter new price:", product.price);
            let color = prompt("Enter new color:", product.color);
            let image = prompt("Enter new image URL:", product.image);

            if (!name || !price || !color || !image) {
                alert("Please fill in all fields");
                return;
            }

            let updatedProduct = {
                name: name,
                price: price,
                color: color,
                image: image
            };

            fetch(`https://679a6524747b09cdcccebe3e.mockapi.io/tovarlar/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            }).then(() => {
                updateProductList();
            }).catch(error => console.error('Edit product error:', error));
        })
        .catch(error => console.error('Error fetching product for edit:', error));
}

function addToCart(event) {
    let id = event.target.getAttribute('data-id');
    if (!id) return;

    fetch(`https://679a6524747b09cdcccebe3e.mockapi.io/tovarlar/${id}`)
        .then(res => res.json())
        .then(product => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Product added to cart!");
        })
        .catch(error => console.error('Add to cart error:', error));
}

updateProductList();