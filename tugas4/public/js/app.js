const defaultMenuData = [
  {
    id: 1,
    code: 'MNU001',
    name: 'Nasi Goreng',
    vendor: 'Kantin Barokah',
    category: 'Nasi',
    price: 11000,
    image: '/images/nasi-goreng.jpg',
    popular: true,
    available: true,
    description: 'Nasi goreng gurih dengan topping lengkap.'
  },
  {
    id: 2,
    code: 'MNU002',
    name: 'Ayam Geprek',
    vendor: 'Kantin Barokah',
    category: 'Ayam',
    price: 10000,
    image: '/images/ayam-geprek.jpg',
    popular: true,
    available: true,
    description: 'Ayam crispy dengan sambal geprek pedas.'
  },
  {
    id: 3,
    code: 'MNU003',
    name: 'Nasi Rawon',
    vendor: 'Kantin Barokah',
    category: 'Nasi',
    price: 8000,
    image: '/images/nasi-rawon.jpg',
    popular: true,
    available: true,
    description: 'Rawon hangat dengan kuah gurih khas.'
  },
  {
    id: 4,
    code: 'MNU004',
    name: 'Nasi Gila',
    vendor: 'Kantin Barokah',
    category: 'Nasi',
    price: 10000,
    image: '/images/nasi-gila.jpg',
    popular: true,
    available: true,
    description: 'Nasi gila nikmat untuk makan siang cepat.'
  },
  {
    id: 5,
    code: 'MNU005',
    name: 'Es Teh Manis',
    vendor: 'Kantin Sejahtera',
    category: 'Minuman',
    price: 5000,
    image: '/images/esteh.jpg',
    popular: false,
    available: true,
    description: 'Es teh manis dingin untuk teman makan.'
  },
  {
    id: 6,
    code: 'MNU006',
    name: 'Es Jeruk',
    vendor: 'Kantin Makmur',
    category: 'Minuman',
    price: 7000,
    image: '/images/esjeruk.jpg',
    popular: false,
    available: true,
    description: 'Es jeruk segar dengan rasa manis asam.'
  },
  {
    id: 7,
    code: 'MNU007',
    name: 'Pisang Coklat',
    vendor: 'Kantin Sejahtera',
    category: 'Snack',
    price: 5000,
    image: '/images/pisang-coklat.jpg',
    popular: false,
    available: true,
    description: 'Pisang Coklat renyah dengan isian coklat.'
  },
  {
    id: 8,
    code: 'MNU008',
    name: 'Tahu Kocek',
    vendor: 'Kantin Makmur',
    category: 'Snack',
    price: 5000,
    image: '/images/tahu-kocek.jpg',
    popular: false,
    available: true,
    description: 'Tahu kocek crispy dan gurih.'
  }
];

const seedOrders = [
  { invoice: '#INV001', dateTime: '12 Mar 2026, 12:30', menu: 'Nasi Goreng', vendor: 'Kantin Barokah', qty: 1, total: 11000, pickupTime: '13:00', status: 'Selesai' },
  { invoice: '#INV002', dateTime: '13 Mar 2026, 10:15', menu: 'Ayam Geprek', vendor: 'Kantin Barokah', qty: 2, total: 20000, pickupTime: '11:00', status: 'Diproses' },
  { invoice: '#INV003', dateTime: '14 Mar 2026, 09:00', menu: 'Nasi Rawon', vendor: 'Kantin Barokah', qty: 1, total: 8000, pickupTime: '12:00', status: 'Siap Diambil' },
  { invoice: '#INV004', dateTime: '15 Mar 2026, 14:20', menu: 'Nasi Gila', vendor: 'Kantin Barokah', qty: 1, total: 10000, pickupTime: '15:00', status: 'Dibatalkan' }
];

const storageKeys = {
  cart: 'gettinCart',
  orders: 'gettinOrders',
  menus: 'gettinMenus'
};

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value || 0);

const fallbackImage = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23f4f4f4'/><text x='150' y='130' font-size='82' text-anchor='middle'>🍽️</text><text x='150' y='205' font-size='24' text-anchor='middle' fill='%23444'>Menu</text></svg>";

const normalizeMenus = (menus) => menus.map((item, index) => ({
  id: Number(item.id) || index + 1,
  code: item.code || `MNU${String(index + 1).padStart(3, '0')}`,
  name: item.name || 'Menu Baru',
  vendor: item.vendor || 'Kantin Umum',
  category: item.category || 'Lainnya',
  price: Number(item.price) || 0,
  image: item.image || fallbackImage,
  popular: Boolean(item.popular),
  available: item.available !== false,
  description: item.description || 'Belum ada deskripsi.'
}));

function getMenus() {
  const stored = JSON.parse(localStorage.getItem(storageKeys.menus) || 'null');
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    localStorage.setItem(storageKeys.menus, JSON.stringify(defaultMenuData));
    return normalizeMenus(defaultMenuData);
  }
  return normalizeMenus(stored);
}

function saveMenus(menus) {
  localStorage.setItem(storageKeys.menus, JSON.stringify(normalizeMenus(menus)));
}

function getCart() { return JSON.parse(localStorage.getItem(storageKeys.cart) || '[]'); }
function saveCart(cart) { localStorage.setItem(storageKeys.cart, JSON.stringify(cart)); updateCartCount(); }
function getOrders() { return JSON.parse(localStorage.getItem(storageKeys.orders) || '[]'); }
function saveOrders(orders) { localStorage.setItem(storageKeys.orders, JSON.stringify(orders)); }

function updateCartCount() {
  const countEls = document.querySelectorAll('[data-cart-count]');
  const totalItems = getCart().reduce((sum, item) => sum + item.qty, 0);
  countEls.forEach((el) => {
    el.textContent = totalItems;
    el.style.display = totalItems > 0 ? 'inline-flex' : 'none';
  });
}

function showToast(message) {
  const existing = document.querySelector('.toast-message');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 1800);
}

function createMenuCard(item) {
  const article = document.createElement('article');
  article.className = 'card menu-card';
  article.innerHTML = `
    <img src="${item.image || fallbackImage}" alt="${item.name}">
    <p class="nama-kantin">${item.vendor}</p>
    <h3>${item.name}</h3>
    <p class="menu-category">${item.category} • ${item.code}</p>
    <p class="menu-description">${item.description}</p>
    <p class="menu-price">${formatRupiah(item.price)}</p>
    <button class="btn add-cart-btn" data-add-to-cart="${item.id}" ${item.available ? '' : 'disabled'}>${item.available ? 'Tambah ke Keranjang' : 'Tidak Tersedia'}</button>
  `;
  return article;
}

function addToCart(menuId) {
  const item = getMenus().find((menu) => menu.id === Number(menuId));
  if (!item || !item.available) return;
  const cart = getCart();
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  if (existingItem) existingItem.qty += 1;
  else {
    cart.push({ id: item.id, name: item.name, vendor: item.vendor, price: item.price, image: item.image, qty: 1 });
  }
  saveCart(cart);
  showToast(`${item.name} ditambahkan ke keranjang.`);
}

function renderPopularMenu() {
  const container = document.getElementById('popular-menu-container');
  if (!container) return;
  container.innerHTML = '';
  getMenus().filter((item) => item.popular && item.available).slice(0, 4).forEach((item) => container.appendChild(createMenuCard(item)));
}

function renderStats() {
  const statsContainer = document.getElementById('stats-container');
  if (!statsContainer) return;
  const menus = getMenus();
  const vendors = new Set(menus.map((item) => item.vendor)).size;
  const cartItems = getCart().reduce((sum, item) => sum + item.qty, 0);
  const availableCount = menus.filter((item) => item.available).length;
  const lowestPrice = menus.length ? Math.min(...menus.map((item) => item.price)) : 0;
  const stats = [
    { label: 'Total Menu', value: menus.length },
    { label: 'Menu Tersedia', value: availableCount },
    { label: 'Vendor Aktif', value: vendors },
    { label: 'Harga Termurah', value: formatRupiah(lowestPrice) },
    { label: 'Isi Keranjang', value: cartItems }
  ];
  statsContainer.innerHTML = stats.map((stat) => `
    <article class="stat-card">
      <p class="stat-value">${stat.value}</p>
      <p class="stat-label">${stat.label}</p>
    </article>
  `).join('');
}

function getSelectedValues(selector) {
  return Array.from(document.querySelectorAll(selector)).filter((input) => input.checked).map((input) => input.value);
}

function renderMenuFilterOptions() {
  const menus = getMenus();
  const categoryBox = document.getElementById('category-filter-options');
  const vendorBox = document.getElementById('vendor-filter-options');
  if (categoryBox) {
    const categories = [...new Set(menus.map((item) => item.category))].sort();
    categoryBox.innerHTML = categories.map((category) => `<label><input type="checkbox" class="category-filter" value="${category}"> ${category}</label>`).join('');
  }
  if (vendorBox) {
    const vendors = [...new Set(menus.map((item) => item.vendor))].sort();
    vendorBox.innerHTML = vendors.map((vendor) => `<label><input type="checkbox" class="vendor-filter" value="${vendor}"> ${vendor}</label>`).join('');
  }
}

function applyMenuFilters() {
  const list = document.getElementById('menu-list');
  if (!list) return;
  const query = (document.getElementById('menu-search-input')?.value || '').trim().toLowerCase();
  const selectedCategories = getSelectedValues('.category-filter');
  const selectedVendors = getSelectedValues('.vendor-filter');
  const selectedRanges = getSelectedValues('.price-filter');
  const filteredMenus = getMenus().filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(query) ||
      item.vendor.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    const matchesVendor = selectedVendors.length === 0 || selectedVendors.includes(item.vendor);
    const matchesPrice = selectedRanges.length === 0 || selectedRanges.some((range) => {
      if (range === 'lt10000') return item.price < 10000;
      if (range === '10000to15000') return item.price >= 10000 && item.price <= 15000;
      if (range === 'gt15000') return item.price > 15000;
      return true;
    });
    return matchesQuery && matchesCategory && matchesVendor && matchesPrice && item.available;
  });
  list.innerHTML = '';
  filteredMenus.forEach((item) => list.appendChild(createMenuCard(item)));
  const resultInfo = document.getElementById('result-info');
  if (resultInfo) resultInfo.textContent = `${filteredMenus.length} menu ditemukan`;
  const emptyState = document.getElementById('menu-empty-state');
  if (emptyState) emptyState.style.display = filteredMenus.length === 0 ? 'block' : 'none';
}

function setupMenuPage() {
  const list = document.getElementById('menu-list');
  if (!list) return;
  renderMenuFilterOptions();
  applyMenuFilters();
  document.getElementById('menu-search-input')?.addEventListener('input', applyMenuFilters);
  document.getElementById('menu-search-button')?.addEventListener('click', applyMenuFilters);
  document.querySelector('.sidebar')?.addEventListener('change', (event) => {
    if (event.target.matches('input')) applyMenuFilters();
  });
  document.getElementById('reset-filter-button')?.addEventListener('click', () => {
    document.getElementById('menu-search-input').value = '';
    document.querySelectorAll('.sidebar input').forEach((input) => { input.checked = false; });
    applyMenuFilters();
  });
}

function renderCartPage() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const serviceFee = cart.length > 0 ? 2000 : 0;
  const total = subtotal + serviceFee;
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Keranjang masih kosong</h3>
        <p>Tambahkan menu favoritmu dari halaman menu.</p>
        <a href="menu.html" class="btn link-btn">Lihat Menu</a>
      </div>`;
  } else {
    cart.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img src="${item.image || fallbackImage}" alt="${item.name}">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>${item.vendor}</p>
          <p>${formatRupiah(item.price)}</p>
        </div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button type="button" data-qty-action="decrease" data-item-id="${item.id}">-</button>
            <span>${item.qty}</span>
            <button type="button" data-qty-action="increase" data-item-id="${item.id}">+</button>
          </div>
          <button type="button" class="remove-btn" data-remove-item="${item.id}">Hapus</button>
        </div>`;
      container.appendChild(row);
    });
  }
  document.getElementById('cart-subtotal').textContent = formatRupiah(subtotal);
  document.getElementById('cart-service-fee').textContent = formatRupiah(serviceFee);
  document.getElementById('cart-total').textContent = formatRupiah(total);
  document.getElementById('checkout-button')?.toggleAttribute('disabled', cart.length === 0);
}

function changeCartQty(itemId, type) {
  const cart = getCart().map((item) => ({ ...item }));
  const item = cart.find((entry) => entry.id === Number(itemId));
  if (!item) return;
  if (type === 'increase') item.qty += 1;
  if (type === 'decrease') item.qty -= 1;
  const updatedCart = cart.filter((entry) => entry.qty > 0);
  saveCart(updatedCart);
  renderCartPage();
  renderStats();
}

function removeCartItem(itemId) {
  const updatedCart = getCart().filter((item) => item.id !== Number(itemId));
  saveCart(updatedCart);
  renderCartPage();
  renderStats();
}

function handleCheckout() {
  const cart = getCart();
  if (cart.length === 0) return;
  const pickupTime = document.getElementById('pickup-time')?.value || '12:30';
  const now = new Date();
  const dateTime = now.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const invoiceSeed = Date.now().toString().slice(-5);
  const newOrders = cart.map((item, index) => ({
    invoice: `#INV${invoiceSeed}${index + 1}`,
    dateTime,
    menu: item.name,
    vendor: item.vendor,
    qty: item.qty,
    total: item.qty * item.price,
    pickupTime,
    status: 'Diproses'
  }));
  saveOrders([...newOrders, ...getOrders()]);
  saveCart([]);
  showToast('Checkout berhasil. Pesanan masuk ke riwayat.');
  renderCartPage();
  renderStats();
  setTimeout(() => { window.location.href = 'pesanan.html'; }, 700);
}

function getAllOrders() { return [...getOrders(), ...seedOrders]; }
function statusClass(status) {
  if (status === 'Selesai') return 'selesai';
  if (status === 'Diproses') return 'proses';
  if (status === 'Siap Diambil') return 'siap';
  return 'batal';
}

function renderOrdersPage() {
  const tbody = document.getElementById('order-table-body');
  if (!tbody) return;
  const query = (document.getElementById('order-search-input')?.value || '').trim().toLowerCase();
  const status = document.getElementById('order-status-filter')?.value || 'Semua Status';
  const filteredOrders = getAllOrders().filter((order) => {
    const matchesQuery = order.invoice.toLowerCase().includes(query) || order.menu.toLowerCase().includes(query) || order.vendor.toLowerCase().includes(query);
    const matchesStatus = status === 'Semua Status' || order.status === status;
    return matchesQuery && matchesStatus;
  });
  tbody.innerHTML = filteredOrders.map((order) => `
    <tr>
      <td>${order.invoice}</td>
      <td>${order.dateTime}</td>
      <td>${order.menu}</td>
      <td>${order.vendor}</td>
      <td>${order.qty}</td>
      <td>${formatRupiah(order.total)}</td>
      <td>${order.pickupTime}</td>
      <td><span class="status ${statusClass(order.status)}">${order.status}</span></td>
    </tr>`).join('');
  const info = document.getElementById('order-result-info');
  if (info) info.textContent = `${filteredOrders.length} pesanan ditampilkan`;
}

function setupOrderPage() {
  if (!document.getElementById('order-table-body')) return;
  renderOrdersPage();
  document.getElementById('order-search-input')?.addEventListener('input', renderOrdersPage);
  document.getElementById('order-status-filter')?.addEventListener('change', renderOrdersPage);
}

function inventoryStatusBadge(item) {
  return `<span class="status ${item.available ? 'siap' : 'batal'}">${item.available ? 'Tersedia' : 'Nonaktif'}</span>`;
}

function renderInventoryStats() {
  const container = document.getElementById('inventory-stats');
  if (!container) return;
  const menus = getMenus();
  const totalValue = menus.reduce((sum, item) => sum + item.price, 0);
  const activeMenus = menus.filter((item) => item.available).length;
  const popularMenus = menus.filter((item) => item.popular).length;
  const stats = [
    { label: 'Total Menu', value: menus.length },
    { label: 'Menu Tersedia', value: activeMenus },
    { label: 'Menu Populer', value: popularMenus },
  ];
  container.innerHTML = stats.map((stat) => `<article class="stat-card"><p class="stat-value">${stat.value}</p><p class="stat-label">${stat.label}</p></article>`).join('');
}

function renderInventoryFilters() {
  const select = document.getElementById('inventory-category-filter');
  if (!select) return;
  const currentValue = select.value || 'Semua Kategori';
  const categories = [...new Set(getMenus().map((item) => item.category))].sort();
  select.innerHTML = `<option>Semua Kategori</option>` + categories.map((category) => `<option>${category}</option>`).join('');
  select.value = categories.includes(currentValue) ? currentValue : 'Semua Kategori';
}

function renderInventoryTable() {
  const tbody = document.getElementById('inventory-table-body');
  if (!tbody) return;
  const query = (document.getElementById('inventory-search-input')?.value || '').trim().toLowerCase();
  const category = document.getElementById('inventory-category-filter')?.value || 'Semua Kategori';
  const status = document.getElementById('inventory-status-filter')?.value || 'Semua Status';
  const menus = getMenus().filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(query) || item.code.toLowerCase().includes(query) || item.vendor.toLowerCase().includes(query);
    const matchesCategory = category === 'Semua Kategori' || item.category === category;
    const matchesStatus = status === 'Semua Status' || (status === 'Tersedia' ? item.available : !item.available);
    return matchesQuery && matchesCategory && matchesStatus;
  });
  tbody.innerHTML = menus.map((item) => `
    <tr>
      <td>${item.code}</td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.vendor}</td>
      <td>${formatRupiah(item.price)}</td>
      <td>${item.popular ? 'Ya' : 'Tidak'}</td>
      <td>${inventoryStatusBadge(item)}</td>
      <td>
        <div class="inventory-actions-inline">
          <button type="button" class="search-btn inventory-small-btn" data-edit-menu="${item.id}">Edit</button>
          <button type="button" class="remove-btn inventory-small-btn" data-delete-menu="${item.id}">Hapus</button>
        </div>
      </td>
    </tr>`).join('');
  document.getElementById('inventory-result-info').textContent = `${menus.length} menu ditampilkan`;
}

function resetInventoryForm() {
  const form = document.getElementById('inventory-form');
  if (!form) return;
  form.reset();
  document.getElementById('menu-id').value = '';
  document.getElementById('menu-image').value = '';
  document.getElementById('menu-available').checked = true;
  document.getElementById('menu-popular').checked = false;
  document.getElementById('inventory-form-title').textContent = 'Tambah Menu';
  document.getElementById('inventory-submit-btn').textContent = 'Simpan Menu';
  document.getElementById('inventory-cancel-btn').style.display = 'none';
}

function fillInventoryForm(menuId) {
  const item = getMenus().find((menu) => menu.id === Number(menuId));
  if (!item) return;
  document.getElementById('menu-id').value = item.id;
  document.getElementById('menu-code').value = item.code;
  document.getElementById('menu-name').value = item.name;
  document.getElementById('menu-category').value = item.category;
  document.getElementById('menu-vendor').value = item.vendor;
  document.getElementById('menu-price').value = item.price;
  document.getElementById('menu-image').value = item.image.startsWith('img/') ? item.image : '';
  document.getElementById('menu-description').value = item.description;
  document.getElementById('menu-available').checked = item.available;
  document.getElementById('menu-popular').checked = item.popular;
  document.getElementById('inventory-form-title').textContent = 'Edit Menu';
  document.getElementById('inventory-submit-btn').textContent = 'Update Menu';
  document.getElementById('inventory-cancel-btn').style.display = 'inline-flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getInventoryFormData() {
  return {
    id: Number(document.getElementById('menu-id').value || 0),
    code: document.getElementById('menu-code').value.trim(),
    name: document.getElementById('menu-name').value.trim(),
    category: document.getElementById('menu-category').value.trim(),
    vendor: document.getElementById('menu-vendor').value.trim(),
    price: Number(document.getElementById('menu-price').value),
    image: document.getElementById('menu-image').value.trim() || fallbackImage,
    description: document.getElementById('menu-description').value.trim(),
    available: document.getElementById('menu-available').checked,
    popular: document.getElementById('menu-popular').checked
  };
}

function validateMenuForm(data) {
  if (!data.code || !data.name || !data.category || !data.vendor || !data.description) return 'Semua field wajib diisi kecuali URL gambar.';
  if (!Number.isFinite(data.price) || data.price <= 0) return 'Harga harus berupa angka lebih dari 0.';
  const menus = getMenus();
  const duplicate = menus.find((item) => item.code.toLowerCase() == data.code.toLowerCase() && item.id !== data.id);
  if (duplicate) return 'Kode menu sudah dipakai. Gunakan kode lain.';
  return '';
}

function saveInventoryMenu(event) {
  event.preventDefault();
  const data = getInventoryFormData();
  const error = validateMenuForm(data);
  const errorEl = document.getElementById('inventory-form-error');
  errorEl.textContent = error;
  if (error) return;
  const menus = getMenus();
  if (data.id) {
    const updatedMenus = menus.map((item) => item.id === data.id ? { ...item, ...data } : item);
    saveMenus(updatedMenus);
    showToast('Menu berhasil diperbarui.');
  } else {
    const nextId = menus.length ? Math.max(...menus.map((item) => item.id)) + 1 : 1;
    saveMenus([{ ...data, id: nextId }, ...menus]);
    showToast('Menu baru berhasil ditambahkan.');
  }
  resetInventoryForm();
  refreshMenuDependentViews();
}

function deleteInventoryMenu(menuId) {
  const item = getMenus().find((menu) => menu.id === Number(menuId));
  if (!item) return;
  if (!window.confirm(`Hapus menu ${item.name}?`)) return;
  const updatedMenus = getMenus().filter((menu) => menu.id !== Number(menuId));
  saveMenus(updatedMenus);
  const updatedCart = getCart().filter((entry) => entry.id !== Number(menuId));
  saveCart(updatedCart);
  showToast('Menu berhasil dihapus.');
  refreshMenuDependentViews();
}

function refreshMenuDependentViews() {
  renderStats();
  renderPopularMenu();
  renderMenuFilterOptions();
  applyMenuFilters();
  renderInventoryStats();
  renderInventoryFilters();
  renderInventoryTable();
  renderCartPage();
}

function setupInventoryPage() {
  if (!document.getElementById('inventory-form')) return;
  renderInventoryStats();
  renderInventoryFilters();
  renderInventoryTable();
  document.getElementById('inventory-form').addEventListener('submit', saveInventoryMenu);
  document.getElementById('inventory-search-input')?.addEventListener('input', renderInventoryTable);
  document.getElementById('inventory-category-filter')?.addEventListener('change', renderInventoryTable);
  document.getElementById('inventory-status-filter')?.addEventListener('change', renderInventoryTable);
  document.getElementById('inventory-cancel-btn')?.addEventListener('click', resetInventoryForm);
  resetInventoryForm();
}

function setupGlobalEvents() {
  document.body.addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-add-to-cart]');
    if (addButton) {
      addToCart(addButton.dataset.addToCart);
      renderStats();
    }
    const qtyButton = event.target.closest('[data-qty-action]');
    if (qtyButton) changeCartQty(qtyButton.dataset.itemId, qtyButton.dataset.qtyAction);
    const removeButton = event.target.closest('[data-remove-item]');
    if (removeButton) removeCartItem(removeButton.dataset.removeItem);
    const editMenuButton = event.target.closest('[data-edit-menu]');
    if (editMenuButton) fillInventoryForm(editMenuButton.dataset.editMenu);
    const deleteMenuButton = event.target.closest('[data-delete-menu]');
    if (deleteMenuButton) deleteInventoryMenu(deleteMenuButton.dataset.deleteMenu);
  });
  document.getElementById('clear-cart-button')?.addEventListener('click', () => {
    saveCart([]);
    renderCartPage();
    renderStats();
  });
  document.getElementById('checkout-button')?.addEventListener('click', handleCheckout);
}

function init() {
  getMenus();
  updateCartCount();
  renderPopularMenu();
  renderStats();
  setupMenuPage();
  renderCartPage();
  setupOrderPage();
  setupInventoryPage();
  setupGlobalEvents();
}

document.addEventListener('DOMContentLoaded', init);
