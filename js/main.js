// ===================== THEME TOGGLE =====================
const themeToggle = document.getElementById('themeToggle');
const rootElement = document.documentElement;

// Ambil tema tersimpan
const savedTheme = localStorage.getItem('kelasik-theme');
if (savedTheme) {
  rootElement.setAttribute('data-theme', savedTheme);
}

// Toggle tema
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('kelasik-theme', newTheme);
  });
}

// ===================== MOBILE MENU =====================
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  // Tutup menu saat link diklik (mobile)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===================== ANIMASI COUNTER (Halaman Home) =====================
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0) {
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1500;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  // Jalankan saat elemen terlihat
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((num) => observer.observe(num));
}