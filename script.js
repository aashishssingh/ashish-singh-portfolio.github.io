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
