// default products with chocolate, cream, and dry fruit data
const defaultProducts = [
    // Chocolate Products
    { id: 1, name: "Chocolate Cake", theme: "Chocolate", category: "Cakes", price: 2200.00, weight: "1", weightUnit: "kg", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500", hidden: false, description: "Rich Belgian chocolate cake with ganache frosting." },
    { id: 2, name: "Chocolate Bread", theme: "Chocolate", category: "Pastries", price: 280.00, weight: "500", weightUnit: "g", image: "chocolate_bread.png", hidden: false, description: "Soft bread swirled with premium chocolate." },
    { id: 3, name: "Chocolate Biscuit", theme: "Chocolate", category: "Cookies", price: 180.00, weight: "250", weightUnit: "g", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500", hidden: false, description: "Crunchy biscuits loaded with chocolate chips." },
    
    // Cream / Milk Products
    { id: 11, name: "Creamy Donuts", theme: "Cream", category: "Other Delights", price: 1800.00, weight: "1", weightUnit: "kg", image: "c1.png", hidden: false, description: "Smooth vanilla cream with a hint of honey." },
    { id: 12, name: "Coconut Milk Biscuit", theme: "Cream", category: "Cookies", price: 2200.00, weight: "1", weightUnit: "kg", image: "c2.png", hidden: false, description: "Extra creamy frosting on a sponge base." },
    { id: 4, name: "Premium Cream Pastry", theme: "Cream", category: "Pastries", price: 220.00, weight: "1", weightUnit: "pc", image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=500", hidden: false, description: "Delicate pastry layers filled with rich vanilla cream." },
    { id: 5, name: "Milky Laddu", theme: "Cream", category: "Other Delights", price: 950.00, weight: "500", weightUnit: "g", image: "https://images.unsplash.com/photo-1599598425947-33002629390b?w=500", hidden: false, description: "Traditional sweet made with pure milk solids." },
    { id: 6, name: "Cream Cake", theme: "Cream", category: "Cakes", price: 2000.00, weight: "1", weightUnit: "kg", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500", hidden: false, description: "Light and fluffy cake with fresh cream layering." },
    { id: 7, name: "Strawberry Pink Cake", theme: "Cream", category: "Cakes", price: 2400.00, weight: "1", weightUnit: "kg", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500", hidden: false, description: "Delicate strawberry flavored cake with pink frosting." },
    { id: 8, name: "Blue Velvet Cake", theme: "Cream", category: "Cakes", price: 2500.00, weight: "1", weightUnit: "kg", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500", hidden: false, description: "Striking blue velvet cake with cream cheese frosting." },
    
    // Dry Fruit Products
    { id: 13, name: "Nuts Bread", theme: "Dry Fruit", category: "Pastries", price: 3200.00, weight: "1", weightUnit: "kg", image: "d1.png", hidden: false, description: "A luxurious bread loaded with premium roasted nuts." },
    { id: 14, name: "Almond Cake", theme: "Dry Fruit", category: "Cakes", price: 2800.00, weight: "1", weightUnit: "kg", image: "d2.png", hidden: false, description: "Sweet honey glazed almonds on a soft, rich base." },
    { id: 15, name: "Fruit Cake", theme: "Dry Fruit", category: "Cakes", price: 3500.00, weight: "1", weightUnit: "kg", image: "d3.png", hidden: false, description: "The ultimate dry fruit experience for special occasions." },
    { id: 9, name: "Dry Fruit Cake", theme: "Dry Fruit", category: "Cakes", price: 2800.00, weight: "1", weightUnit: "kg", image: "https://images.unsplash.com/photo-1571115177098-24edf7784032?w=500", hidden: false, description: "Nutty and rich cake packed with premium dry fruits." },
    { id: 10, name: "Mixed Dry Cake", theme: "Dry Fruit", category: "Cakes", price: 1900.00, weight: "500", weightUnit: "g", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500", hidden: false, description: "Assorted dry fruit sponge cake." }
];

// Product Management
function getProducts() {
    let products = localStorage.getItem('bakeDelightProducts_v18'); // bumped version to v18
    if (!products) {
        localStorage.setItem('bakeDelightProducts_v18', JSON.stringify(defaultProducts));
        return defaultProducts;
    }
    return JSON.parse(products);
}

function saveProducts(products) {
    localStorage.setItem('bakeDelightProducts_v18', JSON.stringify(products));
}

// Cart Management
let cart = JSON.parse(localStorage.getItem('bakeDelightCart_v2')) || [];

function saveCart() {
    localStorage.setItem('bakeDelightCart_v2', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    countElements.forEach(el => {
        el.textContent = totalCount;
    });
}

function addToCart(productIdOrName, price, image) {
    let product;
    
    if (typeof productIdOrName === 'number') {
        const products = getProducts();
        product = products.find(p => p.id === productIdOrName);
    } else {
        // Handle manual addition (for the new fixed portions)
        product = {
            id: 'manual-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
            name: productIdOrName,
            price: price,
            image: image,
            quantity: 1
        };
    }

    if (!product) return;

    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        if (typeof productIdOrName === 'number') {
            cart.push({ ...product, quantity: 1 });
        } else {
            cart.push(product);
        }
    }
    saveCart();
    
    // Smooth notification instead of alert
    showNotification(`${product.name} added to cart!`);
}

function showNotification(message) {
    const note = document.createElement('div');
    note.className = 'cart-notification';
    note.textContent = message;
    document.body.appendChild(note);
    setTimeout(() => note.classList.add('show'), 100);
    setTimeout(() => {
        note.classList.remove('show');
        setTimeout(() => note.remove(), 500);
    }, 3000);
}

function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart();
    }
}

// UI Rendering
function renderProducts(containerId, filter = 'All', onlyBestSellers = false, isHome = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const products = getProducts();
    container.innerHTML = '';
    
    let filteredProducts = products.filter(p => !p.hidden);
    
    if (onlyBestSellers) {
        filteredProducts = filteredProducts.filter(p => p.bestSeller).slice(0, 4);
    } else if (filter !== 'All') {
        if (isHome) {
            filteredProducts = filteredProducts.filter(p => p.theme === filter);
        } else {
            filteredProducts = filteredProducts.filter(p => p.category === filter);
        }
    }
    
    // Limit to 3 for home page sections
    if (isHome) {
        filteredProducts = filteredProducts.slice(0, 3);
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = isHome ? 'product-card home-card' : 'product-card';
        
        if (isHome) {
            // Simplified view for home page (No price, no cart button)
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description || ''}</p>
                </div>
            `;
        } else {
            // Full view for products page
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-weight">${product.weight ? product.weight + ' ' + (product.weightUnit || '') : ''}</p>
                    <p class="product-description">${product.description || ''}</p>
                    <p class="product-price">Rs. ${product.price.toFixed(2)}</p>
                    <button class="btn btn-secondary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
        }
        container.appendChild(card);
    });
}

// Cart Modal Logic
function getCartModal() {
    return document.getElementById('cartModal');
}

function openCart() {
    const modal = getCartModal();
    if (modal) {
        modal.classList.add('open');
        renderCartItems();
        setMinDateTime();
    }
}

function closeCart() {
    const modal = getCartModal();
    if (modal) {
        modal.classList.remove('open');
    }
}

document.addEventListener('click', (e) => {
    const modal = getCartModal();
    const closeBtn = document.getElementById('closeCart');
    
    if (closeBtn && closeBtn.contains(e.target)) {
        closeCart();
    }
    
    if (e.target === modal) {
        closeCart();
    }
});

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    if (!cartItemsContainer || !cartTotalElement) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.textContent = 'Total: Rs. 0.00';
        return;
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-weight">${item.weight ? item.weight + ' ' + (item.weightUnit || '') : ''}</p>
                    <p>Rs. ${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="cart-item-actions">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartTotalElement.textContent = `Total: Rs. ${total.toFixed(2)}`;
}

// Set Minimum Date Time for Delivery (24 hours from now)
function setMinDateTime() {
    const datetimeInput = document.getElementById('deliveryTime');
    if (!datetimeInput) return;

    const now = new Date();
    now.setHours(now.getHours() + 24);
    
    // Format to YYYY-MM-DDThh:mm
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    datetimeInput.min = minDateTime;
    // Set initial value to min if empty
    if (!datetimeInput.value) {
        datetimeInput.value = minDateTime;
    }
}

// WhatsApp Checkout
function processCheckout(event) {
    event.preventDefault();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const deliveryTime = document.getElementById('deliveryTime').value;

    if (!name || !deliveryTime) {
        alert("Please fill in all required fields.");
        return;
    }

    // Validate delivery time again just in case (with a 1 hour buffer for form filling time)
    const selectedDate = new Date(deliveryTime);
    const minDate = new Date();
    minDate.setHours(minDate.getHours() + 23);

    if (selectedDate < minDate) {
        alert("Delivery time must be at least 24 hours from now.");
        return;
    }

    let orderDetails = cart.map(item => `• ${item.name} (${item.weight ? item.weight + ' ' + (item.weightUnit || '') : ''}) (x${item.quantity}) - Rs. ${(item.price * item.quantity).toFixed(2)}`).join('\n');
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const message = `Hello Bake Delight! I'd like to place an order.\n\n*Customer Details:*\nName: ${name}\nPhone: ${phone}\nDelivery: ${new Date(deliveryTime).toLocaleString()}\n\n*Order Details:*\n${orderDetails}\n\n*Total Price:* Rs. ${total.toFixed(2)}`;
    
    const whatsappUrl = `https://wa.me/923295431127?text=${encodeURIComponent(message)}`;
    
    // Clear cart and close
    cart = [];
    saveCart();
    closeCart();
    
    // Open WhatsApp reliably
    window.location.href = whatsappUrl;
}

// Initialization on load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    if (document.getElementById('chocolateGrid')) {
        renderProducts('chocolateGrid', 'Chocolate', false, true);
    }
    
    if (document.getElementById('creamGrid')) {
        renderProducts('creamGrid', 'Cream', false, true);
    }
    
    if (document.getElementById('dryFruitGrid')) {
        renderProducts('dryFruitGrid', 'Dry Fruit', false, true);
    }

    if (document.getElementById('allProductsGrid')) {
        renderProducts('allProductsGrid', 'All', false);
        
        // Setup filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const filter = e.target.getAttribute('data-filter');
                renderProducts('allProductsGrid', filter, false);
            });
        });
    }

    // Auto-play logic for Visual Delights gallery slider
    const gallerySlider = document.querySelector('.gallery-slider');
    if (gallerySlider) {
        let isHovered = false;
        gallerySlider.addEventListener('mouseenter', () => isHovered = true);
        gallerySlider.addEventListener('mouseleave', () => isHovered = false);
        
        setInterval(() => {
            if (!isHovered) {
                // Check if we are at the end
                if (gallerySlider.scrollLeft + gallerySlider.clientWidth >= gallerySlider.scrollWidth - 10) {
                    // Rewind to start
                    gallerySlider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll to next image
                    let scrollDistance = gallerySlider.firstElementChild.clientWidth + 30;
                    gallerySlider.scrollBy({ left: scrollDistance, behavior: 'smooth' }); 
                }
            }
        }, 1500);
    }
});

// Chocolate Drip Animation Logic
function spawnChocolateDrop() {
    const drop = document.createElement('div');
    drop.className = 'chocolate-drop';
    
    // Position on either left or right side (outside main content area)
    const side = Math.random() > 0.5 ? 'left' : 'right';
    let leftPos;
    
    if (side === 'left') {
        leftPos = -5 + Math.random() * 5; // -5 to 0% (shifted to edge)
    } else {
        leftPos = 90 + Math.random() * 5; // 90-95% (shifted to edge)
    }
    
    drop.style.left = leftPos + 'vw';
    
    // Randomize speed and size slightly (Sped up by 1-2 points)
    const duration = 3 + Math.random() * 5; // 3-8 seconds
    const size = 0.7 + Math.random() * 0.6; // 0.7-1.3 scale
    
    drop.style.animationDuration = duration + 's';
    drop.style.transform = `scale(${size})`;
    
    document.body.appendChild(drop);
    
    // Remove after animation
    setTimeout(() => {
        drop.remove();
    }, duration * 1000);
}

// Start spawning drops after a short delay
setTimeout(() => {
    setInterval(spawnChocolateDrop, 4000); // Spawn a drop every 4 seconds
}, 3000);
