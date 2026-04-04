const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("active");
  });
}

const navLinks = document.querySelectorAll(".site-nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (siteNav) {
      siteNav.classList.remove("active");
    }
  });
});

const featuredDestinationsContainer = document.querySelector(
  "#featured-destinations"
);

const renderFeaturedDestinations = () => {
  if (
    !featuredDestinationsContainer ||
    typeof destinations === "undefined" ||
    !Array.isArray(destinations)
  ) {
    return;
  }

  const featuredDestinations = destinations.filter(
    (destination) => destination.featured
  );

  featuredDestinationsContainer.innerHTML = featuredDestinations
    .map((destination) => {
      return `
        <a href="${destination.page}" class="card destination-card-link">
          <img
            src="${destination.coverImage}"
            alt="${destination.city}, ${destination.country}"
          />
          <div class="card-content">
            <h3>${destination.city}</h3>
            <p>${destination.shortDescription}</p>
          </div>
        </a>
      `;
    })
    .join("");
};

renderFeaturedDestinations();

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

const setupLightbox = () => {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const image = item.querySelector("img");

      if (!image || !lightbox || !lightboxImg) return;

      lightbox.classList.add("active");
      lightboxImg.src = image.src;
      lightboxImg.alt = image.alt;
    });
  });
};

setupLightbox();

if (lightboxClose && lightbox) {
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox) {
    lightbox.classList.remove("active");
  }
});

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);