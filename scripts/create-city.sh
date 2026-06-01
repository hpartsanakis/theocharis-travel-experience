#!/bin/bash

CITY_NAME="$1"
COUNTRY_NAME="$2"
CITY_SLUG="$3"
COUNTRY_SLUG="$4"

if [ -z "$CITY_NAME" ] || [ -z "$COUNTRY_NAME" ] || [ -z "$CITY_SLUG" ] || [ -z "$COUNTRY_SLUG" ]; then
  echo "Usage:"
  echo "./scripts/create-city.sh \"Milan\" \"Italy\" milan italy"
  exit 1
fi

mkdir -p "images/cities/$CITY_SLUG/originals"
mkdir -p "images/cities/$CITY_SLUG/optimized"
mkdir -p "images/cities/$CITY_SLUG/webp"

cp templates/template.html "cities/$CITY_SLUG.html"

sed -i '' "s/{{CITY_NAME}}/$CITY_NAME/g" "cities/$CITY_SLUG.html"
sed -i '' "s/{{COUNTRY_NAME}}/$COUNTRY_NAME/g" "cities/$CITY_SLUG.html"
sed -i '' "s/{{CITY_SLUG}}/$CITY_SLUG/g" "cities/$CITY_SLUG.html"
sed -i '' "s/{{COUNTRY_SLUG}}/$COUNTRY_SLUG/g" "cities/$CITY_SLUG.html"
sed -i '' "s/{{CITY_DESCRIPTION}}/Travel moments and photography from $CITY_NAME./g" "cities/$CITY_SLUG.html"
sed -i '' "s/{{CITY_STORY}}/$CITY_NAME is a destination full of atmosphere, history, architecture, and unique travel moments captured through my lens./g" "cities/$CITY_SLUG.html"

echo "City page created:"
echo "cities/$CITY_SLUG.html"

echo "Image folders created:"
echo "images/$COUNTRY_SLUG/$CITY_SLUG/"