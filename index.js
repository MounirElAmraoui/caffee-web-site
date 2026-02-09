// Configuration
const CONFIG = {
    password: "luxe2024",
    currency: "DH",
    taxRate: 0.10,
    itemsPerPage: 6
};

// Données enrichies
let products = JSON.parse(localStorage.getItem('lux-products-v2')) || [
    {
        id: 1,
        name: "Espresso Noir Intense",
        price: 12,
        category: "hot",
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400",
        description: "Un espresso corsé aux notes de chocolat noir et de noisette torréfiée. Parfait pour commencer la journée.",
        calories: 120,
        time: "2 min",
        diet: "Végétarien",
        allergens: ["Aucun"],
        stock: 50,
        badge: "popular",
        rating: 4.8,
        reviews: 128
    },
    {
        id: 2,
        name: "Cappuccino Doré",
        price: 18,
        category: "hot",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
        description: "Double espresso onctueux avec mousse de lait veloutée et touche de cannelle.",
        calories: 180,
        time: "4 min",
        diet: "Végétarien",
        allergens: ["Lactose"],
        stock: 45,
        badge: "popular",
        rating: 4.9,
        reviews: 245
    },
    {
        id: 3,
        name: "Latte Art Signature",
        price: 22,
        category: "hot",
        image: "https://images.unsplash.com/photo-1461023058943-48dbf1699b41?w=400",
        description: "Notre spécialité maison avec dessin artistique sur mousse. Un régal pour les yeux et les papilles.",
        calories: 200,
        time: "5 min",
        diet: "Végétarien",
        allergens: ["Lactose"],
        stock: 30,
        badge: "new",
        rating: 4.7,
        reviews: 89
    },
    {
        id: 4,
        name: "Mocha Deluxe",
        price: 25,
        category: "hot",
        image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400",
        description: "Chocolat noir belge, espresso et lait crémeux. Gourmandise intemporelle.",
        calories: 280,
        time: "5 min",
        diet: "Végétarien",
        allergens: ["Lactose", "Cacao"],
        stock: 25,
        badge: null,
        rating: 4.6,
        reviews: 167
    },
    {
        id: 5,
        name: "Cold Brew Nitro",
        price: 28,
        category: "cold",
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400",
        description: "Infusion à froid pendant 24h, servie avec azote pour une texture crémeuse unique.",
        calories: 15,
        time: "1 min",
        diet: "Végétalien",
        allergens: ["Aucun"],
        stock: 20,
        badge: "new",
        rating: 4.9,
        reviews: 76
    },
    {
        id: 6,
        name: "Frappé Caramel",
        price: 32,
        category: "cold",
        image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400",
        description: "Mélange glacé d'espresso, lait et caramel beurre salé maison.",
        calories: 350,
        time: "3 min",
        diet: "Végétarien",
        allergens: ["Lactose"],
        stock: 15,
        badge: null,
        rating: 4.5,
        reviews: 134
    },
    {
        id: 7,
        name: "Tiramisu Maison",
        price: 35,
        category: "food",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
        description: "Recette italienne authentique avec mascarpone importé et café espresso.",
        calories: 420,
        time: "0 min",
        diet: "Végétarien",
        allergens: ["Lactose", "Œufs", "Gluten"],
        stock: 12,
        badge: "popular",
        rating: 4.8,
        reviews: 203
    },
    {
        id: 8,
        name: "Croissant Beurre AOP",
        price: 18,
        category: "food",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
        description: "Pâte feuilletée croustillante au beurre d'Isigny AOP. Cuit sur place.",
        calories: 280,
        time: "0 min",
        diet: "Végétarien",
        allergens: ["Gluten", "Lactose", "Œufs"],
        stock: 24,
        badge: null,
        rating: 4.7,
        reviews: 312
    },
    {
        id: 9,
        name: "Golden Latte (Curcuma)",
        price: 26,
        category: "special",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400",
        description: "Lait d'amande, curcuma bio, gingembre et miel. Boisson anti-inflammatoire.",
        calories: 140,
        time: "4 min",
        diet: "Végétalien",
        allergens: ["Fruits à coque"],
        stock: 18,
        badge: "new",
        rating: 4.6,
        reviews: 54
    }
];

let cart = JSON.parse(localStorage.getItem('lux-cart')) || [];
let favorites = JSON.parse(localStorage.getItem('lux-favorites')) || [];
let sales = JSON.parse(localStorage.getItem('lux-sales-v2')) || [];
let reservations = JSON.parse(localStorage.getItem('lux-reservations')) || [];
let currentProduct = null;
let currentQty = 1;
let currentPage = 1;
let currentFilter = 'all';

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
    
    renderMenu();
    updateCartUI();
    updateFavoritesUI();
    initSlider();
    checkLowStock();
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Slider Hero
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    let current = 0;
    
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000);
}

// Rendu du menu avec pagination
function renderMenu() {
    const container = document.getElementById('menu-container');
    const search = document.getElementById('search-input')?.value.toLowerCase() || '';
    
    let filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search) || 
                           p.description.toLowerCase().includes(search);
        const matchCategory = currentFilter === 'all' || p.category === currentFilter;
        return matchSearch && matchCategory;
    });
    
    // Tri
    const sort = document.getElementById('sort-select')?.value || 'default';
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'popular') filtered.sort((a, b) => b.rating - a.rating);
    
    // Pagination
    const totalPages = Math.ceil(filtered.length / CONFIG.itemsPerPage);
    const start = (currentPage - 1) * CONFIG.itemsPerPage;
    const paginated = filtered.slice(start, start + CONFIG.itemsPerPage);
    
    document.getElementById('page-info').textContent = `Page ${currentPage} sur ${totalPages || 1}`;
    
    container.innerHTML = paginated.map(p => `
        <div class="glass-card-product" onclick="openProduct(${p.id})">
            ${p.badge ? `<span class="product-badge ${p.badge}">${p.badge === 'new' ? 'Nouveau' : 'Populaire'}</span>` : ''}
            <div class="product-img-wrapper">
                <img src="${p.image}" alt="${p.name}">
                <div class="product-actions">
                    <button class="fav-toggle ${favorites.includes(p.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${p.id})">
                        <i class="${favorites.includes(p.id) ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="quick-add" onclick="event.stopPropagation(); quickAddToCart(${p.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="product-info-glass">
                <div class="product-meta">
                    <span class="category-tag">${getCategoryName(p.category)}</span>
                    <span class="rating-mini"><i class="fas fa-star"></i> ${p.rating}</span>
                </div>
                <h3>${p.name}</h3>
                <p class="product-desc-mini">${p.description}</p>
                <div class="price-row">
                    <span class="price-tag-gold">${p.price} ${CONFIG.currency}</span>
                    <span class="stock-status ${p.stock < 10 ? 'low' : ''}">
                        ${p.stock < 10 ? 'Stock faible' : 'En stock'}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(cat) {
    const names = { hot: 'Chaud', cold: 'Froid', food: 'Pâtisserie', special: 'Spécial' };
    return names[cat] || cat;
}

function filterCategory(cat) {
    currentFilter = cat;
    currentPage = 1;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(cat === 'all' ? 'tout' : '') || 
            (cat !== 'all' && btn.onclick.toString().includes(cat))) {
            btn.classList.add('active');
        }
    });
    
    renderMenu();
}

function filterProducts() {
    currentPage = 1;
    renderMenu();
}

function sortProducts() {
    renderMenu();
}

function changePage(delta) {
    currentPage += delta;
    if (currentPage < 1) currentPage = 1;
    renderMenu();
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

// Gestion du Panier
function quickAddToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    saveCart();
    updateCartUI();
    showToast(`${product.name} ajouté au panier`, 'success');
}

function addToCartFromModal() {
    if (!currentProduct) return;
    
    const existing = cart.find(item => item.id === currentProduct.id);
    if (existing) {
        existing.qty += currentQty;
    } else {
        cart.push({ ...currentProduct, qty: currentQty });
    }
    
    saveCart();
    updateCartUI();
    closeProduct();
    showToast(`${currentQty}x ${currentProduct.name} ajouté au panier`, 'success');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

function updateCartQty(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) removeFromCart(id);
        else {
            saveCart();
            updateCartUI();
        }
    }
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
    toggleCart();
}

function saveCart() {
    localStorage.setItem('lux-cart', JSON.stringify(cart));
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count').textContent = count;
    
    const container = document.getElementById('cart-items');
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Votre panier est vide</p>
            </div>
        `;
        document.querySelector('.cart-footer').style.display = 'none';
    } else {
        document.querySelector('.cart-footer').style.display = 'block';
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="price">${item.price} ${CONFIG.currency}</div>
                    <div class="cart-item-actions">
                        <button class="qty-btn-small" onclick="updateCartQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn-small" onclick="updateCartQty(${item.id}, 1)">+</button>
                        <span class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Calculs
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const tax = subtotal * CONFIG.taxRate;
        const total = subtotal + tax;
        
        document.getElementById('cart-subtotal').textContent = `${subtotal.toFixed(2)} ${CONFIG.currency}`;
        document.getElementById('cart-tax').textContent = `${tax.toFixed(2)} ${CONFIG.currency}`;
        document.getElementById('cart-total').textContent = `${total.toFixed(2)} ${CONFIG.currency}`;
    }
}

function toggleCart() {
    document.getElementById('cart-modal').classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const order = {
        id: Date.now(),
        items: [...cart],
        total: total,
        date: new Date().toISOString(),
        status: 'completed'
    };
    
    sales.unshift(order);
    localStorage.setItem('lux-sales-v2', JSON.stringify(sales));
    
    // Mise à jour du stock
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) product.stock -= item.qty;
    });
    localStorage.setItem('lux-products-v2', JSON.stringify(products));
    
    cart = [];
    saveCart();
    updateCartUI();
    toggleCart();
    showToast(`Commande validée ! Total: ${total} ${CONFIG.currency}`, 'success');
    renderMenu();
    checkLowStock();
}

// Favoris
function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Retiré des favoris', 'info');
    } else {
        favorites.push(id);
        showToast('Ajouté aux favoris', 'success');
    }
    localStorage.setItem('lux-favorites', JSON.stringify(favorites));
    updateFavoritesUI();
    renderMenu();
}

function toggleCurrentFavorite() {
    if (!currentProduct) return;
    toggleFavorite(currentProduct.id);
    updateModalFavoriteState();
}

function updateModalFavoriteState() {
    const btn = document.getElementById('modal-fav-btn');
    const isFav = favorites.includes(currentProduct.id);
    btn.classList.toggle('active', isFav);
    btn.innerHTML = `<i class="${isFav ? 'fas' : 'far'} fa-heart"></i>`;
}

function updateFavoritesUI() {
    document.getElementById('fav-count').textContent = favorites.length;
    
    const list = document.getElementById('favorites-list');
    if (favorites.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Aucun favori</p>';
        return;
    }
    
    const favProducts = products.filter(p => favorites.includes(p.id));
    list.innerHTML = favProducts.map(p => `
        <div class="fav-item">
            <img src="${p.image}" alt="${p.name}">
            <div class="fav-item-info">
                <h4>${p.name}</h4>
                <span class="price">${p.price} ${CONFIG.currency}</span>
            </div>
            <button class="btn-gold" onclick="quickAddToCart(${p.id})">
                <i class="fas fa-cart-plus"></i>
            </button>
        </div>
    `).join('');
}

function toggleFavorites() {
    updateFavoritesUI();
    document.getElementById('favorites-modal').classList.toggle('active');
}

// Détail Produit
function openProduct(id) {
    currentProduct = products.find(p => p.id === id);
    currentQty = 1;
    
    document.getElementById('modal-img').src = currentProduct.image;
    document.getElementById('modal-name').textContent = currentProduct.name;
    document.getElementById('modal-desc').textContent = currentProduct.description;
    document.getElementById('modal-price').textContent = currentProduct.price;
    document.getElementById('modal-category').textContent = getCategoryName(currentProduct.category);
    document.getElementById('modal-cals').textContent = `${currentProduct.calories} kcal`;
    document.getElementById('modal-time').textContent = `${currentProduct.time}`;
    document.getElementById('modal-diet').textContent = currentProduct.diet;
    document.getElementById('modal-rating').textContent = currentProduct.rating;
    
    // Badges
    const badgesContainer = document.getElementById('modal-badges');
    badgesContainer.innerHTML = '';
    if (currentProduct.badge === 'new') {
        badgesContainer.innerHTML += '<span style="background: var(--info);">Nouveau</span>';
    }
    if (currentProduct.badge === 'popular') {
        badgesContainer.innerHTML += '<span style="background: var(--gold); color: black;">Populaire</span>';
    }
    if (currentProduct.stock < 10) {
        badgesContainer.innerHTML += '<span style="background: var(--danger);">Stock faible</span>';
    }
    
    // Allergènes
    document.getElementById('modal-allergens').innerHTML = 
        `<small><i class="fas fa-exclamation-triangle"></i> Contient: ${currentProduct.allergens.join(', ')}</small>`;
    
    updateQty(0);
    updateModalFavoriteState();
    
    document.getElementById('product-modal').classList.add('active');
}

function closeProduct() {
    document.getElementById('product-modal').classList.remove('active');
}

function updateQty(delta) {
    currentQty += delta;
    if (currentQty < 1) currentQty = 1;
    if (currentQty > currentProduct.stock) currentQty = currentProduct.stock;
    
    document.getElementById('modal-qty').textContent = currentQty;
    document.getElementById('modal-total').textContent = 
        `${(currentProduct.price * currentQty).toFixed(2)} ${CONFIG.currency}`;
}

// Réservation
function makeReservation() {
    const name = document.getElementById('res-name').value;
    const phone = document.getElementById('res-phone').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    const zone = document.getElementById('res-zone').value;
    const notes = document.getElementById('res-notes').value;
    
    if (!name || !phone || !date || !time) {
        showToast('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    const reservation = {
        id: Date.now(),
        name,
        phone,
        date,
        time,
        guests,
        zone,
        notes,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    reservations.push(reservation);
    localStorage.setItem('lux-reservations', JSON.stringify(reservations));
    
    // Reset form
    document.getElementById('res-name').value = '';
    document.getElementById('res-phone').value = '';
    document.getElementById('res-date').value = '';
    document.getElementById('res-time').value = '';
    document.getElementById('res-notes').value = '';
    
    showToast('Réservation confirmée ! Nous vous contacterons bientôt.', 'success');
}

// Admin Dashboard
function toggleAdmin() {
    document.getElementById('login-overlay').classList.toggle('active');
    document.getElementById('admin-pass').value = '';
    document.getElementById('admin-pass').focus();
}

function checkAuth() {
    if (document.getElementById('admin-pass').value === CONFIG.password) {
        toggleAdmin();
        openAdminDashboard();
    } else {
        const err = document.getElementById('login-error');
        err.style.display = 'block';
        setTimeout(() => err.style.display = 'none', 2000);
    }
}

function handleEnter(e) {
    if (e.key === 'Enter') checkAuth();
}

function openAdminDashboard() {
    document.getElementById('admin-dashboard').classList.add('active');
    updateDashboardStats();
    renderProductsTable();
    renderReservations();
    initCharts();
}

function closeAdminDashboard() {
    document.getElementById('admin-dashboard').classList.remove('active');
}

function switchAdminTab(tab) {
    document.querySelectorAll('.admin-nav .nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(el => el.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`admin-${tab}`).classList.add('active');
    
    if (tab === 'overview') updateDashboardStats();
    if (tab === 'products') renderProductsTable();
    if (tab === 'reservations') renderReservations();
    if (tab === 'analytics') initCharts();
}

function updateDashboardStats() {
    // Revenue total
    const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
    document.getElementById('dash-revenue').textContent = `${totalRevenue.toFixed(0)} ${CONFIG.currency}`;
    
    // Commandes aujourd'hui
    const today = new Date().toDateString();
    const todayOrders = sales.filter(s => new Date(s.date).toDateString() === today).length;
    document.getElementById('dash-orders').textContent = todayOrders;
    
    // Stock faible
    const lowStock = products.filter(p => p.stock < 10).length;
    document.getElementById('dash-lowstock').textContent = lowStock;
    
    // Ventes récentes
    const recentList = document.getElementById('recent-sales-list');
    recentList.innerHTML = sales.slice(0, 5).map(s => `
        <div class="recent-item">
            <span>Commande #${s.id.toString().slice(-4)}</span>
            <span style="color: var(--gold);">${s.total} ${CONFIG.currency}</span>
        </div>
    `).join('');
    
    // Produits populaires
    const popularList = document.getElementById('popular-products-list');
    const sorted = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);
    popularList.innerHTML = sorted.map(p => `
        <div class="popular-item">
            <span>${p.name}</span>
            <span><i class="fas fa-star" style="color: var(--gold);"></i> ${p.rating}</span>
        </div>
    `).join('');
}

function renderProductsTable() {
    const tbody = document.getElementById('products-tbody');
    tbody.innerHTML = products.map(p => `
        <tr>
            <td><img src="${p.image}" alt="${p.name}"></td>
            <td><strong>${p.name}</strong><br><small style="color: var(--text-secondary);">${p.description.substring(0, 50)}...</small></td>
            <td>${getCategoryName(p.category)}</td>
            <td>${p.price} ${CONFIG.currency}</td>
            <td><input type="number" class="stock-input" value="${p.stock}" onchange="updateStock(${p.id}, this.value)"></td>
            <td><span class="status-badge ${p.stock > 0 ? 'active' : 'inactive'}">${p.stock > 0 ? 'Actif' : 'Rupture'}</span></td>
            <td>
                <button class="btn-gold" style="padding: 5px 10px; font-size: 0.8rem;" onclick="editProduct(${p.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-gold" style="padding: 5px 10px; font-size: 0.8rem; background: var(--danger);" onclick="deleteProduct(${p.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function updateStock(id, value) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.stock = parseInt(value) || 0;
        localStorage.setItem('lux-products-v2', JSON.stringify(products));
        showToast('Stock mis à jour', 'success');
        renderMenu();
    }
}

function showAddProductForm() {
    const name = prompt('Nom du produit:');
    if (!name) return;
    
    const price = parseFloat(prompt('Prix:'));
    const category = prompt('Catégorie (hot/cold/food/special):') || 'hot';
    const image = prompt('URL de l\'image:') || 'https://via.placeholder.com/400';
    
    products.push({
        id: Date.now(),
        name,
        price,
        category,
        image,
        description: 'Nouveau produit',
        stock: 10,
        badge: 'new',
        rating: 5.0,
        reviews: 0
    });
    
    localStorage.setItem('lux-products-v2', JSON.stringify(products));
    renderProductsTable();
    renderMenu();
    showToast('Produit ajouté', 'success');
}

function deleteProduct(id) {
    if (confirm('Supprimer ce produit ?')) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('lux-products-v2', JSON.stringify(products));
        renderProductsTable();
        renderMenu();
        showToast('Produit supprimé', 'info');
    }
}

function renderReservations() {
    const container = document.getElementById('reservations-list');
    if (reservations.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Aucune réservation</p>';
        return;
    }
    
    container.innerHTML = reservations.map(r => `
        <div class="recent-item" style="margin-bottom: 1rem;">
            <div>
                <strong>${r.name}</strong> - ${r.guests} pers.<br>
                <small>${r.date} à ${r.time} (${r.zone})</small>
            </div>
            <span class="status-badge ${r.status === 'pending' ? 'warning' : 'success'}">
                ${r.status === 'pending' ? 'En attente' : 'Confirmé'}
            </span>
        </div>
    `).join('');
}

function initCharts() {
    // Simulation de graphiques avec canvas simple
    const hourlyCanvas = document.getElementById('hourlyChart');
    if (hourlyCanvas && hourlyCanvas.getContext) {
        const ctx = hourlyCanvas.getContext('2d');
        ctx.clearRect(0, 0, hourlyCanvas.width, hourlyCanvas.height);
        
        // Dessin simple d'un graphique
        ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
        ctx.fillRect(0, 0, hourlyCanvas.width, hourlyCanvas.height);
        
        ctx.fillStyle = '#ffd700';
        for (let i = 0; i < 8; i++) {
            const height = Math.random() * 150 + 50;
            ctx.fillRect(50 + i * 80, 200 - height, 60, height);
        }
        
        ctx.fillStyle = 'white';
        ctx.font = '12px Inter';
        ['8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'].forEach((time, i) => {
            ctx.fillText(time, 60 + i * 80, 220);
        });
    }
}

function checkLowStock() {
    const low = products.filter(p => p.stock < 10);
    if (low.length > 0) {
        console.warn('Produits en stock faible:', low.map(p => p.name));
    }
}

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Scroll functions
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

function scrollToReservation() {
    document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' });
}

// Export
function exportOrders() {
    let csv = 'ID,Date,Total,Status\n';
    sales.forEach(s => {
        csv += `${s.id},${new Date(s.date).toLocaleDateString()},${s.total},${s.status}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ventes.csv';
    a.click();
    showToast('Export téléchargé', 'success');
}

// Fermer modals en cliquant à l'extérieur
window.onclick = function(e) {
    if (e.target.classList.contains('overlay')) {
        e.target.classList.remove('active');
    }
}