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

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  document.documentElement.style.setProperty('--scroll', `${progress}%`);
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

const complexity = document.getElementById('complexity');
const deadline = document.getElementById('deadline');
const score = document.getElementById('score');
const recommendation = document.getElementById('recommendation');
const shuffle = document.getElementById('shuffle');
const pulseTarget = document.querySelector('.pulse-target');

function updateSimulator() {
  const complexityValue = Number(complexity.value);
  const deadlineValue = Number(deadline.value);
  const readiness = Math.max(20, Math.min(95, Math.round((100 - complexityValue) * 0.45 + deadlineValue * 0.9)));
  score.textContent = `${readiness}%`;

  if (readiness >= 75) {
    recommendation.textContent = 'Doporučení: Strategický white paper + executive shrnutí.';
  } else if (readiness >= 55) {
    recommendation.textContent = 'Doporučení: White paper + příloha pro správní řízení.';
  } else {
    recommendation.textContent = 'Doporučení: Rychlá argumentační sada + krizový harmonogram podání.';
  }

  pulseTarget.classList.remove('pulse');
  void pulseTarget.offsetWidth;
  pulseTarget.classList.add('pulse');
}

[complexity, deadline].forEach((input) => {
  input.addEventListener('input', updateSimulator);
});

shuffle.addEventListener('click', () => {
  complexity.value = String(Math.floor(Math.random() * 100) + 1);
  deadline.value = String(Math.floor(Math.random() * 60) + 1);
  updateSimulator();
});

const magneticItems = document.querySelectorAll('.magnetic');
magneticItems.forEach((item) => {
  item.addEventListener('pointermove', (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  item.addEventListener('pointerleave', () => {
    item.style.transform = 'translate(0, 0)';
  });
});

updateSimulator();
document.getElementById('year').textContent = new Date().getFullYear();
