/* ============ CONFIGURATION ============ */
const CONFIG = {
  whatsappNumber: "6283179061075",

  socials: [
    { name: "TikTok",    icon: "fa-brands fa-tiktok",    username: "@javr16.another", url: "https://www.tiktok.com/@javr16.another" },
    { name: "Instagram", icon: "fa-brands fa-instagram", username: "@another.person16", url: "https://www.instagram.com/another.person16?igsh=MXY2Y3dhNWp3YjlsbA==" },
    { name: "X",         icon: "fa-brands fa-x-twitter", username: "@Anotherhumans16", url: "https://x.com/Anotherhumans16" },
    { name: "Twitch",    icon: "fa-brands fa-twitch",    username: "@another_human16", url: "https://www.twitch.tv/another_human16" },
    { name: "Telegram",  icon: "fa-brands fa-telegram",  username: "@Another_Human16", url: "https://t.me/Another_Human16" }
  ],

  products: [
    { id: 1, name: "ALIGHT MOTION\nPREMIUM", duration: "1 YEAR", type: "EMAIL SENDIRI", badge: "EMAIL SENDIRI", desc: "Premium menggunakan email milik kamu sendiri.", price: "Rp 6.000,00", recommended: true },
    { id: 2, name: "ALIGHT MOTION\nPREMIUM", duration: "1 YEAR", type: "EMAIL DARI ADMIN", badge: "EMAIL ADMIN", desc: "Premium dengan email yang disediakan oleh admin.", price: "Rp 8.000,00", recommended: false },
    { id: 3, name: "ALIGHT MOTION\nPREMIUM", duration: "1 YEAR", type: "EMAIL TAMP", badge: "EMAIL TAMP", desc: "Pilihan premium dengan sistem email tamp.", price: "Rp 4.000,00", recommended: false },
    { id: 4, name: "ALIGHT MOTION\nPREMIUM", duration: "1 YEAR", type: "EMAIL SHARING", badge: "SHARING", desc: "Pilihan premium dengan sistem sharing.", price: "Rp 5.000,00", recommended: false }
  ]
};

/* ============ RENDER: SOCIALS ============ */
const socialGrid = document.getElementById('socialGrid');
const footerSocial = document.getElementById('footerSocial');

CONFIG.socials.forEach(s => {
  socialGrid.insertAdjacentHTML('beforeend', `
    <a class="social-card reveal" href="${s.url}" target="_blank" rel="noopener noreferrer">
      <div class="social-icon"><i class="${s.icon}"></i></div>
      <div>
        <div class="social-name">${s.name}</div>
        <div class="social-user">${s.username}</div>
      </div>
      <div class="social-arrow"><i class="fa-solid fa-arrow-right"></i></div>
    </a>
  `);
  footerSocial.insertAdjacentHTML('beforeend', `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}"><i class="${s.icon}"></i></a>
  `);
});

/* ============ RENDER: PRODUCTS ============ */
const productGrid = document.getElementById('productGrid');

CONFIG.products.forEach((p, i) => {
  productGrid.insertAdjacentHTML('beforeend', `
    <div class="product-card reveal">
      ${p.recommended ? '<span class="product-rec">Recommended</span>' : ''}
      <div class="product-id">[0${p.id}]</div>
      <div class="product-name">${p.name.replace('\\n','<br>')}</div>
      <div class="product-duration">${p.duration}</div>
      <span class="product-type-badge">${p.badge}</span>
      <p class="product-desc">${p.desc}</p>
      <div class="product-price">${p.price}</div>
      <button class="order-btn" data-order="${p.id}">ORDER NOW <i class="fa-solid fa-arrow-right"></i></button>
    </div>
  `);
});

/* ============ NAVBAR: MOBILE MENU ============ */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const icon = hamburgerBtn.querySelector('i');
  icon.className = mobileMenu.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});
mobileMenu.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
  });
});

/* ============ SMOOTH SCROLL ============ */
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.getAttribute('data-scroll'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
document.querySelectorAll('a[data-nav]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ============ ACTIVE NAV STATE ============ */
const sections = ['home','profile','premium','socials'].map(id => document.getElementById(id));
const navAnchors = document.querySelectorAll('a[data-nav]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => a.classList.toggle('active', a.dataset.nav === id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && navObserver.observe(s));

/* ============ SCROLL REVEAL ============ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============ HERO STATUS PANEL BOOT ANIMATION ============ */
window.addEventListener('load', () => {
  document.querySelectorAll('#statusPanel [data-row]').forEach((row, i) => {
    setTimeout(() => row.classList.add('on'), 300 + i * 350);
  });
});

/* ============ ORDER MODAL ============ */
const modalOverlay = document.getElementById('modalOverlay');
const optionList = document.getElementById('optionList');
const modalDetail = document.getElementById('modalDetail');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const cancelBtn = document.getElementById('cancelBtn');
const continueWaBtn = document.getElementById('continueWaBtn');

let selectedProductId = CONFIG.products[0].id;

function renderOptions() {
  optionList.innerHTML = CONFIG.products.map(p => `
    <label class="option ${p.id === selectedProductId ? 'selected' : ''}" data-option="${p.id}">
      <input type="radio" name="productType" value="${p.id}" ${p.id === selectedProductId ? 'checked' : ''}>
      <span class="option-text">${p.type}</span>
    </label>
  `).join('');

  optionList.querySelectorAll('.option').forEach(opt => {
    opt.addEventListener('click', () => {
      selectedProductId = parseInt(opt.getAttribute('data-option'));
      renderOptions();
      renderDetail();
    });
  });
}

function renderDetail() {
  const p = CONFIG.products.find(pr => pr.id === selectedProductId);
  modalDetail.innerHTML = `
    <div class="d-name">Alight Motion Premium — ${p.duration}</div>
    <div class="d-name" style="color:var(--muted); font-weight:500; font-size:12.5px; margin-top:4px;">${p.type}</div>
    <div class="d-price">${p.price}</div>
  `;
}

function openModal(productId) {
  selectedProductId = productId || CONFIG.products[0].id;
  renderOptions();
  renderDetail();
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-order]').forEach(btn => {
  btn.addEventListener('click', () => openModal(parseInt(btn.getAttribute('data-order'))));
});
document.getElementById('ctaOrderBtn').addEventListener('click', () => openModal(CONFIG.products[0].id));

modalCloseBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
});

continueWaBtn.addEventListener('click', () => {
  const p = CONFIG.products.find(pr => pr.id === selectedProductId);
  const baseMessage = "Halo Min, Saya Ingin Alight Motion Premium 1 Tahun";
  const fullMessage = `${baseMessage} - ${p.type}`;
  const encoded = encodeURIComponent(fullMessage);
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
});