const cartItems = document.querySelector("#cart-items");
const cartSubtotal = document.querySelector("#cart-subtotal");
const cartTotal = document.querySelector("#cart-total");
const checkoutForm = document.querySelector("#checkout-form");
const orderSuccessMessage = document.querySelector("#order-success");

// ================= RENDER CART

function renderCart() {

    cartItems.innerHTML = "";

    // Giỏ hàng trống
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="cart-empty">
                <p>Giỏ hàng trống</p>
                <a href="menu.html">Tiếp tục mua hàng</a>
            </div>
        `;

        cartSubtotal.textContent = "0đ";
        cartTotal.textContent = "0đ";

        return;
    }

    // Render từng sản phẩm
    cart.forEach(function(item) {

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="images/products/${item.image || ""}" alt="${item.name}">
            </div>

            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price.toLocaleString("vi-VN")}đ</p>

                <div class="cart-item-quantity">
                    <button class="decrease-btn" data-id="${item.id}">−</button>
                    <span>${item.quantity}</span>
                    <button class="increase-btn" data-id="${item.id}">+</button>
                </div>
            </div>

            <button class="cart-item-remove" data-id="${item.id}">
                Xóa
            </button>
        `;

        cartItems.appendChild(cartItem);
    });


    // Tính tổng tiền
    const subtotal = cart.reduce(function(total, item) {
        return total + item.price * item.quantity;
    }, 0);

    cartSubtotal.textContent = subtotal.toLocaleString("vi-VN") + "đ";
    cartTotal.textContent = subtotal.toLocaleString("vi-VN") + "đ";
}

renderCart();


// ================= SỰ KIỆN CART

cartItems.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button) return;

    const id = Number(button.dataset.id);

    const item = cart.find(function(item) {
        return item.id === id;
    });

    if (!item) return;


    // Tăng số lượng
    if (button.classList.contains("increase-btn")) {
        item.quantity++;
    }


    // Giảm số lượng
    if (button.classList.contains("decrease-btn")) {

        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter(function(item) {
                return item.id !== id;
            });
        }
    }


    // Xóa sản phẩm
    if (button.classList.contains("cart-item-remove")) {

        cart = cart.filter(function(item) {
            return item.id !== id;
        });
    }


    // Lưu và render lại
    saveCart();
    renderCart();

});

// ================= CHECKOUT FORM

checkoutForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.querySelector("#customer-name").value.trim();
    const phone = document.querySelector("#customer-phone").value.trim();
    const address = document.querySelector("#customer-address").value.trim();
    const note = document.querySelector("#customer-note").value.trim();

    const orderData = {
        customer: {
            name: name,
            phone: phone,
            address: address,
            note: note
        },

        items: cart.map(function(item) {
            return {
                product_id: item.id,
                quantity: item.quantity
            };
        })
    };

    console.log(orderData);

    try {
        const response = await fetch("https://matty-matcha-api.onrender.com/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Không thể đặt hàng");
        }

        // 1. Đặt hàng thành công 
        orderSuccessMessage.textContent =
            `Đặt hàng thành công! Mã đơn: ${data.order_id}. Tổng tiền: ${data.total.toLocaleString("vi-VN")}đ`;

        orderSuccessMessage.hidden = false;

        // 2. Xóa giỏ hàng
        cart = [];

        // 3. Lưu giỏ hàng mới
        saveCart();

        // 4. Render lại giỏ hàng
        renderCart();

        // 5. Reset form
        checkoutForm.reset();

        console.log(data);
    } 
    catch (error) {
        console.error("Lỗi gửi đơn hàng:", error.message);
    }
});
