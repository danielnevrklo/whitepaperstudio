const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  cursorGlow.style.setProperty('--x', `${event.clientX}px`);
  cursorGlow.style.setProperty('--y', `${event.clientY}px`);
});

const cards = document.querySelectorAll('[data-tilt]');
cards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)';
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.getElementById('year').textContent = new Date().getFullYear();
