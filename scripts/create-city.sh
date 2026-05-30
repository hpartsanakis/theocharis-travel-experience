#!/bin/bash

# Usage:
# ./scripts/create-city.sh greece athens

COUNTRY=$1
CITY=$2

COUNTRY_LOWER=$(echo "$COUNTRY" | tr '[:upper:]' '[:lower:]')
CITY_LOWER=$(echo "$CITY" | tr '[:upper:]' '[:lower:]')

if [ -z "$COUNTRY" ] || [ -z "$CITY" ]; then
  echo "Usage: ./scripts/create-city.sh country city"
  exit 1
fi

mkdir -p "images/cities/$CITY_LOWER/originals"
mkdir -p "images/cities/$CITY_LOWER/optimized"
mkdir -p "images/cities/$CITY_LOWER/webp"
mkdir -p "countries"
mkdir -p "cities"

CITY_FILE="cities/$CITY_LOWER.html"
COUNTRY_FILE="countries/$COUNTRY_LOWER.html"

cat > "$CITY_FILE" <<EOF
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$CITY | Theocharis Travel Experience</title>
    <link rel="stylesheet" href="../style.css" />
  </head>

  <body>
    <header class="city-hero">
      <img
        src="../images/cities/$CITY_LOWER/optimized/${CITY_LOWER}_cover.jpeg"
        alt="$CITY"
      />

      <div class="city-hero-content">
        <nav class="breadcrumbs">
          <a href="../index.html">Countries</a>
          <span>›</span>
          <a href="../countries/$COUNTRY_LOWER.html">$COUNTRY</a>
          <span>›</span>
          <span>$CITY</span>
        </nav>

        <p class="eyebrow">$COUNTRY</p>
        <h1>$CITY</h1>
        <p>Travel photography moments from $CITY.</p>

        <button class="btn" id="openViewerBtn">View Photos</button>
      </div>
    </header>

    <main class="container">
      <section class="story">
        <h2>Story</h2>
        <p>
          Write here your personal travel story, atmosphere, memories and
          photography notes from $CITY.
        </p>
      </section>

      <section class="gallery-grid city-gallery">
        <!-- GENERATED GALLERY -->
      </section>
    </main>

    <div class="photo-viewer" id="photoViewer">
      <button class="viewer-close" id="viewerClose">×</button>
      <button class="viewer-arrow viewer-prev" id="viewerPrev">‹</button>

      <figure class="viewer-frame">
        <img id="viewerImage" src="" alt="" />
        <figcaption>
          <h3 id="viewerTitle"></h3>
          <p id="viewerText"></p>
        </figcaption>
      </figure>

      <button class="viewer-arrow viewer-next" id="viewerNext">›</button>
    </div>

    <script src="../script.js"></script>
  </body>
</html>
EOF

if [ ! -f "$COUNTRY_FILE" ]; then
cat > "$COUNTRY_FILE" <<EOF
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$COUNTRY | Theocharis Travel Experience</title>
    <link rel="stylesheet" href="../style.css" />
  </head>

  <body>
    <main class="container">
      <a class="back-link" href="../index.html">← Back to Countries</a>

      <section class="section-header">
        <p class="eyebrow">Country</p>
        <h1 id="countryPageTitle">$COUNTRY</h1>
      </section>

      <section class="city-grid" id="countryPageGrid"></section>
    </main>

    <script src="../data/destinations.js"></script>
    <script src="../script.js"></script>
  </body>
</html>
EOF
fi

echo "Created:"
echo "- $CITY_FILE"
echo "- $COUNTRY_FILE"
echo "- images/cities/$CITY_LOWER/"