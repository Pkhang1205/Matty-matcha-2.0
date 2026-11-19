// Lưu Ds sản phẩm
let products = [];
const productsGrid = document.querySelector('#products-grid');

fetch("http://127.0.0.1:8000/api/products")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        products = data;
        renderProducts();
    });
// Render
function renderProducts(){
    
    productsGrid.innerHTML='';
    products.forEach(function(product){
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.dataset.category = product.category;
        productCard.innerHTML = `
            <div class="product-image">
                <img src="images/products/${product.image}" alt="${product.name}">
            </div>

            <div class="product-info">
                <h3>${product.name}</h3>

                <div class="product-bottom">
                    <p>${product.price.toLocaleString('vi-VN')}đ</p>

                    <button
                        class="add-cart"
                        data-id="${product.id}"
                        data-name="${product.name}"
                        data-price="${product.price}"
                        data-image="${product.image}">
                        +
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

//Thêm sp vào giỏ hàng
productsGrid.addEventListener('click', function(event) {
    const button = event.target.closest('.add-cart');
    if (!button) return;
    const image = button.dataset.image;

    const id = Number(button.dataset.id);
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    
    const existingItem = cart.find(function(item) {
        return item.id === id;
    });

    if (existingItem) {
        existingItem.quantity++;
        existingItem.image = image;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    saveCart();

    button.textContent = "✓";

    setTimeout(function() {
        button.textContent = "+";
    }, 500);
});


// ================= CATEGORY FILTER =================

const categoryButtons = document.querySelectorAll(".category-item");

let selectedCategory = "all";

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        categoryButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterProducts();
    });

});


// ================= SEARCH =================

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    filterProducts();
});

function filterProducts() {

    const keyword = searchInput.value.toLowerCase().trim();

    const productCards = document.querySelectorAll(".product-card");

    let visibleCount = 0;

    productCards.forEach(function(card) {

        const name = card.querySelector("h3").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const matchesKeyword = name.includes(keyword);

        if (matchesCategory && matchesKeyword) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }

    });

    const productTotal = document.querySelector("#product-total");
    const noResults = document.querySelector("#no-results");

    if (productTotal) {
        productTotal.textContent = visibleCount + " sản phẩm";
    }

    if (noResults) {
        noResults.hidden = visibleCount !== 0;
    }
}