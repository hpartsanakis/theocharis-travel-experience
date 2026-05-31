#!/bin/bash

# ==========================================
# GENERATE CITY GALLERY HTML
# ==========================================
# Usage:
# ./scripts/generate-gallery-html.sh cyclades
#
# Reads:
# images/cities/cyclades/optimized
# images/cities/cyclades/webp
#
# Creates:
# scripts/cyclades-gallery.html

CITY=$1

if [ -z "$CITY" ]; then
  echo "Usage: ./scripts/generate-gallery-html.sh city"
  echo "Example: ./scripts/generate-gallery-html.sh cyclades"
  exit 1
fi

CITY_LOWER=$(echo "$CITY" | tr '[:upper:]' '[:lower:]')

OPTIMIZED_DIR="images/cities/$CITY_LOWER/optimized"
WEBP_DIR="images/cities/$CITY_LOWER/webp"
OUTPUT_FILE="scripts/${CITY_LOWER}-gallery.html"

if [ ! -d "$OPTIMIZED_DIR" ]; then
  echo "Error: optimized folder not found:"
  echo "$OPTIMIZED_DIR"
  exit 1
fi

echo "" > "$OUTPUT_FILE"

for img in "$OPTIMIZED_DIR"/*.{jpg,jpeg,JPG,JPEG,png,PNG}; do
  [ -e "$img" ] || continue

  filename=$(basename "$img")
  name="${filename%.*}"

  # Skip cover image if you don't want it inside the gallery
  if [[ "$name" == *"cover"* ]]; then
    continue
  fi

  echo "Generating HTML for $filename"

  cat >> "$OUTPUT_FILE" <<EOF
<article class="gallery-item">
  <picture>
    <source
      srcset="../$WEBP_DIR/$name.webp"
      type="image/webp"
    />

    <img
      src="../$OPTIMIZED_DIR/$filename"
      alt="$CITY_LOWER travel photo"
      loading="lazy"
      decoding="async"
    />
  </picture>

  <div class="gallery-caption">
    <h3>$CITY_LOWER Moment</h3>
    <p>Travel photography moment from $CITY_LOWER.</p>
  </div>
</article>

EOF

done

echo ""
echo "Gallery HTML created:"
echo "$OUTPUT_FILE"
echo ""
echo "Copy the generated gallery items into:"
echo "cities/${CITY_LOWER}.html"
echo "inside:"
echo "<section class=\"gallery-grid city-gallery\">"
echo ""