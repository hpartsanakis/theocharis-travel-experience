#!/bin/bash

IMAGE_DIR="$1"
WEB_PATH="$2"
CITY_NAME="$3"

if [ -z "$IMAGE_DIR" ] || [ -z "$WEB_PATH" ] || [ -z "$CITY_NAME" ]; then
  echo "Usage: ./scripts/generate-gallery-html.sh image_folder web_path city_name"
  echo "Example: ./scripts/generate-gallery-html.sh images/italy/florence ../images/italy/florence Florence"
  exit 1
fi

if [ ! -d "$IMAGE_DIR" ]; then
  echo "Folder not found: $IMAGE_DIR"
  exit 1
fi

shopt -s nullglob

echo '<div class="gallery-grid city-gallery">'
echo

count=0

for file in "$IMAGE_DIR"/*; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    extension="${filename##*.}"
    extension_lower=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

    case "$extension_lower" in
      jpg|jpeg|png|webp)
        if [[ "$filename" == *"cover"* ]]; then
          continue
        fi

        count=$((count + 1))
        title="${CITY_NAME} photo ${count}"

        echo '  <div class="gallery-item">'
        echo "    <img src=\"$WEB_PATH/$filename\" alt=\"$title\" />"
        echo "    <div class=\"overlay\"><span>$title</span></div>"
        echo '  </div>'
        echo
        ;;
    esac
  fi
done

echo '</div>'

if [ "$count" -eq 0 ]; then
  echo
  echo "<!-- No gallery images found in $IMAGE_DIR -->"
fi