const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.16 }
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

const orbitLabel = document.getElementById('orbit-label');
document.querySelectorAll('.orbit-pill').forEach((pill) => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.orbit-pill').forEach((item) => item.classList.remove('active'));
    pill.classList.add('active');
    orbitLabel.textContent = pill.dataset.orbit;
  });
});

const storyTrack = document.getElementById('story-track');
const storyCards = Array.from(document.querySelectorAll('[data-story]'));
let storyIndex = 0;

function updateStory() {
  const cardWidth = storyCards[0].getBoundingClientRect().width + 12;
  storyTrack.style.setProperty('--storyX', `${-storyIndex * cardWidth}px`);
  storyCards.forEach((card, idx) => card.classList.toggle('active', idx === storyIndex));
}

window.addEventListener('wheel', (event) => {
  const expSection = document.getElementById('experience');
  const rect = expSection.getBoundingClientRect();
  const inView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
  if (!inView) {
    return;
  }

  if (Math.abs(event.deltaY) < 15) {
    return;
  }

  if (event.deltaY > 0 && storyIndex < storyCards.length - 1) {
    storyIndex += 1;
    updateStory();
    event.preventDefault();
  } else if (event.deltaY < 0 && storyIndex > 0) {
    storyIndex -= 1;
    updateStory();
    event.preventDefault();
  }
}, { passive: false });

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
  { threshold: 0.4 }
);

document.querySelectorAll('.count').forEach((el) => countObserver.observe(el));

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

updateStory();
document.getElementById('year').textContent = new Date().getFullYear();
