#!/bin/bash

FOLDER="$1"
PREFIX="$2"

if [ -z "$FOLDER" ] || [ -z "$PREFIX" ]; then
  echo "Usage: ./rename-photos.sh path/to/folder prefix"
  echo "Example: ./rename-photos.sh images/italy/verona verona"
  exit 1
fi

count=1

for file in "$FOLDER"/*; do
  if [ -f "$file" ]; then
    extension="${file##*.}"
    new_name="$FOLDER/${PREFIX}-${count}.${extension}"
    mv "$file" "$new_name"
    echo "Renamed: $(basename "$file") -> $(basename "$new_name")"
    count=$((count + 1))
  fi
done

echo "Done."