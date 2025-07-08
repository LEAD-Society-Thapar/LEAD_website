const toggleButton = document.getElementById('themeToggle');
const iconSpan = document.getElementById('themeIcon');
const toggleButtonMobile = document.getElementById('themeToggleMobile');
const iconSpanMobile = document.getElementById('themeIconMobile');
const logoImg = document.getElementById('logo');
const centrelogo = document.getElementById('centrelogo');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

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
    logoImg.src = 'Images/LEAD_black.png';
    const heroLogo = document.getElementById('heroLogo');
    if (heroLogo) heroLogo.src = 'Images/LEAD_black.png';
  } else {
    document.body.classList.remove('light-theme');
    logoImg.src = 'Images/Leadlogo.png';
    const heroLogo = document.getElementById('heroLogo');
    if (heroLogo) heroLogo.src = 'Images/Leadlogo.png';
  }
  setThemeIcons(isLight);
}

function toggleTheme() {
  const isLight = !document.body.classList.contains('light-theme');
  applyTheme(isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

if (toggleButton) toggleButton.addEventListener('click', toggleTheme);
if (toggleButtonMobile) toggleButtonMobile.addEventListener('click', toggleTheme);


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  applyTheme(true);
} else {
  applyTheme(false);
}


hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
  hamburger.classList.toggle('hamburger-active');
});


document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav-active');
    hamburger.classList.remove('hamburger-active');
  });
});


document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('nav-active');
    hamburger.classList.remove('hamburger-active');
  }
});

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
const aboutImage = entry.target.querySelector('.about-image');
const aboutContent = entry.target.querySelector('.about-content');

if (entry.isIntersecting) {
  if (aboutImage) aboutImage.classList.add('animate');
  if (aboutContent) aboutContent.classList.add('animate');
} else {
  if (aboutImage) aboutImage.classList.remove('animate');
  if (aboutContent) aboutContent.classList.remove('animate');
}
});
}, { threshold: 0.3 });

const aboutSection = document.querySelector('.about-us');
if (aboutSection) {
observer.observe(aboutSection);}