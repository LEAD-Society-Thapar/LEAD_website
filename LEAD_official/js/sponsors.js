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

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  setThemeIcons(isLight);
  if (logoImg) logoImg.src = isLight ? 'images/LEAD_black.png' : 'images/Leadlogo.png';
}

if (toggleButton) toggleButton.addEventListener('click', toggleTheme);
if (toggleButtonMobile) toggleButtonMobile.addEventListener('click', toggleTheme);

setThemeIcons(document.body.classList.contains('light-theme'));

// Set initial logo based on theme
if (logoImg) logoImg.src = document.body.classList.contains('light-theme') ? 'images/LEAD_black.png' : 'images/Leadlogo.png';

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger-active');
        navLinks.classList.toggle('nav-active');
    });
}

// === Money Rain Effect ===
const moneyRainContainer = document.getElementById('money-rain');
const moneySymbols = ['💵', '💸', '🪙'];
function spawnMoney() {
  const el = document.createElement('span');
  el.className = 'money';
  el.textContent = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];
  el.style.left = Math.random() * 98 + 'vw';
  el.style.fontSize = (1.8 + Math.random() * 1.8) + 'rem';
  el.style.animationDuration = (2.8 + Math.random() * 2.5) + 's';
  el.style.transform = `rotateZ(${Math.random() * 360}deg)`;

  // Calculate the fall distance: total scrollable height + some buffer
  const docHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  // Start position is -10vh, so add a bit more to ensure it falls past the bottom
  const fallDistance = docHeight + window.innerHeight * 0.1;
  el.style.setProperty('--fall-distance', `${fallDistance}px`);

  moneyRainContainer.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}
setInterval(spawnMoney, 320);
