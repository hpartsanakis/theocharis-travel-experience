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
    siteNav.classList.remove("active");
  });
});

const featuredDestinationsContainer = document.querySelector(
  "#featured-destinations",
);

const renderFeaturedDestinations = () => {
  if (!featuredDestinationsContainer || typeof destinations === "undefined") {
    return;
  }

  const featuredDestinations = destinations.filter(
    (destination) => destination.featured,
  );

  featuredDestinationsContainer.innerHTML = featuredDestinations
    .map((destination) => {
      return `
        <article class="card">
          <img
            src="${destination.coverImage}"
            alt="${destination.city}, ${destination.country}"
          />
          <div class="card-content">
            <h3>${destination.city}</h3>
            <p>${destination.shortDescription}</p>
          </div>
        </article>
      `;
    })
    .join("");
};

renderFeaturedDestinations();

const featuredGalleryContainer = document.querySelector("#featured-gallery");

const renderFeaturedGallery = () => {
  if (!featuredGalleryContainer || typeof photos === "undefined") {
    return;
  }

  const featuredPhotos = photos.filter((photo) => photo.featured);

  featuredGalleryContainer.innerHTML = featuredPhotos
    .map((photo) => {
      return `
        <div class="gallery-item">
          <img src="${photo.image}" alt="${photo.title}" />
          <div class="overlay">View</div>
        </div>
      `;
    })
    .join("");
};

renderFeaturedGallery();

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
