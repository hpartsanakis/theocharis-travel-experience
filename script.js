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
// COUNTRIES ON HOMEPAGE
// =========================

const countryGrid = document.getElementById("countryGrid");

function getCountrySlug(country) {
  return country.toLowerCase();
}

function renderCountries() {
  if (!countryGrid || typeof destinations === "undefined") return;

  const countries = {};

  destinations.forEach((destination) => {
    if (!countries[destination.country]) {
      countries[destination.country] = {
        name: destination.country,
        coverImage: destination.coverImage,
        count: 0,
        cities: [],
      };
    }

    countries[destination.country].count++;
    countries[destination.country].cities.push(destination.city);
  });

  countryGrid.innerHTML = Object.values(countries)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((country) => {
      const slug = getCountrySlug(country.name);

      return `
        <a class="country-card" href="countries/${slug}.html">
          <img src="${country.coverImage}" alt="${country.name}" loading="lazy" />

          <div class="card-content">
            <h3>${country.name}</h3>
            <p>${country.count} destinations</p>
            <small>${country.cities.slice(0, 4).join(", ")}</small>
          </div>
        </a>
      `;
    })
    .join("");
}

renderCountries();

// =========================
// COUNTRY PAGE
// =========================

const countryPageGrid = document.getElementById("countryPageGrid");
const countryPageTitle = document.getElementById("countryPageTitle");

function getCurrentCountrySlug() {
  return window.location.pathname.split("/").pop().replace(".html", "");
}

function renderCountryPage() {
  if (
    !countryPageGrid ||
    !countryPageTitle ||
    typeof destinations === "undefined"
  ) {
    return;
  }

  const countrySlug = getCurrentCountrySlug();

  const countryDestinations = destinations.filter((destination) => {
    return destination.country.toLowerCase() === countrySlug;
  });

  if (countryDestinations.length === 0) {
    countryPageTitle.textContent = "Country not found";
    countryPageGrid.innerHTML = "<p>No destinations found.</p>";
    return;
  }

  countryPageTitle.textContent = countryDestinations[0].country;

  countryPageGrid.innerHTML = countryDestinations
    .map((destination) => {
      return `
        <a class="city-card" href="../${destination.page}">
          <img src="../${destination.coverImage}" alt="${destination.city}" loading="lazy" />

          <div class="card-content">
            <h3>${destination.city}</h3>
            <p>${destination.shortDescription}</p>
          </div>
        </a>
      `;
    })
    .join("");
}

renderCountryPage();

// =========================
// CITY PHOTO VIEWER
// =========================

const photoViewer = document.getElementById("photoViewer");
const openViewerBtn = document.getElementById("openViewerBtn");

const viewerImage = document.getElementById("viewerImage");
const viewerTitle = document.getElementById("viewerTitle");
const viewerText = document.getElementById("viewerText");

const viewerPrev = document.getElementById("viewerPrev");
const viewerNext = document.getElementById("viewerNext");
const viewerClose = document.getElementById("viewerClose");

const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

let currentPhotoIndex = 0;

function showPhoto(index) {
  if (!photoViewer || galleryItems.length === 0) return;

  currentPhotoIndex = index;

  const item = galleryItems[currentPhotoIndex];
  const image = item.querySelector("img");

  if (!image) return;

  const title =
    item.querySelector(".gallery-caption h3")?.textContent ||
    item.querySelector("h3")?.textContent ||
    image.alt ||
    "Travel Photo";

  const text =
    item.querySelector(".gallery-caption p")?.textContent ||
    item.querySelector("p")?.textContent ||
    "";

  viewerImage.src = image.src;
  viewerImage.alt = image.alt;

  viewerTitle.textContent = title;
  viewerText.textContent = text;
}

function openViewer(index = 0) {
  if (!photoViewer || galleryItems.length === 0) return;

  showPhoto(index);
  photoViewer.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeViewer() {
  if (!photoViewer) return;

  photoViewer.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

function showNextPhoto() {
  const nextIndex = (currentPhotoIndex + 1) % galleryItems.length;
  showPhoto(nextIndex);
}

function showPrevPhoto() {
  const prevIndex =
    (currentPhotoIndex - 1 + galleryItems.length) % galleryItems.length;

  showPhoto(prevIndex);
}

if (openViewerBtn) {
  openViewerBtn.addEventListener("click", () => {
    openViewer(0);
  });
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    openViewer(index);
  });
});

if (viewerNext) {
  viewerNext.addEventListener("click", showNextPhoto);
}

if (viewerPrev) {
  viewerPrev.addEventListener("click", showPrevPhoto);
}

if (viewerClose) {
  viewerClose.addEventListener("click", closeViewer);
}

if (photoViewer) {
  photoViewer.addEventListener("click", (event) => {
    if (event.target === photoViewer) {
      closeViewer();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (!photoViewer || !photoViewer.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeViewer();
  }

  if (event.key === "ArrowRight") {
    showNextPhoto();
  }

  if (event.key === "ArrowLeft") {
    showPrevPhoto();
  }
});