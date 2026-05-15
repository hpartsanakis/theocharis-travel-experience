#!/bin/bash

# ==========================================
# CREATE NEW CITY SYSTEM
# ==========================================

# Usage:
# ./scripts/create-city.sh norway oslo

COUNTRY=$1
CITY=$2

CITY_LOWER=$(echo "$CITY" | tr '[:upper:]' '[:lower:]')

# ==========================================
# CREATE FOLDERS
# ==========================================

mkdir -p "images/$COUNTRY/$CITY_LOWER/originals"
mkdir -p "images/$COUNTRY/$CITY_LOWER/optimized"
mkdir -p "images/$COUNTRY/$CITY_LOWER/webp"

# ==========================================
# CREATE CITY PAGE
# ==========================================

HTML_FILE="cities/$CITY_LOWER.html"

cat > "$HTML_FILE" <<EOF
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>$CITY — Theocharis Travel Experience</title>

    <link rel="stylesheet" href="../style.css?v=1" />
  </head>

  <body>

    <!-- HERO -->

    <section
      class="hero reveal destination-hero"
      style="
        --hero-image:
        url(../images/$COUNTRY/$CITY_LOWER/optimized/$CITY_LOWER_cover.jpeg);
      "
    >
      <div class="container">
        <div class="hero-text">

          <p class="eyebrow">$COUNTRY</p>

          <h1>$CITY</h1>

          <p>
            Travel moments and photography from $CITY.
          </p>

          <a href="#${CITY_LOWER}-gallery" class="btn">
            View Photos
          </a>

        </div>
      </div>
    </section>

    <!-- GALLERY -->

    <section
      id="${CITY_LOWER}-gallery"
      class="gallery reveal"
    >
      <div class="container">

        <h2>$CITY Gallery</h2>

        <p class="section-intro">
          Photography moments from $CITY.
        </p>

        <div class="gallery-grid city-gallery">

          <!-- GENERATED GALLERY -->

        </div>

      </div>
    </section>

    <!-- LIGHTBOX -->

    <div class="lightbox">

      <button class="lightbox-close">
        &times;
      </button>

      <button class="lightbox-prev">
        &#10094;
      </button>

      <img
        class="lightbox-img"
        src=""
        alt=""
      />

      <button class="lightbox-next">
        &#10095;
      </button>

      <div class="lightbox-counter">
        1 / 1
      </div>

    </div>

    <script src="../script.js?v=1"></script>

  </body>
</html>
EOF

echo ""
echo "===================================="
echo "City created successfully."
echo "===================================="
echo ""
echo "City page:"
echo "$HTML_FILE"
echo ""
echo "Image folders:"
echo "images/$COUNTRY/$CITY_LOWER/"
echo ""