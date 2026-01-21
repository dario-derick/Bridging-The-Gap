document.addEventListener("DOMContentLoaded", function () {
  // --- Header Scroll Effect ---
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll("section");
  const navA = document.querySelectorAll("nav .nav-links a");
  window.addEventListener("scroll", () => {
    let current = "home";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 75) {
        current = section.getAttribute("id");
      }
    });

    navA.forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("href") == "#" + current) {
        a.classList.add("active");
      }
    });
  });

  // --- Testimonial Slider ---
  const slides = document.querySelector(".testimonial-slides");
  if (slides) {
    const slideItems = document.querySelectorAll(".testimonial-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let currentIndex = 0;

    function goToSlide(index) {
      slides.style.transform = "translateX(" + -100 * index + "%)";
      currentIndex = index;
    }

    nextBtn.addEventListener("click", () => {
      let newIndex = currentIndex + 1;
      if (newIndex > slideItems.length - 1) newIndex = 0;
      goToSlide(newIndex);
    });

    prevBtn.addEventListener("click", () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = slideItems.length - 1;
      goToSlide(newIndex);
    });
  }

  // --- Donation Amount Selector ---
  const amountBtns = document.querySelectorAll(".amount-btn");
  amountBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      amountBtns.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });

  // --- Fade-in Sections on Scroll ---
  const faders = document.querySelectorAll(".fade-in-section");
  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };
  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      appearOnScroll.unobserve(entry.target);
    });
  },
  appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});

(function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (!hamburger || !navLinks) return; // safety

  hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("active");
    document.body.classList.toggle("no-scroll", !expanded);
  });

  // Close on link click
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    });
  });
})();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Sticky header on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

////about.js
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("teamTrack");
  const cards = document.querySelectorAll(".team-card");
  let cardWidth = cards[0].offsetWidth + 30; // width + margin
  let currentPosition = 0;
  let animationId;
  let isPaused = false;

  // Clone first few cards and append to end for infinite loop
  const firstCard = cards[0].cloneNode(true);
  const secondCard = cards[1].cloneNode(true);
  track.appendChild(firstCard);
  track.appendChild(secondCard);

  // Handle window resize
  function handleResize() {
    cardWidth = cards[0].offsetWidth + 30;
  }

  window.addEventListener("resize", handleResize);

  // Auto-slide function
  function autoSlide() {
    if (isPaused) return;

    currentPosition -= 1; // Slow continuous movement

    // If we've scrolled past all original cards, reset position
    if (currentPosition < -(cards.length * cardWidth)) {
      currentPosition = 0;
      track.style.transition = "none";
      track.style.transform = `translateX(${currentPosition}px)`;
      // Force reflow
      void track.offsetWidth;
      track.style.transition = "transform 0.5s ease";
    }

    track.style.transform = `translateX(${currentPosition}px)`;
    animationId = requestAnimationFrame(autoSlide);
  }

  // Pause on hover
  track.addEventListener("mouseenter", function () {
    isPaused = true;
    track.style.transition = "transform 0.3s ease";
  });

  track.addEventListener("mouseleave", function () {
    isPaused = false;
    animationId = requestAnimationFrame(autoSlide);
  });

  // Touch events for mobile
  let touchStartX = 0;

  track.addEventListener(
    "touchstart",
    function (e) {
      isPaused = true;
      touchStartX = e.touches[0].clientX;
      track.style.transition = "transform 0.3s ease";
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    function (e) {
      isPaused = false;
      animationId = requestAnimationFrame(autoSlide);
    },
    { passive: true }
  );

  // Start the animation
  autoSlide();

  // Clean up on page exit
  window.addEventListener("beforeunload", function () {
    cancelAnimationFrame(animationId);
  });
});

//disabled right clicked

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  alert("Right-click is disabled on this page.");
});

///loader
// Simulate loading progress
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".bgm-loader");
  const progressBar = document.querySelector(".progress");
  const websiteContent = document.querySelector(".website-content");

  // Simulate loading (replace with actual loading logic)
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    progressBar.style.width = `${Math.min(progress, 100)}%`;

    if (progress >= 100) {
      clearInterval(interval);

      // Add fade out animation
      loader.style.transition = "opacity 0.5s ease";
      loader.style.opacity = "0";

      // Show website content after loader fades
      setTimeout(() => {
        loader.style.display = "none";
        websiteContent.style.display = "block";
        websiteContent.style.animation = "fadeIn 1s ease";
      }, 500);
    }
  }, 300);

document.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    });
});

