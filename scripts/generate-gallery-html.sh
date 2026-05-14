#!/bin/bash

# Usage:
# ./scripts/generate-gallery-html.sh denmark copenhagen

COUNTRY=$1
CITY=$2

OPTIMIZED_DIR="images/$COUNTRY/$CITY/optimized"
WEBP_DIR="images/$COUNTRY/$CITY/webp"
OUTPUT_FILE="scripts/${CITY}-gallery.html"

echo "" > "$OUTPUT_FILE"

for img in "$OPTIMIZED_DIR"/*.{jpg,jpeg,JPG,JPEG}; do
  [ -e "$img" ] || continue

  filename=$(basename "$img")
  name="${filename%.*}"

  echo "Generating HTML for $filename"

  cat >> "$OUTPUT_FILE" <<EOF
<div class="gallery-item">
  <picture>
    <source
      srcset="../$WEBP_DIR/$name.webp"
      type="image/webp"
    />

    <img
      src="../$OPTIMIZED_DIR/$filename"
      alt="$CITY travel photo"
      loading="lazy"
      decoding="async"
    />
  </picture>

  <p>$CITY travel photo</p>
</div>

EOF

done

echo "Gallery HTML created: $OUTPUT_FILE"