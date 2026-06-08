// ===== SHARED NAVBAR HTML =====
const NAVBAR_HTML = `
<nav class="navbar">
  <a href="home.html" class="nav-logo">
    <img src="askr-logo.png" alt="ASKR" onerror="this.style.display='none'">
    <span class="nav-logo-text">ASK<span>R</span></span>
  </a>
  <ul class="nav-links">
    <li><a href="home.html">Home</a></li>
    <li><a href="men.html">Men</a></li>
    <li><a href="women.html">Women</a></li>
    <li><a href="kids.html">Kids</a></li>
    <li><a href="features.html">Features</a></li>
    <li><a href="about.html">About</a></li>
  </ul>
  <div class="nav-actions">
    <button class="nav-icon" onclick="toggleNavSearch()" title="Search"><i class="fas fa-search"></i></button>
    <a href="wishlist.html" class="nav-icon" style="position:relative" title="Wishlist">
      <i class="far fa-heart"></i>
      <span class="badge wishlist-badge" style="display:none">0</span>
    </a>
    <a href="cart.html" class="nav-icon" style="position:relative" title="Cart">
      <i class="fas fa-shopping-bag"></i>
      <span class="badge cart-badge" style="display:none">0</span>
    </a>
    <a href="profile.html" class="nav-icon" title="Profile"><i class="far fa-user"></i></a>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="nav-search-bar" id="navSearchBar" style="display:none; position:fixed; top:70px; left:0; right:0; z-index:998; background:rgba(13,13,13,0.98); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,107,0,0.2); padding:16px 5%;">
  <div style="max-width:600px; margin:0 auto; position:relative;">
    <i class="fas fa-search" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-muted);"></i>
    <input type="text" class="nav-search-input form-control" placeholder="Search products, categories..." style="padding-left:42px; border-radius:50px;" autofocus>
  </div>
</div>
<div class="mobile-menu">
  <ul>
    <li><a href="home.html"><i class="fas fa-home" style="margin-right:8px;color:var(--accent)"></i>Home</a></li>
    <li><a href="men.html"><i class="fas fa-male" style="margin-right:8px;color:var(--accent)"></i>Men</a></li>
    <li><a href="women.html"><i class="fas fa-female" style="margin-right:8px;color:var(--accent)"></i>Women</a></li>
    <li><a href="kids.html"><i class="fas fa-child" style="margin-right:8px;color:var(--accent)"></i>Kids</a></li>
    <li><a href="features.html"><i class="fas fa-star" style="margin-right:8px;color:var(--accent)"></i>Features</a></li>
    <li><a href="about.html"><i class="fas fa-info-circle" style="margin-right:8px;color:var(--accent)"></i>About</a></li>
    <li><a href="contact.html"><i class="fas fa-envelope" style="margin-right:8px;color:var(--accent)"></i>Contact</a></li>
    <li><a href="profile.html"><i class="far fa-user" style="margin-right:8px;color:var(--accent)"></i>My Account</a></li>
  </ul>
</div>`;

// ===== SHARED FOOTER HTML =====
const FOOTER_HTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="home.html" class="nav-logo" style="text-decoration:none">
        <img src="askr-logo.png" alt="ASKR" style="height:40px" onerror="this.style.display='none'">
        <span class="nav-logo-text" style="font-size:1.3rem">ASK<span style="color:var(--accent)">R</span></span>
      </a>
      <p>Elevating everyday style with premium fashion that speaks confidence. Where luxury meets streetwear.</p>
      <div class="footer-social">
        <a href="#" class="social-btn"><i class="fab fa-instagram"></i></a>
        <a href="#" class="social-btn"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="social-btn"><i class="fab fa-twitter"></i></a>
        <a href="#" class="social-btn"><i class="fab fa-youtube"></i></a>
        <a href="#" class="social-btn"><i class="fab fa-pinterest-p"></i></a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Shop</h4>
      <ul>
        <li><a href="men.html">Men's Collection</a></li>
        <li><a href="women.html">Women's Collection</a></li>
        <li><a href="kids.html">Kids' Collection</a></li>
        <li><a href="men.html?cat=new">New Arrivals</a></li>
        <li><a href="men.html?cat=sale">Sale</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Help</h4>
      <ul>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="tracking.html">Track Order</a></li>
        <li><a href="contact.html">Contact Us</a></li>
        <li><a href="features.html">Why ASKR?</a></li>
        <li><a href="about.html">About Us</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      <ul>
        <li><a href="privacy.html">Privacy Policy</a></li>
        <li><a href="terms.html">Terms & Conditions</a></li>
        <li><a href="#">Return Policy</a></li>
        <li><a href="#">Cookie Policy</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2025 <span>ASKR Clothing</span>. All rights reserved. Made with ❤️ for fashion.</p>
    <div class="footer-payment-icons">
      <span class="payment-icon">UPI</span>
      <span class="payment-icon">VISA</span>
      <span class="payment-icon">MC</span>
      <span class="payment-icon">AMEX</span>
      <span class="payment-icon">COD</span>
    </div>
  </div>
</footer>`;

// ===== INJECT COMPONENTS =====
document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('navbar-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  if (navEl) navEl.innerHTML = NAVBAR_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;
});

// ===== NAV SEARCH TOGGLE =====
function toggleNavSearch() {
  const bar = document.getElementById('navSearchBar');
  if (!bar) return;
  const visible = bar.style.display !== 'none';
  bar.style.display = visible ? 'none' : 'block';
  if (!visible) bar.querySelector('input').focus();
}

// ===== PRODUCT CARD BUILDER =====
const buildProductCard = (p, accentColor = 'var(--accent)') => `
<div class="product-card" onclick="window.location='product.html?id=${p.id}'">
  <div class="product-image">
    <img src="${p.image}" alt="${p.name}" loading="lazy">
    ${p.badge ? `<span class="product-badge ${p.badge === 'new' ? 'new' : p.badge === 'sale' ? 'sale' : ''}">${p.badge.toUpperCase()}</span>` : ''}
    <button class="product-wishlist-btn" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}" onclick="event.stopPropagation()">
      <i class="${isWishlisted(p.id) ? 'fas' : 'far'} fa-heart"></i>
    </button>
    <div class="product-actions-overlay">
      <button class="btn btn-primary btn-sm" style="flex:1" onclick="event.stopPropagation(); addToCart({id:'${p.id}',name:'${p.name}',price:${p.price},image:'${p.image}',size:'M'})">
        <i class="fas fa-shopping-bag"></i> Add to Cart
      </button>
      <a href="product.html?id=${p.id}" class="btn btn-outline btn-sm" onclick="event.stopPropagation()"><i class="fas fa-eye"></i></a>
    </div>
  </div>
  <div class="product-info">
    <div class="product-brand">ASKR</div>
    <div class="product-name">${p.name}</div>
    <div class="product-rating">
      <span class="stars">${renderStars(p.rating)}</span>
      <span>(${p.reviews})</span>
    </div>
    <div class="product-price">
      <span class="price-current" style="color:${accentColor}">₹${p.price.toLocaleString()}</span>
      ${p.originalPrice ? `<span class="price-original">₹${p.originalPrice.toLocaleString()}</span>` : ''}
      ${p.originalPrice ? `<span class="price-discount">${Math.round((1 - p.price / p.originalPrice) * 100)}% off</span>` : ''}
    </div>
  </div>
</div>`;
