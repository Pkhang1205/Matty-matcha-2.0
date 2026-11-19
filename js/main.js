
// ================= CART =================

// Lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Hiển thị tổng số lượng sản phẩm
function updateCartCount() {
    const cartCount = document.querySelector("#cart-count");
    if (!cartCount) return;
    const totalQuantity = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalQuantity;
}

// Lưu giỏ hàng
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Thêm sản phẩm vào giỏ hàng
updateCartCount();





// ================= MOBILE SIDEBAR =================

const sidebar = document.querySelector("#sidebar");
const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
const categoryToggle = document.querySelector("#category-toggle");

function toggleSidebar() {

    const isOpen = sidebar.classList.toggle("open");

    mobileMenuBtn.setAttribute("aria-expanded", isOpen);
}

if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener("click", toggleSidebar);
}

if (categoryToggle && sidebar) {
    categoryToggle.addEventListener("click", toggleSidebar);
}


// ================= BANNER CAROUSEL =================

const slides = document.querySelectorAll(".banner-slide");
const dots = document.querySelectorAll(".dot");

const previousBtn = document.querySelector("#prev-slide");
const nextBtn = document.querySelector("#next-slide");

let currentSlide = 0;

function showSlide(index) {

    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });

    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
}

if (slides.length > 0 && previousBtn && nextBtn) {

    nextBtn.addEventListener("click", function() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    });

    previousBtn.addEventListener("click", function() {
        let previousIndex =
            (currentSlide - 1 + slides.length) % slides.length;

        showSlide(previousIndex);
    });

    dots.forEach(function(dot) {
        dot.addEventListener("click", function() {
            showSlide(Number(dot.dataset.slide));
        });
    });
}