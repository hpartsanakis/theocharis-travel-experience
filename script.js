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
const featuredGalleryContainer = document.querySelector("#featured-gallery");
const galleryFiltersContainer = document.querySelector("#gallery-filters");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

let activeFilter = "All";

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
        <article class="card" data-city="${destination.city}">
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

const getGalleryFilters = () => {
  if (typeof photos === "undefined" || !Array.isArray(photos)) {
    return ["All"];
  }

  const featuredPhotos = photos.filter((photo) => photo.featured);

  const categoryFilters = featuredPhotos.map((photo) => photo.category);
  const countryFilters = featuredPhotos.map((photo) => photo.country);
  const cityFilters = featuredPhotos.map((photo) => photo.city);

  return [
    "All",
    ...new Set([...categoryFilters, ...countryFilters, ...cityFilters]),
  ];
};

const renderGalleryFilters = () => {
  if (!galleryFiltersContainer) return;

  const filters = getGalleryFilters();

  galleryFiltersContainer.innerHTML = filters
    .map((filter) => {
      const activeClass = filter === activeFilter ? "active" : "";

      return `
        <button class="filter-btn ${activeClass}" data-filter="${filter}">
          ${filter}
        </button>
      `;
    })
    .join("");
};

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

const renderFeaturedGallery = () => {
  if (
    !featuredGalleryContainer ||
    typeof photos === "undefined" ||
    !Array.isArray(photos)
  ) {
    return;
  }

  let filteredPhotos = photos.filter((photo) => photo.featured);

  if (activeFilter !== "All") {
    filteredPhotos = filteredPhotos.filter(
      (photo) =>
        photo.category === activeFilter ||
        photo.country === activeFilter ||
        photo.city === activeFilter
    );
  }

  featuredGalleryContainer.innerHTML = filteredPhotos
    .map((photo) => {
      return `
        <div class="gallery-item">
          <img src="${photo.image}" alt="${photo.title}" />
          <div class="overlay">View</div>
        </div>
      `;
    })
    .join("");

  setupLightbox();
};

const setupGalleryFilterEvents = () => {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      renderGalleryFilters();
      renderFeaturedGallery();
      setupGalleryFilterEvents();
    });
  });
};

const setupDestinationCardEvents = () => {
  const destinationCards = document.querySelectorAll(
    "#featured-destinations .card"
  );

  destinationCards.forEach((card) => {
    card.addEventListener("click", () => {
      const selectedCity = card.dataset.city;

      activeFilter = selectedCity;
      renderGalleryFilters();
      renderFeaturedGallery();
      setupGalleryFilterEvents();

      const gallerySection = document.querySelector("#gallery");

      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
};

renderFeaturedDestinations();
setupDestinationCardEvents();

renderGalleryFilters();
renderFeaturedGallery();
setupGalleryFilterEvents();

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