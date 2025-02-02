let div = document.querySelector("#root");
let narx = document.querySelector("span");

let api = axios.create({
    baseURL: "https://679efffc946b0e23c06477dd.mockapi.io/",
});

function showData(arr) {
    arr.forEach(e => {
        div.insertAdjacentHTML("beforeend", `
        <div class="class">
            <h1>${e.name}</h1>
            <p>${e.price}</p>
            <p>${e.color}</p>
            
            <button onClick="delProduct(${e.id})">Delete</button>
        </div>
        `);
    });
}

function delProduct(id) {
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    let filtered = basket.filter((p) => p.id !== id);
    localStorage.setItem("basket", JSON.stringify(filtered));
    location.reload();
}

async function getData() {
    try {
        let response = await api.get("/tavarlar");

        let basket = JSON.parse(localStorage.getItem("basket")) || [];
        let filtered = response.data.filter((p) => basket.some(item => item.id === p.id));
        
        let summa = filtered.reduce((acc, e) => acc + parseFloat(e.price), 0);
        narx.innerText = summa;

        showData(filtered);
    } catch (error) {
        console.error("Xato:", error);
    }
}

getData();
