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
  const prevButton = document.querySelector("#prev-slide");
  const nextButton = document.querySelector("#next-slide");
  const slideBase = slideStage.dataset.slideBase;
  const slideCount = Number(slideStage.dataset.slideCount);
  let activeSlide = 1;

  totalSlides.textContent = String(slideCount);

  const updateSlide = () => {
    const slideNumber = String(activeSlide).padStart(3, "0");
    slideImage.src = `${slideBase}${slideNumber}.png`;
    slideImage.alt = `Civic Engagement Programming Survey slide ${activeSlide}`;
    currentSlide.textContent = String(activeSlide);
    prevButton.disabled = activeSlide === 1;
    nextButton.disabled = activeSlide === slideCount;
  };

  prevButton.addEventListener("click", () => {
    activeSlide = Math.max(1, activeSlide - 1);
    updateSlide();
  });

  nextButton.addEventListener("click", () => {
    activeSlide = Math.min(slideCount, activeSlide + 1);
    updateSlide();
  });

  updateSlide();
};

setupSlideViewer();
