// =========================
// MOBILE MENU
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("active");
  });
}

// =========================
// DESTINATIONS RENDER
// =========================

const featuredDestinationsContainer = document.querySelector(
  "#featured-destinations"
);

function renderFeaturedDestinations() {
  if (!featuredDestinationsContainer) return;

  const featuredDestinations = destinations.filter(
    (destination) => destination.featured
  );

  const groupedByCountry = featuredDestinations.reduce((groups, destination) => {
    const country = destination.country;

    if (!groups[country]) {
      groups[country] = [];
    }

    groups[country].push(destination);

    return groups;
  }, {});

  const sortedCountries = Object.keys(groupedByCountry).sort();

  featuredDestinationsContainer.innerHTML = sortedCountries
    .map((country) => {
      const countryDestinations = groupedByCountry[country];

      return `
        <div class="destination-group">
          <h3 class="destination-group-title">${country}</h3>

          <div class="card-grid">
            ${countryDestinations
              .map(
                (destination) => `
                  <a href="${destination.page}" class="card">
                    <img
                      src="${destination.coverImage}"
                      alt="${destination.city}"
                      loading="lazy"
                    />

                    <div class="card-content">
                      <h3>${destination.city}</h3>
                      <p>${destination.shortDescription}</p>
                    </div>
                  </a>
                `
              )
              .join("")}
          </div>
        </div>
      `;
    })
    .join("");
}

renderFeaturedDestinations();

// =========================
// LIGHTBOX
// =========================

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const lightboxCounter = document.querySelector(".lightbox-counter");

let galleryImages = [];
let currentImageIndex = 0;

function openLightbox(index) {
  currentImageIndex = index;

  const image = galleryImages[currentImageIndex];

  lightbox.classList.add("active");

  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;

  updateCounter();
}

function closeLightbox() {
  lightbox.classList.remove("active");
}

function showNextImage() {
  currentImageIndex++;

  if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }

  openLightbox(currentImageIndex);
}

function showPrevImage() {
  currentImageIndex--;

  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  }

  openLightbox(currentImageIndex);
}

function updateCounter() {
  lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

function setupLightbox() {
  const images = document.querySelectorAll(".gallery-item img");

  galleryImages = Array.from(images);

  galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      openLightbox(index);
    });
  });
}

setupLightbox();

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", showNextImage);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener("click", showPrevImage);
}

// Keyboard navigation

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNextImage();
  if (event.key === "ArrowLeft") showPrevImage();
});

// =========================
// MOBILE SWIPE
// =========================

let touchStartX = 0;
let touchEndX = 0;

if (lightbox) {
  lightbox.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;

    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) return;

    if (swipeDistance < 0) {
      showNextImage();
    } else {
      showPrevImage();
    }
  });
}

// =========================
// REVEAL ON SCROLL
// =========================

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < window.innerHeight - 100) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);