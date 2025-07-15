// Enhanced 3D Card Effects with Holographic Animations, Upward Parallax, and Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Functionality
  const toggleButton = document.getElementById("themeToggle")
  const iconSpan = document.getElementById("themeIcon")
  const toggleButtonMobile = document.getElementById("themeToggleMobile")
  const iconSpanMobile = document.getElementById("themeIconMobile")
  const logoImg = document.getElementById("logo")
  const hamburger = document.getElementById("hamburger")
  const navLinks = document.getElementById("navLinks")

  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24"
         viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21
                 m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12
                 a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
    </svg>`

  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24"
         viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 12.79A9 9 0 0 1 11.21 3a7.5 7.5 0 1 0 9.79 9.79Z" />
    </svg>`

  function setThemeIcons(isLight) {
    if (iconSpan) iconSpan.innerHTML = isLight ? moonIcon : sunIcon
    if (iconSpanMobile) iconSpanMobile.innerHTML = isLight ? moonIcon : sunIcon
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


  // Set initial theme icons
  setThemeIcons(document.body.classList.contains("light-theme"))

  // Mobile menu functionality
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active")
      hamburger.classList.toggle("hamburger-active")
    })

    // Close mobile menu when clicking on nav links
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-active")
        hamburger.classList.remove("hamburger-active")
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("nav-active")
        hamburger.classList.remove("hamburger-active")
      }
    })
  }

  // Animation configuration
  const ANIMATION_CONFIG = {
    SMOOTH_DURATION: 600,
    INITIAL_DURATION: 1500,
    INITIAL_X_OFFSET: 70,
    INITIAL_Y_OFFSET: 60,
  }

  // Utility functions
  const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max)
  const round = (value, precision = 3) => Number.parseFloat(value.toFixed(precision))
  const adjust = (value, fromMin, fromMax, toMin, toMax) =>
    round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin))
  const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

  // Enhanced card transform function with true 3D
  const updateCardTransform = (offsetX, offsetY, card, wrap) => {
    const width = card.clientWidth
    const height = card.clientHeight
    const percentX = clamp((100 / width) * offsetX)
    const percentY = clamp((100 / height) * offsetY)
    const centerX = percentX - 50
    const centerY = percentY - 50

    // Enhanced 3D rotation calculations
    const rotateX = round(-(centerX / 3)) // More pronounced rotation
    const rotateY = round(centerY / 2.5) // More pronounced rotation
    const translateZ = Math.abs(centerX) + Math.abs(centerY) // Dynamic Z translation

    const properties = {
      "--pointer-x": `${percentX}%`,
      "--pointer-y": `${percentY}%`,
      "--background-x": `${adjust(percentX, 0, 100, 30, 70)}%`,
      "--background-y": `${adjust(percentY, 0, 100, 30, 70)}%`,
      "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
      "--pointer-from-top": `${percentY / 100}`,
      "--pointer-from-left": `${percentX / 100}`,
      "--rotate-x": `${rotateX}deg`,
      "--rotate-y": `${rotateY}deg`,
      "--translate-z": `${translateZ}px`,
    }

    Object.entries(properties).forEach(([property, value]) => {
      wrap.style.setProperty(property, value)
    })
  }

  // Smooth animation function
  const createSmoothAnimation = (duration, startX, startY, card, wrap) => {
    const startTime = performance.now()
    const targetX = wrap.clientWidth / 2
    const targetY = wrap.clientHeight / 2
    let rafId

    const animationLoop = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = clamp(elapsed / duration)
      const easedProgress = easeInOutCubic(progress)
      const currentX = adjust(easedProgress, 0, 1, startX, targetX)
      const currentY = adjust(easedProgress, 0, 1, startY, targetY)

      updateCardTransform(currentX, currentY, card, wrap)

      if (progress < 1) {
        rafId = requestAnimationFrame(animationLoop)
      }
    }

    rafId = requestAnimationFrame(animationLoop)
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }
  }

  // Initialize executive cards with 3D effects
  const initializeExecutiveCards = () => {
    const executiveCards = document.querySelectorAll(".executive-card")

    executiveCards.forEach((cardWrapper, index) => {
      const card = cardWrapper.querySelector(".card-inner")
      if (!card) return

      let cancelAnimation = null

      // Staggered animation delay
      cardWrapper.style.animationDelay = `${index * 150}ms`

      const handlePointerMove = (event) => {
        if (!card || !cardWrapper) return
        const rect = card.getBoundingClientRect()
        updateCardTransform(event.clientX - rect.left, event.clientY - rect.top, card, cardWrapper)
      }

      const handlePointerEnter = () => {
        if (cancelAnimation) cancelAnimation()
        cardWrapper.classList.add("active")
        card.classList.add("active")
      }

      const handlePointerLeave = (event) => {
        const rect = card.getBoundingClientRect()
        const offsetX = event.clientX - rect.left
        const offsetY = event.clientY - rect.top

        cancelAnimation = createSmoothAnimation(ANIMATION_CONFIG.SMOOTH_DURATION, offsetX, offsetY, card, cardWrapper)

        cardWrapper.classList.remove("active")
        card.classList.remove("active")
      }

      // Add event listeners
      card.addEventListener("pointerenter", handlePointerEnter)
      card.addEventListener("pointermove", handlePointerMove)
      card.addEventListener("pointerleave", handlePointerLeave)

      // Initial animation
      const initialX = cardWrapper.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET
      const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET

      updateCardTransform(initialX, initialY, card, cardWrapper)
      cancelAnimation = createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, initialX, initialY, card, cardWrapper)
    })
  }

  // Initialize department cards with hover effects
  const initializeDepartmentCards = () => {
    const departmentCards = document.querySelectorAll(".department-card")

    departmentCards.forEach((card, index) => {
      // Staggered animation delay
      card.style.animationDelay = `${index * 100}ms`
      card.classList.add("animate-in")

      // Add hover sound effect (optional)
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px) scale(1.02)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)"
      })
    })
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe all cards for scroll animations
  const allCards = document.querySelectorAll(".executive-card, .department-card")
  allCards.forEach((card) => {
    observer.observe(card)
  })

  // Enhanced hover effects for tagline words
  const taglineWords = document.querySelectorAll(".tagline-word")
  taglineWords.forEach((word) => {
    word.addEventListener("mouseenter", () => {
      word.style.backgroundSize = "200% 200%"
      word.style.animation = "gradientShift 2s ease infinite"
    })

    word.addEventListener("mouseleave", () => {
      word.style.animation = ""
      word.style.backgroundSize = ""
    })
  })

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Enhanced Parallax effect - Elements move UP when scrolling DOWN
  let ticking = false

  function updateParallax() {
    const scrolled = window.pageYOffset

    // Background orbs parallax
    const parallaxElements = document.querySelectorAll(".gradient-orb")
    parallaxElements.forEach((element, index) => {
      const speed = 0.3 + index * 0.1
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })

    // Enhanced shapes parallax - move UP when scrolling DOWN
    const shapes = document.querySelectorAll(".shape")
    shapes.forEach((shape, index) => {
      const speed = 0.8 + (index % 3) * 0.2 // Varying speeds for different shapes
      const yPos = -(scrolled * speed) // Negative value makes them move UP
      const rotation = scrolled * 0.1 + index * 45 // Add rotation based on scroll

      // Different movement patterns for different shape types
      if (shape.classList.contains("shape-square")) {
        shape.style.transform = `translateY(${yPos}px) rotate(${45 + rotation}deg) scale(${1 + Math.sin(scrolled * 0.01) * 0.1})`
      } else if (shape.classList.contains("shape-diamond")) {
        shape.style.transform = `translateY(${yPos}px) rotate(${45 + rotation * 1.5}deg)`
      } else if (shape.classList.contains("shape-triangle")) {
        // Triangles have different transform origin
        shape.style.transform = `translateY(${yPos}px) rotate(${rotation * 0.5}deg)`
      } else if (shape.classList.contains("shape-star")) {
        shape.style.transform = `translateY(${yPos}px) rotate(${35 + rotation * 2}deg) scale(${1 + Math.cos(scrolled * 0.008) * 0.15})`
      } else if (shape.classList.contains("shape-hexagon")) {
        shape.style.transform = `translateY(${yPos}px) scale(${1 + Math.sin(scrolled * 0.005) * 0.2})`
      } else {
        // Default for circles
        shape.style.transform = `translateY(${yPos}px) scale(${1 + Math.sin(scrolled * 0.006 + index) * 0.1})`
      }

      // Add parallax class for CSS transitions
      shape.classList.add("parallax-up")
    })

    ticking = false
  }

  function requestParallaxUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  }

  window.addEventListener("scroll", requestParallaxUpdate)

  // Enhanced shape interactions
  const shapes = document.querySelectorAll(".shape")
  shapes.forEach((shape, index) => {
    // Mouse enter effect
    shape.addEventListener("mouseenter", function () {
      this.style.transform = `${this.style.transform} scale(1.4)`
      this.style.opacity = "0.9"
      this.style.zIndex = "10"
    })

    // Mouse leave effect
    shape.addEventListener("mouseleave", function () {
      this.style.transform = this.style.transform.replace(" scale(1.4)", "")
      this.style.opacity = "0.7"
      this.style.zIndex = "1"
    })

    // Add random floating animation delays
    shape.style.animationDelay = `${index * 0.5}s`
  })

  // Performance optimization: Debounce resize events
  let resizeTimeout
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      // Recalculate any layout-dependent animations
      const cards = document.querySelectorAll(".executive-card")
      cards.forEach((card) => {
        card.style.transition = "none"
        setTimeout(() => {
          card.style.transition = ""
        }, 10)
      })
    }, 250)
  })

  // Button interactions
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary")
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Add click animation
      button.style.transform = "scale(0.95)"
      setTimeout(() => {
        button.style.transform = ""
      }, 150)

      // Add your button functionality here
      if (button.classList.contains("btn-primary")) {
        console.log("View Open Positions clicked")
        // Add your navigation logic here
      } else {
        console.log("Contact Our Team clicked")
        // Add your contact logic here
      }
    })
  })

  // Initialize all card effects
  initializeExecutiveCards()
  initializeDepartmentCards()

  // Add loading state management
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Trigger initial animations
    const heroElements = document.querySelectorAll(".hero-title, .hero-tagline, .hero-description")
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 200)
    })
  })

  // Initialize all elements as hidden for loading animation
  const animatedElements = document.querySelectorAll(".hero-title, .hero-tagline, .hero-description")
  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "all 0.6s ease"
  })

  // Add keyboard navigation support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      // Add focus styles for accessibility
      const focusableElements = document.querySelectorAll("a, button, [tabindex]:not([tabindex='-1'])")
      focusableElements.forEach((element) => {
        element.addEventListener("focus", () => {
          element.style.outline = "2px solid #8b5cf6"
          element.style.outlineOffset = "2px"
        })
        element.addEventListener("blur", () => {
          element.style.outline = ""
          element.style.outlineOffset = ""
        })
      })
    }
  })
})

// Export for potential external use
window.LEADTeamPage = {
  // Add utility functions as needed
  version: "2.0.0",
  initialized: true,
}
