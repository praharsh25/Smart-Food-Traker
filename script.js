/**
 * Smart Food Saver - Global JavaScript
 * Handles theme toggle and scroll animations
 */

// Theme Management
const THEME_KEY = 'smartFoodSaver_theme';

/**
 * Initialize theme on page load
 */
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  setTheme(savedTheme);
}

/**
 * Set theme
 */
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    themeToggle.setAttribute('aria-label', 'Toggle light mode');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
  }
}

/**
 * Toggle theme
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

/**
 * Initialize theme toggle button
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

/**
 * Reveal elements on scroll
 */
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
  // Initial check
  revealOnScroll();
  
  // Add scroll listener with throttling
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        revealOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update focus for accessibility
        target.focus();
      }
    });
  });
}

/**
 * Initialize all global features
 */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initThemeToggle();
  initScrollAnimations();
  initSmoothScroll();
});

/**
 * Prevent FOUC (Flash of Unstyled Content)
 */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});