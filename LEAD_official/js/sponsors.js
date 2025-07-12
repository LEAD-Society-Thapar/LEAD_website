// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing theme toggle...'); // Debug log

// 3D Tilt Effect for Cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseenter', () => {
        card.classList.add('wobble-3d');
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.classList.remove('wobble-3d');
    });
});

// Theme toggle functionality for navbar
const toggleButton = document.getElementById('themeToggle');
const iconSpan = document.getElementById('themeIcon');
const toggleButtonMobile = document.getElementById('themeToggleMobile');
const iconSpanMobile = document.getElementById('themeIconMobile');
const logoImg = document.getElementById('logo');

const sunIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24"
       viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21
               m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12
               a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
  </svg>`;

const moonIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24"
       viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M21 12.79A9 9 0 0 1 11.21 3a7.5 7.5 0 1 0 9.79 9.79Z" />
  </svg>`;

function setThemeIcons(isLight) {
  if (iconSpan) iconSpan.innerHTML = isLight ? moonIcon : sunIcon;
  if (iconSpanMobile) iconSpanMobile.innerHTML = isLight ? moonIcon : sunIcon;
}

function applyTheme(isLight) {
  if (isLight) {
    document.body.classList.add('light-theme');
    if (logoImg) logoImg.src = 'LEAD_black.png';
  } else {
    document.body.classList.remove('light-theme');
    if (logoImg) logoImg.src = 'LEAD_white.png';
  }
  setThemeIcons(isLight);
}

function toggleTheme() {
  console.log('Toggle theme clicked!'); // Debug log
  const isLight = !document.body.classList.contains('light-theme');
  console.log('Current theme is light:', isLight); // Debug log
  applyTheme(isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

if (toggleButton) {
  console.log('Toggle button found:', toggleButton); // Debug log
  toggleButton.addEventListener('click', toggleTheme);
} else {
  console.log('Toggle button not found!'); // Debug log
}

if (toggleButtonMobile) {
  console.log('Mobile toggle button found:', toggleButtonMobile); // Debug log
  toggleButtonMobile.addEventListener('click', toggleTheme);
} else {
  console.log('Mobile toggle button not found!'); // Debug log
}

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  applyTheme(true);
} else {
  applyTheme(false);
}

// Set initial theme icons
setThemeIcons(document.body.classList.contains('light-theme'));

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger-active');
        navLinks.classList.toggle('nav-active');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('hamburger-active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('hamburger-active');
        }
    });
}


}); // Close DOMContentLoaded function
