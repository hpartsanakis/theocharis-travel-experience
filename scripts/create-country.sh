#!/bin/bash

COUNTRY_NAME="$1"
COUNTRY_SLUG="$2"

if [ -z "$COUNTRY_NAME" ] || [ -z "$COUNTRY_SLUG" ]; then
  echo "Usage:"
  echo "./scripts/create-country.sh \"Italy\" italy"
  exit 1
fi

cat > "countries/$COUNTRY_SLUG.html" <<EOF
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$COUNTRY_NAME | Theocharis Travel Experience</title>

    <link rel="stylesheet" href="../css/base.css" />
    <link rel="stylesheet" href="../css/layout.css" />
    <link rel="stylesheet" href="../css/components.css" />
    <link rel="stylesheet" href="../css/pages.css" />
    <link rel="stylesheet" href="../css/responsive.css" />
  </head>

  <body>
    <nav class="breadcrumbs">
      <a href="../index.html">Countries</a>
      <span>›</span>
      <span>$COUNTRY_NAME</span>
    </nav>

    <main class="container">
      <section class="section-header">
        <p class="eyebrow">Country</p>
        <h1 id="countryPageTitle">$COUNTRY_NAME</h1>
      </section>

      <section class="city-grid" id="countryPageGrid"></section>
    </main>

    <script src="../data/destinations.js"></script>
    <script src="../script.js"></script>
  </body>
</html>
EOF

echo "Country page created:"
echo "countries/$COUNTRY_SLUG.html"