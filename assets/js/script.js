'use strict';

/* =============================================
   AARON GUZMAN PORTFOLIO — script.js
   Scroll, Animations, Nav, Counter, Roles
============================================= */

// ===== DOM References =====
const header      = document.getElementById('header');
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('navLinks');
const backToTop   = document.getElementById('backToTop');
const cursorGlow  = document.getElementById('cursorGlow');
const navLinkEls  = document.querySelectorAll('.nav-link');
const sections    = document.querySelectorAll('section[id]');

// ===== CURSOR GLOW =====
document.addEventListener('mousemove', (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  }
});

// ===== HAMBURGER MENU =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close nav when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== SCROLL EVENTS =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Sticky header bg
  if (scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Back to top
  if (scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active nav link based on section
  updateActiveNav();
});

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkEls.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== REVEAL ON SCROLL (IntersectionObserver) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Staggered delay for siblings
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.classList.add('animated');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + (target >= 10 ? '+' : '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        animateCounter(el, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) counterObserver.observe(statsSection);

// ===== ROLE ROTATOR =====
const roles = [
  'Desarrollador Web',
  'Técnico en Hardware',
  'Especialista en Redes',
  'Apasionado por la Tech',
  'Full Stack (en camino)'
];
let roleIndex = 0;
const roleTag = document.getElementById('role-tag');

function rotateRole() {
  if (!roleTag) return;
  roleTag.style.opacity = '0';
  roleTag.style.transform = 'translateY(-8px)';
  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleTag.textContent = roles[roleIndex];
    roleTag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    roleTag.style.opacity = '1';
    roleTag.style.transform = 'translateY(0)';
  }, 400);
}

if (roleTag) {
  roleTag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  setInterval(rotateRole, 2800);
}

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  });
});

// ===== CONTACT FORM feedback =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = document.getElementById('btn-submit-contact');
  contactForm.addEventListener('submit', async (e) => {
    if (submitBtn) {
      submitBtn.textContent = 'Enviando...';
      submitBtn.style.pointerEvents = 'none';
      submitBtn.style.opacity = '0.7';
    }
    // Let formspree handle the actual submission
    // Reset after 3s fallback
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> ¡Mensaje Enviado!';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      }
    }, 2000);
  });
}

// ===== Stagger reveal delay for siblings =====
document.querySelectorAll('.cert-cards-grid, .skills-grid, .projects-grid, .services-grid, .stats-grid').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });
});