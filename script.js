const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  siteNav.classList.toggle("active");
});

const navLinks = document.querySelectorAll(".site-nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("active");
  });
});

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    lightbox.classList.add("active");
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
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
