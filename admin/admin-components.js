const SIDEBAR_HTML = `
<aside class="sidebar" id="sidebar">
  <div class="sidebar-brand">
    <div class="sidebar-logo">A</div>
    <div class="sidebar-brand-text">
      <h2>ASK<span>R</span> Admin</h2>
      <p>Control Panel</p>
    </div>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section-label">Main</div>
    <a href="dashboard.html" class="nav-item" data-tooltip="Dashboard"><i class="fas fa-th-large"></i><span>Dashboard</span></a>
    <a href="orders.html"    class="nav-item" data-tooltip="Orders"><i class="fas fa-shopping-bag"></i><span>Orders</span><span class="nav-badge" id="sideOrderBadge">12</span></a>
    <a href="products.html"  class="nav-item" data-tooltip="Products"><i class="fas fa-tshirt"></i><span>Products</span></a>
    <a href="customers.html" class="nav-item" data-tooltip="Customers"><i class="fas fa-users"></i><span>Customers</span></a>
    <div class="nav-section-label">Catalogue</div>
    <a href="categories.html" class="nav-item" data-tooltip="Categories"><i class="fas fa-tags"></i><span>Categories</span></a>
    <a href="inventory.html"  class="nav-item" data-tooltip="Inventory"><i class="fas fa-boxes"></i><span>Inventory</span></a>
    <a href="coupons.html"    class="nav-item" data-tooltip="Coupons"><i class="fas fa-ticket-alt"></i><span>Coupons</span></a>
    <div class="nav-section-label">Reports</div>
    <a href="analytics.html" class="nav-item" data-tooltip="Analytics"><i class="fas fa-chart-line"></i><span>Analytics</span></a>
    <a href="reviews.html"   class="nav-item" data-tooltip="Reviews"><i class="fas fa-star"></i><span>Reviews</span></a>
    <div class="nav-section-label">System</div>
    <a href="settings.html"  class="nav-item" data-tooltip="Settings"><i class="fas fa-cog"></i><span>Settings</span></a>
    <a href="../frontend/home.html" class="nav-item" data-tooltip="View Site" target="_blank"><i class="fas fa-external-link-alt"></i><span>View Store</span></a>
  </nav>
  <div class="sidebar-footer">
    <a href="admin-login.html" class="nav-item" data-tooltip="Logout" onclick="localStorage.removeItem('askr_admin')" style="color:var(--red)">
      <i class="fas fa-sign-out-alt"></i><span>Logout</span>
    </a>
  </div>
</aside>`;

const HEADER_HTML = (title, breadcrumb) => `
<header class="top-header">
  <div class="header-left">
    <button class="sidebar-toggle" id="sidebarToggle"><i class="fas fa-bars"></i></button>
    <div>
      <div class="page-title">${title}</div>
      <div class="breadcrumb">Admin / <span>${breadcrumb || title}</span></div>
    </div>
  </div>
  <div class="header-right">
    <div class="header-search">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search...">
    </div>
    <a href="orders.html" class="header-btn" title="Orders" style="position:relative">
      <i class="fas fa-bell"></i>
      <span class="header-badge">3</span>
    </a>
    <a href="../frontend/home.html" class="header-btn" title="View Store" target="_blank">
      <i class="fas fa-external-link-alt"></i>
    </a>
    <div class="admin-avatar" title="Admin Profile" onclick="window.location='settings.html'">A</div>
  </div>
</header>`;

document.addEventListener('DOMContentLoaded', () => {
  const sidebarEl = document.getElementById('sidebar-placeholder');
  const headerEl  = document.getElementById('header-placeholder');
  if (sidebarEl) sidebarEl.innerHTML = SIDEBAR_HTML;
  if (headerEl)  headerEl.innerHTML  = HEADER_HTML(
    document.body.dataset.title || 'Dashboard',
    document.body.dataset.breadcrumb || ''
  );
});
