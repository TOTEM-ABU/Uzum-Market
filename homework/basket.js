let div = document.querySelector("#root");
let narx = document.querySelector("span");

function showData() {
    let basket = JSON.parse(localStorage.getItem("cart")) || [];
    div.innerHTML = ""; 

    if (basket.length === 0) {
        div.innerHTML = "<p>Savat bo‘sh</p>";
        narx.innerText = "0";
        return;
    }

    let summa = 0;

    basket.forEach(e => {
        summa += parseFloat(e.price);

        div.insertAdjacentHTML("beforeend", `
        <div class="class">
            <h1>${e.name}</h1>
            <p>Narx: ${e.price}</p>
            <p>Rang: ${e.color}</p>
            <button onClick="delProduct(${e.id})">O‘chirish</button>
        </div>
        `);
    });

    narx.innerText = summa; 
}

function delProduct(id) {
    let basket = JSON.parse(localStorage.getItem("cart")) || [];
    let filtered = basket.filter(p => p.id != id);
    localStorage.setItem("cart", JSON.stringify(filtered));
    showData(); 
}

showData();
