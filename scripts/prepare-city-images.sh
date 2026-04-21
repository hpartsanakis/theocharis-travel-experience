#!/bin/bash

SOURCE_DIR="$1"
OUTPUT_DIR="$2"
PREFIX="$3"
MAX_WIDTH="${4:-2000}"
QUALITY="${5:-82}"

if [ -z "$SOURCE_DIR" ] || [ -z "$OUTPUT_DIR" ] || [ -z "$PREFIX" ]; then
  echo "Usage: ./prepare-city-images.sh source_folder output_folder prefix [max_width] [quality]"
  echo "Example: ./prepare-city-images.sh images-original/italy/verona images/italy/verona verona 2000 82"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

shopt -s nullglob

count=1

for file in "$SOURCE_DIR"/*; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    extension="${filename##*.}"
    extension_lower=$(echo "$extension" | tr '[:upper:]' '[:lower:]')
    filename_lower=$(echo "$filename" | tr '[:upper:]' '[:lower:]')

    case "$extension_lower" in
      jpg|jpeg|png|webp)
        if [[ "$filename_lower" == *"cover"* ]]; then
          output_file="$OUTPUT_DIR/${PREFIX}-cover.jpg"

          magick "$file" \
            -auto-orient \
            -resize "${MAX_WIDTH}x>" \
            -strip \
            -interlace Plane \
            -quality "$QUALITY" \
            "$output_file"

          echo "Cover optimized: $filename -> $(basename "$output_file")"
        else
          output_file="$OUTPUT_DIR/${PREFIX}-${count}.jpg"

          magick "$file" \
            -auto-orient \
            -resize "${MAX_WIDTH}x>" \
            -strip \
            -interlace Plane \
            -quality "$QUALITY" \
            "$output_file"

          echo "Photo optimized: $filename -> $(basename "$output_file")"
          count=$((count + 1))
        fi
        ;;
      *)
        echo "Skipped: $filename"
        ;;
    esac
  fi
done

echo "Done. Optimized and renamed images saved in: $OUTPUT_DIR"