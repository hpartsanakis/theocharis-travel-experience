#!/bin/bash

COUNTRY_FOLDER="$1"
CITY_SLUG="$2"
CITY_NAME="$3"

if [ -z "$COUNTRY_FOLDER" ] || [ -z "$CITY_SLUG" ] || [ -z "$CITY_NAME" ]; then
  echo "Usage: ./scripts/make-city-page.sh country-folder city-slug city-name"
  echo "Example: ./scripts/make-city-page.sh italy florence Florence"
  exit 1
fi

IMAGE_DIR="images/$COUNTRY_FOLDER/$CITY_SLUG"
WEB_PATH="../images/$COUNTRY_FOLDER/$CITY_SLUG"
OUTPUT_FILE="cities/${CITY_SLUG}.html"

if [ ! -d "$IMAGE_DIR" ]; then
  echo "Image folder not found: $IMAGE_DIR"
  exit 1
fi

mkdir -p cities
shopt -s nullglob

GALLERY_HTML=""

count=0

for file in "$IMAGE_DIR"/*; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    extension="${filename##*.}"
    extension_lower=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

    case "$extension_lower" in
      jpg|jpeg|png|webp)
        if [[ "$filename" == *"cover"* ]]; then
          continue
        fi

        count=$((count + 1))
        title="$CITY_NAME photo $count"

        GALLERY_HTML="${GALLERY_HTML}
            <div class=\"gallery-item\">
              <img
                src=\"${WEB_PATH}/${filename}\"
                alt=\"${title}\"
              />
              <div class=\"overlay\"><span>${title}</span></div>
            </div>
"
        ;;
    esac
  fi
done

cat > "$OUTPUT_FILE" <<EOF
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${CITY_NAME} | Theocharis Travel Experience</title>
    <link rel="stylesheet" href="../style.css" />
  </head>

  <body>
    <header class="site-header">
      <div class="container">
        <div class="logo">
          <a href="../index.html">Theocharis Travel Experience</a>
        </div>

        <button class="menu-toggle" aria-label="Open menu">☰</button>

        <nav class="site-nav">
          <a href="../index.html#about">About</a>
          <a href="../index.html#destinations">Destinations</a>
          <a href="#${CITY_SLUG}-gallery">Gallery</a>
          <a href="#${CITY_SLUG}-stories">Stories</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>

    <main>
      <section
        class="hero reveal destination-hero"
        style="--hero-image: url('../images/${COUNTRY_FOLDER}/${CITY_SLUG}/${CITY_SLUG}-cover.jpg');"
      >
        <div class="container">
          <div class="hero-text">
            <p class="eyebrow">${CITY_NAME}</p>
            <h1>${CITY_NAME}</h1>
            <p>
              A personal visual journey through ${CITY_NAME}, captured in light,
              atmosphere, and quiet travel moments.
            </p>
            <a href="#${CITY_SLUG}-gallery" class="btn">View Photos</a>
          </div>
        </div>
      </section>

      <section class="about reveal">
        <div class="container">
          <h2>About ${CITY_NAME}</h2>
          <p>
            ${CITY_NAME} is presented here through selected photographs and
            impressions from the journey. This page is a starting point that you
            can refine later with your final story and image selection.
          </p>
        </div>
      </section>

      <section id="${CITY_SLUG}-gallery" class="gallery reveal">
        <div class="container">
          <h2>${CITY_NAME} Gallery</h2>
          <p class="section-intro">
            A curated selection of photographs from ${CITY_NAME}.
          </p>

          <div class="gallery-grid city-gallery">
${GALLERY_HTML}
          </div>
        </div>
      </section>

      <section id="${CITY_SLUG}-stories" class="stories reveal">
        <div class="container">
          <h2>Travel Note</h2>

          <article class="story">
            <h3>First Impressions of ${CITY_NAME}</h3>
            <p>
              Add your first paragraph here.
            </p>
            <p>
              Add your second paragraph here.
            </p>
          </article>
        </div>
      </section>

      <section class="reveal">
        <div class="container">
          <a href="../index.html#destinations" class="btn">Back to Home</a>
        </div>
      </section>
    </main>

    <footer id="contact" class="site-footer reveal">
      <div class="container">
        <div class="contact-box">
          <h2>Contact</h2>
          <p class="contact-text">
            If you would like to connect, follow my journeys, or get in touch
            about travel photography, you can find me here.
          </p>

          <div class="contact-links">
            <a href="mailto:your@email.com" class="contact-link">Email Me</a>
            <a
              href="https://www.instagram.com/harrispartsanakis/"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-link"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>

    <div class="lightbox">
      <span class="lightbox-close">&times;</span>
      <img class="lightbox-img" src="" alt="Expanded gallery image" />
    </div>

    <script src="../script.js"></script>
  </body>
</html>
EOF

echo "City page created: $OUTPUT_FILE"