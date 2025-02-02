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

        alert("Mahsulot qo'shildi! Shop sahifasiga o'ting.");
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("color").value = "";
        document.getElementById("image").value = "";
    } else {
        alert("Iltimos, barcha maydonlarni to'ldiring!");
    }
});
