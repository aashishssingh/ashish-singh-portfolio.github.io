const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const currentPage = document.querySelector("main")?.dataset.page || "home";
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.classList.toggle("active", link.dataset.page === currentPage);

  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const setupSlideViewer = () => {
  const slideStage = document.querySelector(".slide-stage");

  if (!slideStage) return;

  const slideImage = document.querySelector("#presentation-slide");
  const currentSlide = document.querySelector("#current-slide");
  const totalSlides = document.querySelector("#total-slides");
  const firstButton = document.querySelector("#first-slide");
  const prevButton = document.querySelector("#prev-slide");
  const nextButton = document.querySelector("#next-slide");
  const lastButton = document.querySelector("#last-slide");
  const slideBase = slideStage.dataset.slideBase;
  const slideCount = Number(slideStage.dataset.slideCount);
  const slideVersion = slideStage.dataset.slideVersion;
  const slideTitle = slideStage.dataset.slideTitle || "Presentation";
  let activeSlide = 1;

  totalSlides.textContent = String(slideCount);

  const updateSlide = () => {
    const slideNumber = String(activeSlide).padStart(3, "0");
    slideImage.src = `${slideBase}${slideNumber}.png?v=${slideVersion}`;
    slideImage.alt = `${slideTitle} slide ${activeSlide}`;
    currentSlide.textContent = String(activeSlide);
    firstButton.disabled = activeSlide === 1;
    prevButton.disabled = activeSlide === 1;
    nextButton.disabled = activeSlide === slideCount;
    lastButton.disabled = activeSlide === slideCount;
  };

  firstButton.addEventListener("click", () => {
    activeSlide = 1;
    updateSlide();
  });

  prevButton.addEventListener("click", () => {
    activeSlide = Math.max(1, activeSlide - 1);
    updateSlide();
  });

  nextButton.addEventListener("click", () => {
    activeSlide = Math.min(slideCount, activeSlide + 1);
    updateSlide();
  });

  lastButton.addEventListener("click", () => {
    activeSlide = slideCount;
    updateSlide();
  });

  updateSlide();
};

setupSlideViewer();

// Animate the coursework dropdowns. Each card's content is wrapped so its
// height can be animated in CSS (grid-template-rows 0fr <-> 1fr). Opening
// just sets [open] and lets CSS animate. Closing is intercepted so the
// collapse transition runs first, then the card actually closes (otherwise
// the native <details> hides its content instantly and the close snaps shut).
// Cards are handled independently, so the two columns expand separately.
const setupCourseAnimations = () => {
  const cards = document.querySelectorAll(".course-card");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  cards.forEach((card) => {
    const summary = card.querySelector("summary");

    // Skip if there is no summary or the content is already wrapped.
    if (!summary || card.querySelector(".course-reveal")) return;

    const reveal = document.createElement("div");
    reveal.className = "course-reveal";

    const inner = document.createElement("div");
    inner.className = "course-reveal-inner";

    while (summary.nextSibling) {
      inner.appendChild(summary.nextSibling);
    }

    reveal.appendChild(inner);
    card.appendChild(reveal);

    summary.addEventListener("click", (event) => {
      if (reduceMotion) return; // let the native toggle happen instantly

      // Ignore clicks while a close animation is already running.
      if (card.classList.contains("is-collapsing")) {
        event.preventDefault();
        return;
      }

      event.preventDefault();

      if (card.open) {
        // Animate closed, then remove [open] once the transition finishes.
        card.classList.add("is-collapsing");
        reveal.addEventListener(
          "transitionend",
          () => {
            card.open = false;
            card.classList.remove("is-collapsing");
          },
          { once: true }
        );
      } else {
        // Open immediately; CSS animates 0fr -> 1fr.
        card.open = true;
      }
    });
  });
};

setupCourseAnimations();
