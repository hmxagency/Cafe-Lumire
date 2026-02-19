document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Scroll Animasyonları (Intersection Observer)
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealOptions = {
        threshold: 0.15, // Elemanın %15'i göründüğünde tetikle
        rootMargin: "0px 0px -50px 0px" 
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Sadece bir kere animasyon yap
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 2. Header Arka Plan Değişimi (Scroll)
    const header = document.querySelector(".site-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.background = "rgba(10, 15, 22, 0.9)";
            header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
        } else {
            header.style.background = "var(--bg-glass)";
            header.style.boxShadow = "none";
        }
    });

    // 3. Menü & Galeri Filtreleme (Fade Animasyonlu)
    function setupFilter(buttonsSelector, itemsSelector, isDisplayBlock = true) {
        const buttons = document.querySelectorAll(buttonsSelector);
        const items = document.querySelectorAll(itemsSelector);

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                // Aktif butonu değiştir
                buttons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.getAttribute("data-filter");

                // Öğeleri yumuşak geçişle göster/gizle
                items.forEach(item => {
                    item.style.opacity = "0"; // Önce görünmez yap
                    item.style.transform = "translateY(20px)";
                    
                    setTimeout(() => {
                        if (item.classList.contains(filter)) {
                            item.style.display = isDisplayBlock ? "block" : "grid";
                            // Reflow tetikle ki CSS transition çalışsın
                            void item.offsetWidth;
                            item.style.opacity = "1";
                            item.style.transform = "translateY(0)";
                        } else {
                            item.style.display = "none";
                        }
                    }, 300); // CSS transition süresi ile eşzamanlı
                });
            });
        });
    }

    // Galeri ve Menü için filtreleri başlat
    setupFilter(".gallery-btn", ".gallery-item", true);
    setupFilter(".menu-btn", ".menu-category", true);

    // 4. Hamburger Menü Mobil (Opsiyonel Kod)
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        // CSS tarafında .nav-menu.active için gerekli display/opacity ayarlarını ekleyebilirsin.
    });
});
