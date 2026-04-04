#!/bin/bash

SOURCE_DIR="$1"
OUTPUT_DIR="$2"
MAX_WIDTH="${3:-2000}"
QUALITY="${4:-82}"

if [ -z "$SOURCE_DIR" ] || [ -z "$OUTPUT_DIR" ]; then
  echo "Usage: ./optimize-images.sh source_folder output_folder [max_width] [quality]"
  echo "Example: ./optimize-images.sh images-original/italy/verona images/italy/verona 2000 82"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

shopt -s nullglob

for file in "$SOURCE_DIR"/*; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    extension="${filename##*.}"
    extension_lower=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

    case "$extension_lower" in
      jpg|jpeg|png|webp)
        output_file="$OUTPUT_DIR/${filename%.*}.jpg"

        magick "$file" \
          -auto-orient \
          -resize "${MAX_WIDTH}x>" \
          -strip \
          -interlace Plane \
          -quality "$QUALITY" \
          "$output_file"

        echo "Optimized: $filename -> $(basename "$output_file")"
        ;;
      *)
        echo "Skipped: $filename"
        ;;
    esac
  fi
done

echo "Done. Optimized images saved in: $OUTPUT_DIR"