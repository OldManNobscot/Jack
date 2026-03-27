// =============================================
// JACK BERRY — Personal Site JS
// =============================================

// --- Navbar scroll behavior ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// --- Scroll reveal animations ---
const revealTargets = document.querySelectorAll(
  '.about-text, .about-card-stack, .info-card, .highlight, ' +
  '.edu-card, .achievement-card, .exp-item, ' +
  '.activity-card, .honor-card, .contact-card, .contact-message'
);
revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
});
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- Contact form handler ---
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('form-success').classList.remove('hidden');
    e.target.reset();
    btn.textContent = 'Send Message ✉️';
    btn.disabled = false;
  }, 1200);
}

// --- Cursor glow effect (desktop only) ---
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(189,48,57,0.07) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glow);
  let glowActive = false;
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    if (!glowActive) { glow.style.opacity = '1'; glowActive = true; }
  }, { passive: true });
  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0'; glowActive = false;
  });
}
