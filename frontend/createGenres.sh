#!/bin/bash

TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZXd1c2VyIiwiaWF0IjoxNzQ5OTMzMzM3LCJleHAiOjE3NTAwMTk3Mzd9.3wjtILXSQo_2X6cxVfeJQ0pSB4fHyn1eV44-PdlHRzo"

genres=(
  "Fantasy"
  "Science Fiction"
  "Mystery"
  "Romance"
  "Historical Fiction"
  "Horror"
  "Thriller"
  "Adventure"
  "Young Adult"
  "Dystopian"
  "Urban Fantasy"
  "Space Opera"
  "Cyberpunk"
  "Post-Apocalyptic"
  "Steampunk"
  "Paranormal Romance"
  "Dark Fantasy"
  "Supernatural"
  "Romancy"
  "Light Novel"
  "Slice of Life"
  "LitRPG"
  "Psychological Thriller"
  "Comedy"
  "Drama"
  "Action"
  "Epic Fantasy"
  "Time Travel"
  "Alternate History"
  "Magical Realism"
)

for genre in "${genres[@]}"
do
  curl -s -X POST http://localhost:8080/api/genre/create \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"genreName\": \"$genre\"}"
  echo "Created genre: $genre"
done
