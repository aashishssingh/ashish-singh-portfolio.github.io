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

const setupCourseAnimations = () => {
  const cards = document.querySelectorAll(".course-card");

  if (!cards.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  cards.forEach((card) => {
    const summary = card.querySelector("summary");

    if (!summary) return;

    // Wrap everything after the summary so we can animate its height.
    const reveal = document.createElement("div");
    reveal.className = "course-reveal";
    while (summary.nextSibling) {
      reveal.appendChild(summary.nextSibling);
    }
    card.appendChild(reveal);

    summary.addEventListener("click", (event) => {
      event.preventDefault();

      // Ignore clicks while a transition is mid-flight.
      if (card.dataset.animating) return;

      if (reduceMotion) {
        card.open = !card.open;
        return;
      }

      card.dataset.animating = "true";

      if (card.open) {
        reveal.style.height = `${reveal.scrollHeight}px`;
        reveal.offsetHeight; // force reflow so the next change animates
        requestAnimationFrame(() => {
          reveal.style.height = "0px";
        });
        reveal.addEventListener(
          "transitionend",
          () => {
            card.open = false;
            reveal.style.height = "";
            delete card.dataset.animating;
          },
          { once: true }
        );
      } else {
        card.open = true;
        const target = reveal.scrollHeight;
        reveal.style.height = "0px";
        reveal.offsetHeight; // force reflow
        requestAnimationFrame(() => {
          reveal.style.height = `${target}px`;
        });
        reveal.addEventListener(
          "transitionend",
          () => {
            reveal.style.height = "";
            delete card.dataset.animating;
          },
          { once: true }
        );
      }
    });
  });
};

setupCourseAnimations();
