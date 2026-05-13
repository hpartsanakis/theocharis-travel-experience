#!/bin/bash

# ==========================================
# PROFESSIONAL IMAGE OPTIMIZER
# ==========================================

# Usage:
# ./scripts/optimize-images.sh denmark copenhagen

COUNTRY=$1
CITY=$2

INPUT_DIR="images/$COUNTRY/$CITY/originals"
OUTPUT_DIR="images/$COUNTRY/$CITY/optimized"
WEBP_DIR="images/$COUNTRY/$CITY/webp"

mkdir -p "$OUTPUT_DIR"
mkdir -p "$WEBP_DIR"

echo "Optimizing JPG images..."

for img in "$INPUT_DIR"/*.{jpg,JPG,jpeg,JPEG}; do
  [ -e "$img" ] || continue

  filename=$(basename "$img")

  # Optimized JPG
  sips -Z 1600 "$img" --out "$OUTPUT_DIR/$filename" >/dev/null

  # WEBP conversion
  cwebp -q 85 "$img" -o "$WEBP_DIR/${filename%.*}.webp" >/dev/null 2>&1

  echo "Processed: $filename"
done

echo ""
echo "Optimization complete."