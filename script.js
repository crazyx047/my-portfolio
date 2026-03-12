/* =====================
   Navigation
   ===================== */
const nav        = document.getElementById('nav');
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =====================
   Typing Animation
   ===================== */
const phrases = [
  'Aspiring Full-Stack Developer',
  'Frontend Enthusiast',
  'Backend Builder',
  'Open Source Contributor',
  'Problem Solver',
];

let phraseIndex = 0;
let charIndex   = 0;
let deleting    = false;
const typedEl   = document.getElementById('typedText');

function type() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 55 : 75);
}

type();

/* =====================
   Intersection Observer — Fade-In
   ===================== */
const fadeEls = document.querySelectorAll(
  '.about-grid, .skills-grid, .bars-list, .project-card, .contact-grid, .stat, .skill-category'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* =====================
   Skill Bar Animation
   ===================== */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const target = bar.getAttribute('data-w');
        bar.style.width = target + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const barsSection = document.querySelector('.bars-list');
if (barsSection) barObserver.observe(barsSection);

/* =====================
   Footer Year
   ===================== */
document.getElementById('year').textContent = new Date().getFullYear();

/* =====================
   Contact Form
   ===================== */
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name').trim();

  formNote.textContent = '';
  formNote.className   = 'form-note';

  // Basic validation
  if (!name) {
    formNote.textContent = 'Please enter your name.';
    formNote.classList.add('error');
    return;
  }

  // Simulate sending (replace with a real service like Formspree)
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
    formNote.textContent = `Thanks, ${name}! I'll get back to you soon.`;
    formNote.classList.add('success');

    setTimeout(() => {
      formNote.textContent = '';
      formNote.className   = 'form-note';
    }, 5000);
  }, 1000);
});

/* =====================
   Active nav link highlight
   ===================== */
const sections = document.querySelectorAll('section[id]');
const links    = navLinks.querySelectorAll('a');

function setActiveLink() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  links.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--text)' : '';
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
