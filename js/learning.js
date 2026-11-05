// ===================== TOGGLE DETAIL MATERI =====================
const detailToggles = document.querySelectorAll('.detail-toggle');

detailToggles.forEach((button) => {
  button.addEventListener('click', () => {
    const detailId = button.getAttribute('aria-controls');
    const detail = document.getElementById(detailId);

    if (!detail) return;

    // Toggle visibility
    const isHidden = detail.hidden;
    detail.hidden = !isHidden;

    // Update atribut aksesibilitas
    button.setAttribute('aria-expanded', String(isHidden));

    // Ganti teks tombol
    button.textContent = isHidden ? 'Tutup tantangan' : 'Lihat tantangan';
  });
});

// ===================== FILTER MATERI =====================
const filterButtons = document.querySelectorAll('.filter-btn');
const learningCards = document.querySelectorAll('.learning-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Update status aktif tombol
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    learningCards.forEach((card) => {
      const category = card.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});