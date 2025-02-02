document.getElementById("create").addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let color = document.getElementById("color").value;
    let image = document.getElementById("image").value;

    if (name && price && color && image) {
        let newProduct = { name, price, color, image };
        
        let savedProducts = JSON.parse(localStorage.getItem("products")) || [];
        savedProducts.push(newProduct);
        localStorage.setItem("products", JSON.stringify(savedProducts));

        fetch("https://679a6524747b09cdcccebe3e.mockapi.io/tovarlar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(data => {
            alert("Mahsulot qo'shildi! Shop sahifasiga o'ting.");
            document.getElementById("name").value = "";
            document.getElementById("price").value = "";
            document.getElementById("color").value = "";
            document.getElementById("image").value = "";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Mahsulotni qo'shishda xato yuz berdi.");
        });
    } else {
        alert("Iltimos, barcha maydonlarni to'ldiring!");
    }
});
