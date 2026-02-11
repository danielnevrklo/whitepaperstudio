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
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const cases = {
  regulace: {
    title: 'Regulace trhu',
    text: 'Připravíme white paper s variantami regulatorních dopadů, modelací rizik a doporučením postupu pro interní vedení i externí jednání.',
    points: [
      'Právní + datová argumentace pro management.',
      'Podklady pro připomínková řízení.',
      'Executive verze pro board.'
    ]
  },
  dotace: {
    title: 'Dotace',
    text: 'Nastavíme logiku dokumentu pro dotační rozhodnutí včetně testu souladu, důkazních příloh a obrany proti námitkám.',
    points: [
      'Test souladu s podmínkami programu.',
      'Důkazní sada k účelnosti a dopadům.',
      'Argumentace pro audit a kontrolní orgány.'
    ]
  },
  infrastruktura: {
    title: 'Infrastruktura',
    text: 'Pro města a utility připravíme white paper k investičním rozhodnutím, regulatorním dopadům a veřejné komunikaci.',
    points: [
      'Variantní scénáře finančních a provozních dopadů.',
      'Rámec pro veřejnou i interní komunikaci.',
      'Podklady pro správní řízení a schvalování.'
    ]
  }
};

const caseTitle = document.getElementById('case-title');
const caseText = document.getElementById('case-text');
const casePoints = document.getElementById('case-points');

document.querySelectorAll('.case-tab').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.case-tab').forEach((tab) => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');

    const data = cases[button.dataset.case];
    caseTitle.textContent = data.title;
    caseText.textContent = data.text;
    casePoints.innerHTML = data.points.map((item) => `<li>${item}</li>`).join('');
  });
});

const hotspotData = {
  summary: {
    title: 'Executive summary',
    text: 'Jednostránkové shrnutí pro rychlé rozhodnutí vedení: co, proč, dopad, doporučení.'
  },
  risk: {
    title: 'Riziková mapa',
    text: 'Přehled regulatorních, právních a reputačních rizik včetně dopadů a mitigací.'
  },
  evidence: {
    title: 'Důkazní rámec',
    text: 'Datové tabulky, legislativní opora a precedenty, které nesou hlavní tvrzení dokumentu.'
  },
  actions: {
    title: 'Akční doporučení',
    text: 'Konkrétní kroky v čase: kdo, co, do kdy a s jakým rozhodovacím výstupem.'
  }
};

const hotspotTitle = document.getElementById('hotspot-title');
const hotspotText = document.getElementById('hotspot-text');

document.querySelectorAll('.hotspot').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.hotspot').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const data = hotspotData[button.dataset.hotspot];
    hotspotTitle.textContent = data.title;
    hotspotText.textContent = data.text;
  });
});

const processDescriptions = {
  1: 'Mapujeme cíle, rizika, stakeholdery a regulatorní rámec.',
  2: 'Stavíme argumentační architekturu a volíme důkazní strategii.',
  3: 'Připravujeme draft, iterujeme s týmem a zpřesňujeme sdělení.',
  4: 'Finalizujeme dokument a podklady pro interní i správní použití.'
};

const processRange = document.getElementById('process-range');
const processDescription = document.getElementById('process-description');

function setProcessStep(step) {
  document.querySelectorAll('.step').forEach((item) => {
    item.classList.toggle('active', Number(item.dataset.step) === step);
  });
  processDescription.textContent = processDescriptions[step];
}

processRange.addEventListener('input', () => {
  setProcessStep(Number(processRange.value));
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

const countObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const el = entry.target;
      const target = Number(el.dataset.target);
      const duration = 900;
      const start = performance.now();

      function tick(time) {
        const progress = Math.min((time - start) / duration, 1);
        el.textContent = String(Math.floor(progress * target));
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = String(target);
        }
      }

      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  },
  { threshold: 0.45 }
);

document.querySelectorAll('.count').forEach((el) => countObserver.observe(el));

setProcessStep(1);
document.getElementById('year').textContent = new Date().getFullYear();
