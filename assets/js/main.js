// Hamburger Menü
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

hamburger.addEventListener("click", (e) => {
  navMenu.classList.toggle("active");
  e.stopPropagation();
});

navMenu.addEventListener("click", (e) => e.stopPropagation());

document.addEventListener("click", () => navMenu.classList.remove("active"));

// Galeri Filtreleme
const galleryButtons = document.querySelectorAll(".gallery-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

// Başlangıçta tüm resimleri gizle
galleryItems.forEach((item) => (item.style.display = "none"));

// Başlangıçta "dis" (Dış Mekan) göster ve butonu aktif yap
const initialFilter = "dis";
galleryItems.forEach((item) => {
  if (item.classList.contains(initialFilter)) item.style.display = "block";
});
galleryButtons.forEach((btn) => {
  if (btn.dataset.filter === initialFilter) btn.classList.add("active");
});

// Butonlara tıklayınca filtre uygula
galleryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // Aktif buton değiştir
    galleryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Filtre uygula
    galleryItems.forEach((item) => {
      item.style.display = item.classList.contains(filter) ? "block" : "none";
    });
  });
});

// Menü Filtreleme
const menuButtons = document.querySelectorAll(".menu-btn");
const menuCategories = document.querySelectorAll(".menu-category");

menuButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // Aktif buton
    menuButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Sadece ilgili kategori göster
    menuCategories.forEach((cat) => {
      cat.style.display = cat.classList.contains(filter) ? "block" : "none";
    });
  });
});

// İsteğe bağlı: sayfa yüklendiğinde ilk kategori otomatik açık
window.addEventListener("DOMContentLoaded", () => {
  if (menuButtons.length > 0) menuButtons[0].click();
});
