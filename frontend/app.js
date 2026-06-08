// ===== STATE =====
const state = {
  cart: JSON.parse(localStorage.getItem('askr_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('askr_wishlist') || '[]'),
  user: JSON.parse(localStorage.getItem('askr_user') || 'null')
};

// ===== SAVE STATE =====
const saveState = () => {
  localStorage.setItem('askr_cart', JSON.stringify(state.cart));
  localStorage.setItem('askr_wishlist', JSON.stringify(state.wishlist));
};

// ===== CART =====
const addToCart = (product) => {
  const existing = state.cart.find(i => i.id === product.id && i.size === product.size);
  if (existing) existing.qty += 1;
  else state.cart.push({ ...product, qty: 1 });
  saveState(); updateBadges();
  showToast('🛒', `${product.name} added to cart!`);
};

const removeFromCart = (id, size) => {
  state.cart = state.cart.filter(i => !(i.id === id && i.size === size));
  saveState(); updateBadges();
};

const updateQty = (id, size, qty) => {
  const item = state.cart.find(i => i.id === id && i.size === size);
  if (item) { item.qty = Math.max(1, qty); saveState(); }
};

const getCartTotal = () => state.cart.reduce((s, i) => s + i.price * i.qty, 0);
const getCartCount = () => state.cart.reduce((s, i) => s + i.qty, 0);

// ===== WISHLIST =====
const toggleWishlist = (product) => {
  const idx = state.wishlist.findIndex(i => i.id === product.id);
  if (idx > -1) { state.wishlist.splice(idx, 1); showToast('💔', 'Removed from wishlist'); }
  else { state.wishlist.push(product); showToast('❤️', `${product.name} added to wishlist!`); }
  saveState(); updateBadges(); return idx === -1;
};

const isWishlisted = (id) => state.wishlist.some(i => i.id === id);

// ===== BADGES =====
const updateBadges = () => {
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = getCartCount(); b.style.display = getCartCount() > 0 ? 'flex' : 'none';
  });
  document.querySelectorAll('.wishlist-badge').forEach(b => {
    b.textContent = state.wishlist.length; b.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
  });
};

// ===== TOAST =====
const showToast = (icon, msg, duration = 3000) => {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast'; toast.className = 'toast';
    toast.innerHTML = '<span class="toast-icon"></span><span class="toast-msg"></span>';
    document.body.appendChild(toast);
  }
  toast.querySelector('.toast-icon').textContent = icon;
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
};

// ===== NAVBAR SCROLL =====
const initNavbar = () => {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));
};

// ===== HAMBURGER =====
const initHamburger = () => {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    const spans = btn.querySelectorAll('span');
    if (menu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
};

// ===== INTERSECTION OBSERVER ANIMATIONS =====
const initAnimations = () => {
  const els = document.querySelectorAll('[data-animate]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('fade-in-up'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => { el.style.opacity = '0'; obs.observe(el); });
};

// ===== WISHLIST BUTTON INIT =====
const initWishlistBtns = () => {
  document.querySelectorAll('.product-wishlist-btn').forEach(btn => {
    const id = btn.dataset.id;
    if (isWishlisted(id)) btn.classList.add('active');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = { id, name: btn.dataset.name, price: +btn.dataset.price, image: btn.dataset.image };
      const added = toggleWishlist(product);
      btn.classList.toggle('active', added);
    });
  });
};

// ===== RATING STARS =====
const renderStars = (rating) => {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    s += `<i class="${i <= Math.floor(rating) ? 'fas' : i - 0.5 <= rating ? 'fas fa-star-half-alt' : 'far'} fa-star"></i>`;
  }
  return s;
};

// ===== COUPON CODES =====
const COUPONS = { 'ASKR10': 10, 'ASKR20': 20, 'WELCOME15': 15, 'FASHION25': 25 };

const applyCoupon = (code) => {
  const discount = COUPONS[code.toUpperCase()];
  if (discount) { showToast('🎉', `Coupon applied! ${discount}% off`); return discount; }
  showToast('❌', 'Invalid coupon code'); return 0;
};

// ===== SEARCH =====
const initSearch = () => {
  const searchInput = document.querySelector('.nav-search-input');
  if (!searchInput) return;
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      window.location.href = `men.html?search=${encodeURIComponent(searchInput.value.trim())}`;
    }
  });
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar(); initHamburger(); initAnimations();
  initWishlistBtns(); initSearch(); updateBadges();
});

// ===== SAMPLE PRODUCTS DATA =====
const PRODUCTS = [
  { id: 'p1', name: 'Premium Oversized Tee', price: 899, originalPrice: 1499, category: 'men', subcategory: 'tshirts', badge: 'bestseller', rating: 4.5, reviews: 128, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', colors: ['#0D0D0D','#fff','#FF6B00'], sizes: ['XS','S','M','L','XL','XXL'] },
  { id: 'p2', name: 'Urban Street Hoodie', price: 1799, originalPrice: 2999, category: 'men', subcategory: 'hoodies', badge: 'new', rating: 4.8, reviews: 86, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80', colors: ['#0D0D0D','#333','#1a1a2e'], sizes: ['S','M','L','XL','XXL'] },
  { id: 'p3', name: 'Slim Fit Denim Jeans', price: 1299, originalPrice: 2199, category: 'men', subcategory: 'jeans', badge: 'sale', rating: 4.3, reviews: 204, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', colors: ['#1a3a5c','#0D0D0D','#555'], sizes: ['28','30','32','34','36'] },
  { id: 'p4', name: 'Oxford Formal Shirt', price: 1099, originalPrice: 1799, category: 'men', subcategory: 'shirts', badge: '', rating: 4.6, reviews: 165, image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&q=80', colors: ['#fff','#a8c8e8','#f0e6d3'], sizes: ['S','M','L','XL'] },
  { id: 'p5', name: 'Bomber Jacket', price: 3499, originalPrice: 5999, category: 'men', subcategory: 'jackets', badge: 'new', rating: 4.9, reviews: 73, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80', colors: ['#0D0D0D','#2d4a22','#8B4513'], sizes: ['S','M','L','XL','XXL'] },
  { id: 'p6', name: 'Floral Chiffon Dress', price: 1499, originalPrice: 2499, category: 'women', subcategory: 'dresses', badge: 'new', rating: 4.7, reviews: 142, image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=400&q=80', colors: ['#f8c8d4','#d4a8c8','#fff'], sizes: ['XS','S','M','L','XL'] },
  { id: 'p7', name: 'Silk Kurti Set', price: 1199, originalPrice: 1999, category: 'women', subcategory: 'kurtis', badge: 'bestseller', rating: 4.5, reviews: 318, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80', colors: ['#c8a8d4','#f0d080','#e8a090'], sizes: ['XS','S','M','L','XL','XXL'] },
  { id: 'p8', name: 'Designer Saree', price: 2999, originalPrice: 4999, category: 'women', subcategory: 'sarees', badge: 'premium', rating: 4.8, reviews: 89, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80', colors: ['#d40000','#0000d4','#00a000'], sizes: ['Free Size'] },
  { id: 'p9', name: 'Kids Denim Jacket', price: 799, originalPrice: 1299, category: 'kids', subcategory: 'boys', badge: 'new', rating: 4.4, reviews: 56, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80', colors: ['#87CEEB','#0D0D0D','#e88'], sizes: ['2Y','4Y','6Y','8Y','10Y'] },
  { id: 'p10', name: 'Girls Party Frock', price: 699, originalPrice: 1199, category: 'kids', subcategory: 'girls', badge: '', rating: 4.6, reviews: 94, image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80', colors: ['#ffb6c1','#c8a8ff','#fff'], sizes: ['2Y','4Y','6Y','8Y'] },
  { id: 'p11', name: 'Graphic Print Tee', price: 749, originalPrice: 1299, category: 'men', subcategory: 'tshirts', badge: 'sale', rating: 4.2, reviews: 211, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80', colors: ['#0D0D0D','#fff','#FF6B00'], sizes: ['XS','S','M','L','XL','XXL'] },
  { id: 'p12', name: 'Women Crop Top', price: 549, originalPrice: 999, category: 'women', subcategory: 'tops', badge: 'sale', rating: 4.3, reviews: 267, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4d8f?w=400&q=80', colors: ['#fff','#f0c8d0','#0D0D0D'], sizes: ['XS','S','M','L'] },
];
