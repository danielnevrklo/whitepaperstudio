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
    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    card.style.transform = `perspective(750px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = 'perspective(750px) rotateX(0deg) rotateY(0deg)';
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const insights = {
  regulace: {
    title: 'Regulace trhu',
    text: 'Připravíme white paper s variantami regulatorních dopadů, modelací rizik a doporučením postupu pro interní vedení i externí jednání s úřady.',
    points: [
      'Právní a datová argumentace pro rozhodnutí managementu.',
      'Podklady pro správní jednání a připomínková řízení.',
      'Executive summary pro board a stakeholdery.'
    ]
  },
  dotace: {
    title: 'Dotace & veřejná podpora',
    text: 'Sestavíme podkladový dokument k dotačnímu nebo veřejnoprávnímu procesu včetně testu souladu, argumentace účelnosti a obrany proti námitkám.',
    points: [
      'Mapování rizik neoprávněné podpory a návrh mitigací.',
      'Struktura argumentace pro poskytovatele i kontrolní orgány.',
      'Checklist příloh a harmonogram podání.'
    ]
  },
  obec: {
    title: 'Město / obec',
    text: 'Pomáháme samosprávám připravit odborně podložený white paper pro zásadní veřejná rozhodnutí, připomínkování i komunikaci s veřejností.',
    points: [
      'Variantní scénáře dopadů na rozpočet, provoz a občany.',
      'Odborná argumentace pro jednání zastupitelstva.',
      'Srozumitelná verze pro veřejnou prezentaci.'
    ]
  }
};

const titleEl = document.getElementById('insight-title');
const textEl = document.getElementById('insight-text');
const pointsEl = document.getElementById('insight-points');

function renderInsight(key) {
  const item = insights[key];
  titleEl.textContent = item.title;
  textEl.textContent = item.text;
  pointsEl.innerHTML = item.points.map((point) => `<li>${point}</li>`).join('');
}

document.querySelectorAll('.tab').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });

    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    renderInsight(button.dataset.tab);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
