// ===== ADMIN AUTH GUARD =====
const adminAuth = () => {
  const admin = JSON.parse(localStorage.getItem('askr_admin') || 'null');
  const publicPages = ['admin-login.html'];
  const currentPage = location.pathname.split('/').pop();
  if (!admin && !publicPages.includes(currentPage)) {
    window.location.href = 'admin-login.html';
  }
  return admin;
};

// ===== SIDEBAR =====
const initSidebar = () => {
  const sidebar  = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const toggleBtn   = document.getElementById('sidebarToggle');
  const mobileToggle = document.getElementById('mobileToggle');
  if (!sidebar) return;

  const collapsed = localStorage.getItem('admin_sidebar_collapsed') === 'true';
  if (collapsed) { sidebar.classList.add('collapsed'); mainContent?.classList.add('expanded'); }

  toggleBtn?.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent?.classList.toggle('expanded');
    localStorage.setItem('admin_sidebar_collapsed', sidebar.classList.contains('collapsed'));
  });

  mobileToggle?.addEventListener('click', () => sidebar.classList.toggle('mobile-open'));

  // Active nav item
  const currentPage = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('href') === currentPage) item.classList.add('active');
  });
};

// ===== TOAST =====
const showToast = (icon, msg, type = 'default') => {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToast';
    toast.className = 'toast';
    toast.innerHTML = '<span id="toastIcon"></span><span id="toastMsg"></span>';
    document.body.appendChild(toast);
  }
  const colors = { success:'#2ecc71', error:'#e74c3c', warning:'#f1c40f', default:'var(--accent)' };
  toast.style.borderColor = colors[type] || colors.default;
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastMsg').textContent = msg;
  document.getElementById('toastMsg').style.fontSize = '0.85rem';
  document.getElementById('toastMsg').style.color = 'var(--text)';
  document.getElementById('toastMsg').style.fontWeight = '500';
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 3500);
};

// ===== MODAL =====
const openModal  = (id) => document.getElementById(id)?.classList.add('open');
const closeModal = (id) => document.getElementById(id)?.classList.remove('open');
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

// ===== CONFIRM DELETE =====
const confirmDelete = (msg, cb) => {
  if (confirm(msg || 'Are you sure you want to delete this?')) cb();
};

// ===== SAMPLE DATA =====
const ADMIN_STATS = {
  revenue: '₹4,82,350', orders: 1284, products: 312, customers: 8920,
  revenueChange: '+18.4%', ordersChange: '+12.1%', productsChange: '+5.3%', customersChange: '+24.6%'
};

const SAMPLE_ORDERS = [
  { id:'ASKR78901234', customer:'Arjun Sharma', email:'arjun@email.com', items:3, amount:'₹3,497', status:'delivered',   date:'Mar 22, 2025', payment:'UPI' },
  { id:'ASKR78901235', customer:'Priya Nair',   email:'priya@email.com', items:1, amount:'₹1,799', status:'shipped',     date:'Mar 23, 2025', payment:'Credit Card' },
  { id:'ASKR78901236', customer:'Rahul Verma',  email:'rahul@email.com', items:2, amount:'₹2,198', status:'processing',  date:'Mar 23, 2025', payment:'COD' },
  { id:'ASKR78901237', customer:'Sneha Reddy',  email:'sneha@email.com', items:4, amount:'₹5,996', status:'delivered',   date:'Mar 21, 2025', payment:'Debit Card' },
  { id:'ASKR78901238', customer:'Vikram Patel', email:'vikram@email.com',items:1, amount:'₹899',   status:'cancelled',   date:'Mar 20, 2025', payment:'UPI' },
  { id:'ASKR78901239', customer:'Ananya Singh', email:'ananya@email.com',items:2, amount:'₹2,598', status:'out_for_delivery', date:'Mar 24, 2025', payment:'Net Banking' },
  { id:'ASKR78901240', customer:'Karan Mehta',  email:'karan@email.com', items:1, amount:'₹1,299', status:'packed',      date:'Mar 24, 2025', payment:'UPI' },
];

const SAMPLE_PRODUCTS = [
  { id:'p1', name:'Premium Oversized Tee',  category:'Men',   subcategory:'T-Shirts', price:899,  stock:145, status:'active',   sales:128, image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&q=60' },
  { id:'p2', name:'Urban Street Hoodie',    category:'Men',   subcategory:'Hoodies',  price:1799, stock:67,  status:'active',   sales:86,  image:'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=80&q=60' },
  { id:'p3', name:'Slim Fit Denim Jeans',   category:'Men',   subcategory:'Jeans',    price:1299, stock:0,   status:'out_of_stock', sales:204, image:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=80&q=60' },
  { id:'p4', name:'Oxford Formal Shirt',    category:'Men',   subcategory:'Shirts',   price:1099, stock:88,  status:'active',   sales:165, image:'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=80&q=60' },
  { id:'p5', name:'Bomber Jacket',          category:'Men',   subcategory:'Jackets',  price:3499, stock:23,  status:'active',   sales:73,  image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&q=60' },
  { id:'p6', name:'Floral Chiffon Dress',   category:'Women', subcategory:'Dresses',  price:1499, stock:56,  status:'active',   sales:142, image:'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=80&q=60' },
  { id:'p7', name:'Silk Kurti Set',         category:'Women', subcategory:'Kurtis',   price:1199, stock:134, status:'active',   sales:318, image:'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=80&q=60' },
  { id:'p8', name:'Designer Saree',         category:'Women', subcategory:'Sarees',   price:2999, stock:12,  status:'active',   sales:89,  image:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=80&q=60' },
];

const SAMPLE_CUSTOMERS = [
  { id:'c1', name:'Arjun Sharma',  email:'arjun@email.com',  mobile:'+91 98765 43210', orders:12, spent:'₹18,450', joined:'Jan 2024', status:'active' },
  { id:'c2', name:'Priya Nair',    email:'priya@email.com',  mobile:'+91 87654 32109', orders:8,  spent:'₹12,300', joined:'Feb 2024', status:'active' },
  { id:'c3', name:'Rahul Verma',   email:'rahul@email.com',  mobile:'+91 76543 21098', orders:3,  spent:'₹4,200',  joined:'Mar 2024', status:'active' },
  { id:'c4', name:'Sneha Reddy',   email:'sneha@email.com',  mobile:'+91 65432 10987', orders:21, spent:'₹38,750', joined:'Dec 2023', status:'active' },
  { id:'c5', name:'Vikram Patel',  email:'vikram@email.com', mobile:'+91 54321 09876', orders:1,  spent:'₹899',    joined:'Mar 2025', status:'blocked' },
];

// ===== STATUS BADGE =====
const statusBadge = (status) => {
  const map = {
    delivered:        ['badge-success','Delivered'],
    shipped:          ['badge-info','Shipped'],
    processing:       ['badge-orange','Processing'],
    packed:           ['badge-gold','Packed'],
    out_for_delivery: ['badge-warning','Out for Delivery'],
    cancelled:        ['badge-danger','Cancelled'],
    ordered:          ['badge-muted','Ordered'],
    active:           ['badge-success','Active'],
    out_of_stock:     ['badge-danger','Out of Stock'],
    draft:            ['badge-muted','Draft'],
    blocked:          ['badge-danger','Blocked'],
    paid:             ['badge-success','Paid'],
    pending:          ['badge-warning','Pending'],
    failed:           ['badge-danger','Failed'],
  };
  const [cls, label] = map[status] || ['badge-muted', status];
  return `<span class="badge ${cls}">${label}</span>`;
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  adminAuth();
  initSidebar();
  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.action-menu')) {
      document.querySelectorAll('.action-dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });
});
