// === HOMEPAGE NAVBAR LOGIC START ===
const toggleButton = document.getElementById('themeToggle');
const iconSpan = document.getElementById('themeIcon');
const toggleButtonMobile = document.getElementById('themeToggleMobile');
const iconSpanMobile = document.getElementById('themeIconMobile');
const logoImg = document.getElementById('logo');
const hamburgerBtn = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');

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
    if (logoImg) logoImg.src = 'Images/LEAD_black.png';
  } else {
    document.body.classList.remove('light-theme');
    if (logoImg) logoImg.src = 'Images/Leadlogo.png';
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

if (hamburgerBtn && navLinksMenu) {
  hamburgerBtn.addEventListener('click', () => {
    navLinksMenu.classList.toggle('nav-active');
    hamburgerBtn.classList.toggle('hamburger-active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksMenu.classList.remove('nav-active');
      hamburgerBtn.classList.remove('hamburger-active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!hamburgerBtn.contains(e.target) && !navLinksMenu.contains(e.target)) {
      navLinksMenu.classList.remove('nav-active');
      hamburgerBtn.classList.remove('hamburger-active');
    }
  });
}
// === HOMEPAGE NAVBAR LOGIC END ===

const slideData = [
  {
    title: "Makkah Gathering",
    src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop",
    description: "A spiritual and peaceful gathering in Makkah city, filled with blessings and serenity.",
    gallery: [
      "https://images.unsplash.com/photo-1581320545532-9976a2ab1d66?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1587502537745-8a2dfc1d4f4c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1602526207925-9aa1573fa36e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1603574670812-03859dca3e42?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    title: "Jeddah Corniche",
    src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop",
    description: "A vibrant evening along the Red Sea with scenic views and modern architecture.",
    gallery: [
      "https://images.unsplash.com/photo-1616531770196-1a642c404cc3?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1534237710431-e2fc698436b9?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9891deff6?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    title: "Riyadh Cityscape",
    src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop",
    description: "The heart of Saudi Arabia with tall skyscrapers and an exciting urban atmosphere.",
    gallery: [
      "https://images.unsplash.com/photo-1520681185598-fc299e6c1df4?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1558002038-daf7aaae4d8b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1559648485-6fd0bca89843?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    title: "Desert Bloom",
    src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c",
    description: "A magical desert transformed by rare rains into a field of colorful wildflowers.",
    gallery: [
      "https://images.unsplash.com/photo-1580740561925-e7128f34c696?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1605379399642-01c0edbe28dc?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1605540704902-2672cc5c9f53?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1633279862046-d6046deec891?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    title: "Ocean Festival",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "An energetic celebration by the sea with music, food, and ocean-themed decorations.",
    gallery: [
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1504609813445-cb293fcd7745?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1582213782179-3749e6cb6ac7?auto=format&fit=crop&w=400&q=80"
    ]
  }
];




const slidesContainer = document.getElementById('slidesContainer'),
      prevBtn = document.getElementById('prevBtn'),
      nextBtn = document.getElementById('nextBtn');

let current = 0;

function visibleCount() {
  return window.innerWidth <= 768 ? 1 : 3;
}

function maxIndex() {
  return slideData.length - 1; // so we can center the last card
}

function renderSlides() {
  slidesContainer.innerHTML = '';
  slideData.forEach((s, i) => {
  const slide = document.createElement('div');
  slide.className = `card slide ${['one', 'two', 'three', 'four', 'five'][i] || ''}`;
  slide.innerHTML = `
    <div class="slide-inner">
      <div class="card-face front">
        <div class="card-top">
          <img src="${s.src}" alt="${s.title}" />
        </div>
        <div class="event-name">${s.title}</div>
      </div>
      <div class="card-face back">
        <div class="card-back-top">
          <button class="scroll-arrow left">‹</button>
          <div class="image-carousel">
            ${s.gallery.map(img => `<img src="${img}" alt="Gallery image" />`).join('')}
          </div>
          <button class="scroll-arrow right">›</button>
        </div>
        <div class="card-back-bottom">
          <h3>${s.title}</h3>
          <p>${s.description}</p>
        </div>
      </div>
    </div>
  `;

  slidesContainer.appendChild(slide);

  // Delay to allow slide to mount before querying DOM
  setTimeout(() => {
  const back = slide.querySelector('.card-face.back');
  if (!back) return;

  const carousel = back.querySelector('.image-carousel');
  const leftBtn = back.querySelector('.scroll-arrow.left');
  const rightBtn = back.querySelector('.scroll-arrow.right');

  const galleryImgs = Array.from(carousel.querySelectorAll('img'));
  const totalImages = galleryImgs.length;

  let currentIndex = 0;
  let autoScroll;

  // === Scroll-to-index helper ===
  const scrollToImage = (index) => {
    carousel.scrollTo({
      left: carousel.clientWidth * index,
      behavior: 'smooth',
    });
  };

  // === Dots ===
  const dotsWrapper = document.createElement('div');
  dotsWrapper.className = 'carousel-dots';
  back.appendChild(dotsWrapper);

  galleryImgs.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = index;
      scrollToImage(currentIndex);
    });
    dotsWrapper.appendChild(dot);
  });

  const updateActiveDot = () => {
    const width = carousel.clientWidth;
    const scrollLeft = carousel.scrollLeft;
    const index = Math.round(scrollLeft / width);
    currentIndex = index;

    dotsWrapper.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  };

  // === Scroll Arrows ===
  leftBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = Math.max(currentIndex - 1, 0);
    scrollToImage(currentIndex);
  });

  rightBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = Math.min(currentIndex + 1, totalImages - 1);
    scrollToImage(currentIndex);
  });

  // === Auto-scroll every 2 sec ===
  const startAutoScroll = () => {
    autoScroll = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalImages;
      scrollToImage(currentIndex);
    }, 2000);
  };

  const stopAutoScroll = () => clearInterval(autoScroll);

  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', startAutoScroll);
  carousel.addEventListener('scroll', updateActiveDot);

  // === Swipe Support ===
  let startX = 0;
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50) {
      e.stopPropagation();
      if (deltaX < 0) {
        currentIndex = Math.min(currentIndex + 1, totalImages - 1);
      } else {
        currentIndex = Math.max(currentIndex - 1, 0);
      }
      scrollToImage(currentIndex);
    }
  });

  // Start auto-slide
  startAutoScroll();
}, 0);
  })
}


gsap.registerPlugin(ScrollTrigger);

// Initial scale setup
gsap.set(".card", { scale: 0.85 });
gsap.set(".card.one", { scale: 1 });

const tl = gsap.timeline({ defaults: { duration: 1, ease: "none" } }).pause();

tl.addLabel("start")
  .to(".card.one", { scale: 0.85, duration: 0.85 })
  .to(".card.two", { scale: 1, duration: 0.85 }, ">-0.85")
  .addLabel("two")
  .to(".card.two", { scale: 0.85, duration: 0.85 })
  .to(".card.three", { scale: 1, duration: 0.85 }, ">-0.85")
  .addLabel("three")
  .to(".card.three", { scale: 0.85, duration: 0.85 })
  .to(".card.four", { scale: 1, duration: 0.85 }, ">-0.85")
  .addLabel("four")
  .to(".card.four", { scale: 0.85, duration: 0.85 })
  .to(".card.five", { scale: 1, duration: 0.85 }, ">-0.85")
  .addLabel("end");

const scroller = document.querySelector(".carousel-wrapper");

const trigger = ScrollTrigger.create({
  scroller: scroller,
  horizontal: true,
  start: 0,
  end: () => `+=${ScrollTrigger.maxScroll(scroller, true)}`,
  scrub: true,
  animation: tl,
  snap: {
    snapTo: "labels",
    duration: { min: 0.1, max: 0.2 }
  }
});

// Maintain scroll position on refresh
let progress = 0;
ScrollTrigger.addEventListener("refreshInit", () => {
  progress = trigger.progress;
});
ScrollTrigger.addEventListener("refresh", () => {
  trigger.scroll(progress * ScrollTrigger.maxScroll(scroller, true));
});


renderSlides();

// Helper to check if any card is flipped
function anyCardFlipped() {
  return Array.from(document.querySelectorAll('.slide-inner')).some(i => i.classList.contains('flipped'));
}

// Update the click handler to pause/resume autoSlide
slidesContainer.addEventListener('click', e => {
  const clickedCard = e.target.closest('.card');
  if (!clickedCard) return;

  const inner = clickedCard.querySelector('.slide-inner');

  // Prevent flip if scroll arrow was clicked
  if (e.target.closest('.scroll-arrow')) return;

  // Remove .flipped from all cards except the clicked one
  slidesContainer.querySelectorAll('.slide-inner').forEach(i => {
    if (i !== inner) i.classList.remove('flipped');
  });
  // Toggle .flipped on the clicked card
  inner.classList.toggle('flipped');

  // Pause autoSlide if any card is flipped, resume if none are flipped
  if (anyCardFlipped()) {
    clearInterval(autoSlide);
    autoSlide = null;
  } else if (!autoSlide) {
    autoSlide = setInterval(autoAdvance, 5000);
  }
});

// Also, when unflipping all cards (e.g. on next/prev), resume autoSlide if needed
function unflipAllCards() {
  slidesContainer.querySelectorAll('.slide-inner').forEach(i => i.classList.remove('flipped'));
  if (!autoSlide) {
    autoSlide = setInterval(autoAdvance, 5000);
  }
}

// Update prev/next button handlers to use unflipAllCards
prevBtn.addEventListener('click', () => {
  if (current > -1) {
    current -= 1;
    updateCarousel();
    updateHighlight();
    unflipAllCards();
  }
});

nextBtn.addEventListener('click', () => {
  if (current < maxIndex() - 1) {
    current += 1;
    updateCarousel();
    updateHighlight();
    unflipAllCards();
  }
});

let autoSlide = setInterval(autoAdvance, 5000);

function autoAdvance() {
  if (anyCardFlipped()) {
    clearInterval(autoSlide);
    autoSlide = null;
    return;
  }
  if (current < maxIndex() - 1) {
    current += 1;
  } else {
    current = 0;
  }
  updateCarousel();
  updateHighlight();
}

slidesContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
slidesContainer.addEventListener('mouseleave', () => {
  if (!anyCardFlipped() && !autoSlide) {
    autoSlide = setInterval(autoAdvance, 5000);
  }
});


function updateHighlight() {
  slidesContainer.querySelectorAll('.card').forEach(c => c.classList.remove('highlighted'));

  const cards = Array.from(slidesContainer.querySelectorAll('.card'));
  const centerIndex = current + 1; // second card in 3-view layout
  if (cards[centerIndex]) {
    cards[centerIndex].classList.add('highlighted');
  }
}




function updateCarousel() {
  const shift = -(100 / visibleCount()) * current;
  slidesContainer.style.transform = `translateX(${shift}%)`;

  // Reset all card scales and remove highlight
  const allCards = slidesContainer.querySelectorAll('.card');
  allCards.forEach(card => {
    card.classList.remove('highlighted');
    // Instantly set scale without animation
    card.style.transform = 'scale(0.85)';
  });

  // Highlight and scale the center card
  const centerIndex = current + 1; // the 2nd visible card in a 3-card view
  const centerCard = allCards[centerIndex];
  if (centerCard) {
    centerCard.classList.add('highlighted');
    // Instantly set scale without animation
    centerCard.style.transform = 'scale(1)';
  }
}

// function updateCarousel() {
//   const shift = -(100 / visibleCount()) * current;
//   slidesContainer.style.transform = `translateX(${shift}%)`;
// }
// function updateCarousel() {
//   const shift = -(100 / visibleCount()) * current;
//   slidesContainer.style.transform = `translateX(${shift}%)`;
// }





function clearHighlight() {
  slidesContainer.querySelectorAll('.card').forEach(c => c.classList.remove('highlighted'));
}


window.addEventListener('resize', updateCarousel);
updateCarousel();

// Set delay index for animation
document.querySelectorAll('.leMagnify span').forEach((span, i) => {
  span.style.setProperty('--i', i);
});
// const themeToggle = document.getElementById('themeToggle'),
//       logo = document.getElementById('logo'),
//       icon = document.getElementById('themeIcon');

// themeToggle.addEventListener('click', () => {
//   const isLight = document.body.classList.toggle('light-theme');
//   icon.textContent = isLight ? '☀️' : '🌙';

//   // Switch logo based on theme
//   logo.src = isLight ? 'Images/logo-light.png' : 'Images/logo-dark.png';
// });

// Bouncing Bubbles Animation
(function() {
  const bubbles = document.querySelectorAll('.bubbles .bubble');
  const bubbleData = [];
  const vw = () => window.innerWidth;
  const vh = () => window.innerHeight;

  // Initialize bubbles
  bubbles.forEach(bubble => {
    let size = parseInt(bubble.style.width) || 40;
    let x = Math.random() * (vw() - size);
    let y = Math.random() * (vh() - size);
    let dx = (Math.random() - 0.5) * 1.2;
    let dy = (Math.random() - 0.5) * 1.2;
    bubble.style.left = x + 'px';
    bubble.style.top = y + 'px';
    bubble.style.position = 'absolute';
    bubbleData.push({bubble, x, y, dx, dy, size, mass: size * size});
  });

  function handleBubbleCollisions() {
    for (let i = 0; i < bubbleData.length; i++) {
      for (let j = i + 1; j < bubbleData.length; j++) {
        const a = bubbleData[i];
        const b = bubbleData[j];
        const dx = b.x + b.size/2 - (a.x + a.size/2);
        const dy = b.y + b.size/2 - (a.y + a.size/2);
        const dist = Math.sqrt(dx*dx + dy*dy);
        const minDist = (a.size + b.size) / 2;
        if (dist < minDist && dist > 0) {
          // Elastic collision response
          // Normal vector
          const nx = dx / dist;
          const ny = dy / dist;
          // Relative velocity
          const dvx = b.dx - a.dx;
          const dvy = b.dy - a.dy;
          // Velocity along normal
          const vn = dvx * nx + dvy * ny;
          if (vn < 0) { // Only resolve if moving towards each other
            // Conservation of momentum (1D along normal)
            const m1 = a.mass;
            const m2 = b.mass;
            const impulse = (2 * vn) / (m1 + m2);
            a.dx += impulse * m2 * nx;
            a.dy += impulse * m2 * ny;
            b.dx -= impulse * m1 * nx;
            b.dy -= impulse * m1 * ny;
          }
          // Separate overlapping bubbles
          const overlap = minDist - dist;
          const totalMass = a.mass + b.mass;
          a.x -= (overlap * (b.mass / totalMass)) * nx;
          a.y -= (overlap * (b.mass / totalMass)) * ny;
          b.x += (overlap * (a.mass / totalMass)) * nx;
          b.y += (overlap * (a.mass / totalMass)) * ny;
        }
      }
    }
  }

  function animate() {
    const width = vw();
    const height = vh();
    // Move bubbles
    bubbleData.forEach(data => {
      data.x += data.dx;
      data.y += data.dy;
      // Bounce on borders
      if (data.x <= 0) {
        data.x = 0;
        data.dx *= -1;
      } else if (data.x + data.size >= width) {
        data.x = width - data.size;
        data.dx *= -1;
      }
      if (data.y <= 0) {
        data.y = 0;
        data.dy *= -1;
      } else if (data.y + data.size >= height) {
        data.y = height - data.size;
        data.dy *= -1;
      }
    });
    // Handle collisions
    handleBubbleCollisions();
    // Render
    bubbleData.forEach(data => {
      data.bubble.style.left = data.x + 'px';
      data.bubble.style.top = data.y + 'px';
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    const width = vw();
    const height = vh();
    bubbleData.forEach(data => {
      if (data.x + data.size > width) data.x = width - data.size;
      if (data.y + data.size > height) data.y = height - data.size;
    });
  });
})();