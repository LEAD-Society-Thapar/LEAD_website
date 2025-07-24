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

// Infinite loop carousel setup
// 1. Add a duplicate of the last real card at the start
// 2. Add a duplicate of the first real card at the end
const realCards = [
  {
    title: "ESC NEXUS",
    src: "images/IMG-20250718-WA0010.jpg",
    description: "MATRIX 3.0 began with ESC_NEXUS — a fast-paced coding showdown of DSA challenges, testing logic, speed, and teamwork.",
    gallery: [
      "images/IMG-20250718-WA0011.jpg",
      "images/IMG-20250718-WA0014.jpg",
      "images/IMG-20250718-WA0013.jpg",
      "images/Screenshot 2025-07-18 235021.png",
    ]
  },
  {
    title: "CASH OR CLASH",
    src: "images/Screenshot 2025-07-18 234144.png",
    description: "CASH OR CLASH was LEAD’s intense mind-game marathon of strategy, twists, and survival of the sharpest.",
    gallery: [
      "images/IMG-20250718-WA0006.jpg",
      "images/IMG-20250718-WA0007.jpg",
      "images/IMG-20250718-WA0009.jpg",
      "images/IMG-20250718-WA0008.jpg",
    ]
  },
  {
    title: "ERROR 404",
    src: "  images/Screenshot 2025-07-18 235656.png",
    description: "ERROR_404 was LEAD’s MATRIX finale—an intense CTF clash of ciphers, speed, and fearless teamwork.",
    gallery: [
      "images/_storage_emulated_0_DCIM_Camera_IMG_20250202_192345.jpg",
      "images/20250202_185200.jpg",
      "images/Photo from Kavya (1).jpg",
      "images/Photo from Kavya.jpg"
    ]
  },
  {
    title: "VORTEX",
    src: " images/IMG-20250718-WA0015.jpg",
    description: "VORTEX was LEAD’s Stranger Things-themed event with clue hunts, web design, puzzles, and creative challenges.",
    gallery: [
      "images/IMG-20250718-WA0017.jpg",
      "images/IMG-20250718-WA0018.jpg",
      "images/IMG-20250718-WA0000.jpg",
      "images/IMG-20250718-WA0016.jpg"
    ]
  },
  {
    title: "WEBINAR",
    src: "images/1752342777955.jpg",
    description: "LEAD hosted a hands-on IoT session with alumnus Angad Singh, offering practical insights and Arduino-based learning for real-world applications."
,
    gallery: [
      "images/1752342777682.jpg",
      "images/1752342778924.jpg",
      "images/1752342777682.jpg",
      
    ]
  },
  {
    title: "Charcha-ae-Celebal",
    src: "images/cw1.jpg",
    description: "Charcha-ae-Celebal was an engaging session led by Moksh Sharma, offering students real-world tech insights, interactive learning, and career guidance.",
    gallery: [
      "images/w1.jpg",
      "images/w2.jpg",
      "images/w3.jpg",
      "images/w4.jpg",
    ]
  }
];

const slideData = [
  realCards[realCards.length - 1], 
  ...realCards,
  realCards[0] 
];




const slidesContainer = document.getElementById('slidesContainer'),
      prevBtn = document.getElementById('prevBtn'),
      nextBtn = document.getElementById('nextBtn');

let current = 1; // Start at the first real card (ESC NEXUS)
let autoSlide = null; // Declare at top-level for main carousel

function startAutoSlide() {
  if (autoSlide) clearInterval(autoSlide);
  autoSlide = setInterval(autoAdvance, 5000);
}

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
  const updateBlurBg = (index) => {
    const img = galleryImgs[index];
    if (img) {
      carousel.style.setProperty('--gallery-blur-bg', `url('${img.src}')`);
    }
  };

  const scrollToImage = (index) => {
    const img = carousel.querySelectorAll('img')[index];
    if (img) {
      carousel.scrollTo({
        left: img.offsetLeft,
        behavior: 'smooth',
      });
      updateBlurBg(index);
    }
  };

  // Set initial blurred background
  updateBlurBg(currentIndex);

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
    updateBlurBg(currentIndex);

    dotsWrapper.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  };

  // === Scroll Arrows ===
  leftBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex === 0) {
      currentIndex = totalImages - 1;
    } else {
      currentIndex -= 1;
    }
    scrollToImage(currentIndex);
  });

  rightBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex === totalImages - 1) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
    scrollToImage(currentIndex);
  });

  // === Auto-scroll every 2 sec ===
  const startAutoScroll = () => {
    autoScroll = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalImages;
      scrollToImage(currentIndex);
    }, 1700);
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
  // After rendering, highlight the correct card
  setTimeout(() => {
    updateHighlight();
  }, 0);
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.card-face.front').forEach(card => {
    const img = card.querySelector('.card-top img');
    if (img) {
      card.style.setProperty('--event-bg-image', `url(${img.src})`);
    }
  });
});

gsap.registerPlugin(ScrollTrigger);

// Initial scale setup
// gsap.set(".card", { scale: 0.85 });
// gsap.set(".card.one", { scale: 1 });
// Only .card.highlighted should be bulged

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
startAutoSlide(); // Always start auto-scroll on page load

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
  } else {
    startAutoSlide();
  }
});

// Also, when unflipping all cards (e.g. on next/prev), resume autoSlide if needed
function unflipAllCards() {
  slidesContainer.querySelectorAll('.slide-inner').forEach(i => i.classList.remove('flipped'));
  startAutoSlide();
}

// Update prev/next button handlers to use unflipAllCards
prevBtn.addEventListener('click', () => {
  if (current <= 0) {
    current = slideData.length - 2;
    updateCarousel(); // use smooth transition
  } else {
    current -= 1;
    // If we land on the first duplicate, jump to the real last card
    if (current === 0) {
      current = slideData.length - 2;
      updateCarousel(); // use smooth transition
    } else {
      updateCarousel();
    }
  }
  updateHighlight();
  unflipAllCards();
  startAutoSlide();
});

nextBtn.addEventListener('click', () => {
  if (current >= slideData.length - 1) {
    current = 1;
    updateCarousel(); // use smooth transition
  } else {
    current += 1;
    // If we land on the last duplicate, jump to the real first card
    if (current === slideData.length - 1) {
      current = 1;
      updateCarousel(); // use smooth transition
    } else {
      updateCarousel();
    }
  }
  updateHighlight();
  unflipAllCards();
  startAutoSlide();
});

// Also update autoAdvance to never land on the first or last card
// autoSlide = setInterval(autoAdvance, 5000); // This line is now handled by startAutoSlide
function autoAdvance() {
  if (anyCardFlipped()) {
    clearInterval(autoSlide);
    autoSlide = null;
    return;
  }
  if (current < slideData.length - 2) {
    current += 1;
  } else {
    current = 1;
  }
  updateCarousel();
  updateHighlight();
}

slidesContainer.addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
  autoSlide = null;
});
slidesContainer.addEventListener('mouseleave', () => {
  if (!anyCardFlipped()) {
    startAutoSlide();
  }
});


function updateHighlight() {
  const allCards = slidesContainer.querySelectorAll('.card');
  allCards.forEach((card, i) => {
    // Only highlight if not the first or last card (helper duplicates)
    if (i === current && i !== 0 && i !== slideData.length - 1) {
      card.classList.add('highlighted');
      card.style.transform = 'scale(1)';
    } else {
      card.classList.remove('highlighted');
      card.style.transform = 'scale(0.85)';
    }
  });
}

function updateCarousel(jumpInstant) {
  const count = visibleCount();
  let shift;
  if (count === 1) {
    shift = -current * 100;
  } else {
    shift = -(100 / count) * (current - 1);
  }
  slidesContainer.style.transition = jumpInstant ? 'none' : 'transform 0.6s ease';
  slidesContainer.style.transform = `translateX(${shift}%)`;
  if (jumpInstant) {
    // Force reflow to apply the transition removal
    void slidesContainer.offsetWidth;
    slidesContainer.style.transition = '';
  }

  // Reset all card scales and remove highlight
  const allCards = slidesContainer.querySelectorAll('.card');
  allCards.forEach(card => {
    card.classList.remove('highlighted');
    card.style.transform = 'scale(0.85)';
  });

  // Highlight and scale the center card, but only if not first or last
  let centerIndex = current;
  if (count === 3) centerIndex = current + 1;
  if (centerIndex !== 0 && centerIndex !== slideData.length - 1) {
    const centerCard = allCards[centerIndex];
    if (centerCard) {
      centerCard.classList.add('highlighted');
      centerCard.style.transform = 'scale(1)';
    }
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

function slowScrollTo(element, target, duration = 800) { // duration in ms (e.g., 800ms for slow)
  const start = element.scrollLeft;
  const change = target - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-in-out for smoothness
    const ease = 0.5 - 0.5 * Math.cos(Math.PI * progress);
    element.scrollLeft = start + change * ease;
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  requestAnimationFrame(animateScroll);
}

const carousel = document.querySelector('.image-carousel');
document.querySelector('.scroll-arrow.right').onclick = () => {
  slowScrollTo(carousel, carousel.scrollLeft + carousel.offsetWidth, 800); // 800ms = slow
};
document.querySelector('.scroll-arrow.left').onclick = () => {
  slowScrollTo(carousel, carousel.scrollLeft - carousel.offsetWidth, 800);
};
