#!/bin/bash

# ==========================================
# PROFESSIONAL CITY IMAGE OPTIMIZER
# ==========================================
# Usage:
# ./scripts/optimize-images.sh salzburg

CITY=$1

if [ -z "$CITY" ]; then
  echo "Usage: ./scripts/optimize-images.sh city"
  echo "Example: ./scripts/optimize-images.sh salzburg"
  exit 1
fi

CITY_LOWER=$(echo "$CITY" | tr '[:upper:]' '[:lower:]')

INPUT_DIR="images/cities/$CITY_LOWER/originals"
OUTPUT_DIR="images/cities/$CITY_LOWER/optimized"
WEBP_DIR="images/cities/$CITY_LOWER/webp"

if [ ! -d "$INPUT_DIR" ]; then
  echo "Error: originals folder not found:"
  echo "$INPUT_DIR"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"
mkdir -p "$WEBP_DIR"

echo "Optimizing images for: $CITY_LOWER"
echo "Input: $INPUT_DIR"
echo ""

for img in "$INPUT_DIR"/*.{jpg,JPG,jpeg,JPEG,png,PNG}; do
  [ -e "$img" ] || continue

  filename=$(basename "$img")
  name="${filename%.*}"

  sips -Z 1600 "$img" --out "$OUTPUT_DIR/$filename" >/dev/null

  if command -v cwebp >/dev/null 2>&1; then
    cwebp -q 85 "$img" -o "$WEBP_DIR/$name.webp" >/dev/null 2>&1
  else
    echo "Warning: cwebp not installed. Skipping WebP for $filename"
  fi

  echo "Processed: $filename"
done

echo ""
echo "Optimization complete."