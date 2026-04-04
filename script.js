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

const categoryFiltersContainer = document.querySelector("#category-filters");
const countryFiltersContainer = document.querySelector("#country-filters");
const cityFiltersContainer = document.querySelector("#city-filters");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

let activeCategory = "All";
let activeCountry = "All";
let activeCity = "All";

const getFeaturedPhotos = () => {
  if (typeof photos === "undefined" || !Array.isArray(photos)) {
    return [];
  }

  return photos.filter((photo) => photo.featured);
};

const getUniqueValues = (items, key) => {
  return ["All", ...new Set(items.map((item) => item[key]))];
};

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

const renderFilterButtons = (container, items, activeValue, dataType) => {
  if (!container) return;

  container.innerHTML = items
    .map((item) => {
      const activeClass = item === activeValue ? "active" : "";

      return `
        <button
          class="filter-btn ${activeClass}"
          data-type="${dataType}"
          data-value="${item}"
          type="button"
        >
          ${item}
        </button>
      `;
    })
    .join("");
};

const renderGalleryFilters = () => {
  const featuredPhotos = getFeaturedPhotos();

  const categoryFilters = getUniqueValues(featuredPhotos, "category");
  const countryFilters = getUniqueValues(featuredPhotos, "country");
  const cityFilters = getUniqueValues(featuredPhotos, "city");

  renderFilterButtons(
    categoryFiltersContainer,
    categoryFilters,
    activeCategory,
    "category"
  );

  renderFilterButtons(
    countryFiltersContainer,
    countryFilters,
    activeCountry,
    "country"
  );

  renderFilterButtons(cityFiltersContainer, cityFilters, activeCity, "city");
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
  if (!featuredGalleryContainer) {
    return;
  }

  let filteredPhotos = getFeaturedPhotos();

  if (activeCategory !== "All") {
    filteredPhotos = filteredPhotos.filter(
      (photo) => photo.category === activeCategory
    );
  }

  if (activeCountry !== "All") {
    filteredPhotos = filteredPhotos.filter(
      (photo) => photo.country === activeCountry
    );
  }

  if (activeCity !== "All") {
    filteredPhotos = filteredPhotos.filter((photo) => photo.city === activeCity);
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
      const type = button.dataset.type;
      const value = button.dataset.value;

      if (type === "category") {
        activeCategory = value;
      }

      if (type === "country") {
        activeCountry = value;
      }

      if (type === "city") {
        activeCity = value;
      }

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

      activeCity = selectedCity;

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