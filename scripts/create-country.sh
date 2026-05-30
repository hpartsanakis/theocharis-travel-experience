#!/bin/bash

# ==========================================
# CREATE NEW COUNTRY PAGE
# ==========================================
# Usage:
# ./scripts/create-country.sh greece

COUNTRY=$1

if [ -z "$COUNTRY" ]; then
  echo "Usage: ./scripts/create-country.sh country"
  exit 1
fi

COUNTRY_LOWER=$(echo "$COUNTRY" | tr '[:upper:]' '[:lower:]')
COUNTRY_FILE="countries/$COUNTRY_LOWER.html"

mkdir -p "countries"
mkdir -p "images/countries/$COUNTRY_LOWER"

if [ -f "$COUNTRY_FILE" ]; then
  echo "Country page already exists:"
  echo "$COUNTRY_FILE"
  exit 0
fi

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
      <a class="back-link" href="../index.html">
        ← Back to Countries
      </a>

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

echo ""
echo "Country created successfully:"
echo "$COUNTRY_FILE"
echo ""
echo "Add country cover image here:"
echo "images/countries/$COUNTRY_LOWER/"
echo ""