const products = [
    { id: 1, name: "Chocolate Cake", price: 550, category: "Cakes", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" },
    { id: 2, name: "Strawberry Cake", price: 650, category: "Cakes", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187" },
    { id: 3, name: "Chocolate Truffle Pastry", price: 90, category: "Pastries", image:"./image/chocolate truffle pastry.jpg"  },
    { id: 4, name: "Fresh Bread", price: 50, category: "Bread", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff" },
    { id: 5, name: "Cupcakes", price: 60, category: "Desserts", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d" },
    { id: 6, name: "Donuts", price: 70, category: "Desserts", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307" },
    { id: 7, name: "Brownies", price: 80, category: "Desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c" },
    { id: 8, name: "Croissants", price: 90, category: "Bread", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a" },
    { id: 9, name: "Chocolate Cookies", price: 120, category: "Cookies", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e" },
    { id: 10,name: "Fruit Tart", price: 140, category: "Desserts", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777" },
    { id: 11,name: "Veg Puff",price: 35, category: "Savouries", image: "image/vegpuff.jpg"},
    { id: 12,name:"Caramel Cheese Pastry", price: 110, category: "Pastries", image: "image/caramelcheese pastry.jpg" },
    { id: 13,name:"Red Velvet Cookies",price:160,category:"Cookies",image:"image/redvevlvetcookie.jpg"},
    { id: 14,name:"Double Chocolate Cookies",price:160,category:"Cookies",image:"image/doublechocookie.jpg"},
    { id: 15,name:"Oats Cookies",price:160,category:"Cookies",image:"image/oats.jpg"},
    { id: 16, name:"Strawberry Cookies", price:180, category:"Cookies", image:"image/strawberry-cookies.jpg" },
    { id: 17, name:"Almond Cookies", price:190, category:"Cookies", image:"image/almond-cookies.jpg" },
    { id: 18, name:"Coconut Cookies", price:150, category:"Cookies", image:"image/Coconut.jpg" },
    { id: 19, name:"Butter Cookies", price:140, category:"Cookies", image:"image/butter-cookies.jpg" },
    { id: 20, name:"Cashew Cookies", price:200, category:"Cookies", image:"image/cashew-cookies.jpg" },
    { id: 22, name: "Red Velvet Cake", price: 750, category: "Cakes", image: "image/red-velvet-cake.jpg" },
     { id: 21, name: "Black Forest Cake", price: 650, category: "Cakes", image: "image/black.jpg"}, 
    { id: 23, name: "Butterscotch Cake", price: 600, category: "Cakes", image: "image/butterscotch-cake.jpg" },
    { id: 24, name: "Oreo Cake", price: 750, category: "Cakes", image: "image/oreo-cake.jpg" },
     { id: 30, name: "Rasmalai Cake", price: 850, category: "Cakes", image: "image/rasmalai-cake.jpg" },
      { id: 24, name: "White Forest Cake", price: 700, category: "Cakes", image: "image/white.jpg" },

]

const WHATSAPP_NUMBER = "919080107656";

let cart = JSON.parse(localStorage.getItem("bakeryCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("bakeryWishlist")) || [];
let reviews = JSON.parse(localStorage.getItem("bakeryReviews")) || [];

const $ = id => document.getElementById(id);

function saveData() {
    localStorage.setItem("bakeryCart", JSON.stringify(cart));
    localStorage.setItem("bakeryWishlist", JSON.stringify(wishlist));
    localStorage.setItem("bakeryReviews", JSON.stringify(reviews));
}

function updateCounts() {
    const cartCount = $("cartCount");
    const wishlistCount = $("wishCount");

    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// DARK MODE
// DARK MODE ONLY
function setupDarkMode() {
    document.body.classList.add("dark-mode");
}

// DISPLAY PRODUCTS

function displayProducts() {
    const list = document.getElementById("productList");
    if (!list) return;

    const search =
        document.getElementById("search")?.value.toLowerCase().trim() || "";

    const category =
    new URLSearchParams(window.location.search).get("category") || "all";

    const sort =
        document.getElementById("sort")?.value || "default";

    let filtered = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    list.innerHTML = "";

    if (filtered.length === 0) {
        list.innerHTML = "<p>No products found.</p>";
        return;
    }

    filtered.forEach(product => {
        const wished = wishlist.includes(product.id);

        list.innerHTML += `
            <div class="product-card">
                <div class="image-box" data-details="${product.id}">
                    <img src="${product.image}"
                         alt="${product.name}"
                         loading="lazy">
                </div>

                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p class="price">₹${product.price}</p>

                <button data-add="${product.id}">Add to Cart</button>

                <button data-wish="${product.id}">
                    ${wished ? "♥ Saved" : "♡ Wishlist"}
                </button>

                <button data-details="${product.id}">View Details</button>
            </div>
        `;
    });
}


// DISPLAY WISHLIST

function displayWishlist() {
    const list = document.getElementById("wishlistList")
        || document.getElementById("wishlistItems");

    if (!list) return;

    list.innerHTML = "";

    wishlist.forEach(id => {
        const product = products.find(p => p.id === Number(id));
        if (!product) return;

        list.innerHTML += `
            <div class="product-card">
                <img src="${product.image}"
                     alt="${product.name}"
                     style="width:100%; max-width:250px; border-radius:12px;">

                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p class="price">₹${product.price}</p>

                <button data-add="${product.id}">
                    Add to Cart
                </button>

                <button data-wish="${product.id}">
                    Remove from Wishlist
                </button>
            </div>
        `;
    });

    if (wishlist.length === 0) {
        list.innerHTML = "<p>Your wishlist is empty.</p>";
    }
}

// ADD TO CART
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveData();
    updateCounts();
    updateCart();
    alert(product.name + " added to cart!");
}

// UPDATE CART
function updateCart() {
    const list = $("cartItems");
    const totalElement = $("cartTotal");

    if (!list) return;

    list.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        list.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ₹${item.price}</span>

                <button data-qty="${item.id}" data-change="-1">−</button>
                <span>${item.quantity}</span>
                <button data-qty="${item.id}" data-change="1">+</button>

                <button data-remove="${item.id}">Remove</button>
            </div>
        `;
    });

    if (cart.length === 0) {
        list.innerHTML = "<p>Your cart is empty.</p>";
    }

    if (totalElement) {
        totalElement.textContent = "₹" + total;
    }
}

// CHANGE CART QUANTITY
function changeQuantity(id, change) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    saveData();
    updateCounts();
    updateCart();
}

// REMOVE FROM CART
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveData();
    updateCounts();
    updateCart();
}

// WISHLIST
function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }

    saveData();
    updateCounts();
    displayProducts();
    displayWishlist();
}

// PRODUCT DETAILS
function showDetails(id) {
    const product = products.find(p => p.id === id);
    const dialog = $("productDialog");

    if (!product || !dialog) return;

    const details = $("productDetails");

    if (details) {
        details.innerHTML = `
            <img src="${product.image}" alt="${product.name}"
                 style="width:100%;max-width:300px">
            <h2>${product.name}</h2>
            <p>Category: ${product.category}</p>
            <h3>Price: ₹${product.price}</h3>
            <button data-add="${product.id}">Add to Cart</button>
            <button data-order="${product.id}">Place Order</button>
        `;
    }

    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        alert(product.name + " - ₹" + product.price);
    }
}
// PLACE ORDER FROM PRODUCT DETAILS
// PLACE ORDER FROM PRODUCT DETAILS

function placeOrder(id) {
    const product = products.find(p => p.id === Number(id));

    if (!product) return;

    const existing = cart.find(item => item.id === product.id);

    if (!existing) {
        cart.push({ ...product, quantity: 1 });
    }

    saveData();
    updateCounts();

    window.location.href = "order.html";
}

// CUSTOMER REVIEWS
function displayReviews() {
    const list = $("reviewList");
    if (!list) return;

    list.innerHTML = "";

    reviews.forEach(review => {
        const card = document.createElement("div");
        card.className = "review-card";

        const heading = document.createElement("h3");
        heading.textContent = review.name;

        const rating = document.createElement("p");
        rating.textContent = "Rating: " + "★".repeat(review.rating);
        rating.textContent = "★★★★★".slice(0, review.rating);
rating.style.color = "#FFD700";
rating.style.fontSize = "20px";
rating.style.fontWeight = "normal";
rating.style.margin = "8px 0";
        rating.style.textAlign = "center";
        const message = document.createElement("p");
        message.textContent = review.message;
        rating.style.fontWeight = "bold";
        rating.style.fontSize = "24px";
        rating.style.color = "#FFD700";
     card.append(rating, message, heading);
        
        list.appendChild(card);
    });

    if (reviews.length === 0) {
        list.textContent = "No reviews yet. Be the first to review us!";
    }
}

// WHATSAPP ORDER
function orderOnWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const items = cart.map(item =>
        `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join("\n");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const message = `Hello Sweet Crumbs Bakery!\n\nMy Order:\n${items}\n\nTotal: ₹${total}`;

    if (WHATSAPP_NUMBER.includes("X")) {
        alert("Please replace WHATSAPP_NUMBER in script.js with your WhatsApp number.");
        return;
    }

    window.open(
        "https://wa.me/" + WHATSAPP_NUMBER +
        "?text=" + encodeURIComponent(message),
        "_blank"
    );
}

// PAGE INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    // Close Place Your Order popup
$("closeOrder")?.addEventListener("click", () => {
    $("orderDialog")?.close();
});
    setupDarkMode();
    document.body.classList.add("dark-mode");
    updateCounts();
    const selectedCategory =
    new URLSearchParams(window.location.search).get("category");

const categoryTitle = $("categoryTitle");

if (categoryTitle && selectedCategory) {
    categoryTitle.textContent = selectedCategory + " Varieties 🧁";
}
    displayProducts();
    displayWishlist();
    updateCart();
    displayReviews();

    // Search, category and sorting
    ["search", "category", "sort"].forEach(id => {
    $(id)?.addEventListener("input", displayProducts);
    $(id)?.addEventListener("change", displayProducts);
});

    // Product, cart and wishlist buttons
    document.addEventListener("click", event => {
        const button = event.target.closest("button, [data-details]");
        if (!button) return;
if (button.dataset.add) {
    addToCart(Number(button.dataset.add));
}

if (button.dataset.order) {
    placeOrder(Number(button.dataset.order));
}
        

        if (button.dataset.wish) {
            toggleWishlist(Number(button.dataset.wish));
        }

        if (button.dataset.details) {
            showDetails(Number(button.dataset.details));
        }

        if (button.dataset.qty) {
            changeQuantity(
                Number(button.dataset.qty),
                Number(button.dataset.change)
            );
        }

        if (button.dataset.remove) {
            removeFromCart(Number(button.dataset.remove));
        }
    });
        // Clear cart
$("clearCartBtn")?.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is already empty!");
        return;
    }

    if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        saveData();
        updateCounts();
        updateCart();
        alert("Cart cleared successfully!");
    }
});
    
   // Proceed to order

$("proceedOrderBtn")?.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }


    window.location.href = "order.html";
});

    // Open cart in a separate page
$("cartBtn")?.addEventListener("click", () => {
    window.location.href = "cart.html";
});

    $("closeCartBtn")?.addEventListener("click", () => {
        if ($("cartPanel")) $("cartPanel").hidden = true;
    });

    // Close product details
    $("closeProductBtn")?.addEventListener("click", () => {
        $("productDialog")?.close();
    });

    // Checkout
    $("checkoutBtn")?.addEventListener("click", orderOnWhatsApp);

    // Review form
    $("reviewForm")?.addEventListener("submit", event => {
        event.preventDefault();

        const name = $("reviewName")?.value.trim();
        const rating = Number($("reviewRating")?.value);
        const message = $("reviewText")?.value.trim();

        if (!name || !message || rating < 1 || rating > 5) {
            alert("Please enter your name, rating and review.");
            return;
        }

        reviews.unshift({ name, rating, message });
        saveData();
        displayReviews();
        event.target.reset();

        alert("Thank you for your review!");
    });

    // Contact form
    $("contactForm")?.addEventListener("submit", event => {
        event.preventDefault();
        alert("Thank you! Your message has been submitted.");
        event.target.reset();
    });

    // Order form 
    // Order form - Success Screen
    $("orderForm")?.addEventListener("submit", event => {
        event.preventDefault();

        const name = $("customerName")?.value.trim();
        const phone = $("customerPhone")?.value.trim();
        const address = $("customerAddress")?.value.trim();
        const payment = document.querySelector(
            'input[name="payment"]:checked'
        )?.value;

        if (!name || !phone || !address || !payment) {
            alert("Please fill in all order details.");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty! Please add products first.");
            return;
        }

        const items = cart.map(item =>
            `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
        ).join("\n");

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );

        const message =
            `Hello Sweet Crumbs Bakery!\n\n` +
            `Name: ${name}\nPhone: ${phone}\n` +
            `Address: ${address}\n\n` +
            `Order:\n${items}\n\n` +
            `Total: ₹${total}\nPayment: ${payment}`;

        if (WHATSAPP_NUMBER.includes("X")) {
            alert("Please set your WhatsApp number in script.js.");
            return;
        }

        const whatsappURL =
            "https://wa.me/" + WHATSAPP_NUMBER +
            "?text=" + encodeURIComponent(message);

// Show success screen immediately
const orderCard = document.querySelector(".order-card");

if (orderCard) {
    orderCard.innerHTML = `
        <div class="order-success">
            <div class="success-icon">✓</div>
            <h1>ORDER PLACED SUCCESSFULLY!</h1>
            <p>Thank you, ${name.replace(/[&<>"']/g, "")} 💜</p>
            <p>Your order total is <strong>₹${total}</strong></p>
            <p class="success-note">
                Thank you for ordering from Sweet Crumbs Bakery!
            </p>
            <button type="button" id="continueWhatsApp" class="back-shopping">
    💚 Continue to WhatsApp
</button>
            <a href="products.html" class="back-shopping">
                🧁 Continue Shopping
            </a>
        </div>
    `;

    // Clear cart after successful order
    cart = [];
    saveData();
    updateCounts();
    updateCart();
}
const whatsappButton = document.getElementById("continueWhatsApp");

if (whatsappButton) {
    whatsappButton.addEventListener("click", () => {
        window.open(whatsappURL, "_blank");
    });
}
        });// End of orderForm submit event
    });// End of PAGE INITIALIZATION
    // Open WhatsApp after showing success screen
setTimeout(() => {
    window.open(whatsappURL, "_blank");
}, 1000);

//close button//
document.getElementById("closeDetails")?.addEventListener("click", function () {
    document.getElementById("productDialog")?.close();
});
function displayOrderDetails() {
    const cart = JSON.parse(localStorage.getItem("bakeryCart")) || [];
    const orderDetails = document.getElementById("orderDetails");

    if (!orderDetails) return;

    if (cart.length === 0) {
        orderDetails.innerHTML = "<p>Your cart is empty!</p>";
        return;
    }

    let total = 0;

    orderDetails.innerHTML = cart.map(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        return `
            <div class="order-item">
                <p><strong>${item.name}</strong></p>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Subtotal: ₹${subtotal}</p>
            </div>
        `;
    }).join("") + `
        <h3>Total Amount: ₹${total}</h3>
    `;
}

document.addEventListener("DOMContentLoaded", displayOrderDetails);