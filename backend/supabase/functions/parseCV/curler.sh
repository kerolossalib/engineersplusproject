curl -X POST http://localhost:54321/functions/v1/parseCV \
-H "Content-Type: application/json" \
-d '{
  "userid": "eeb76a28-8d8e-4ee1-b104-d3b8e89d0284",
  "documentName": "cv.pdf"
}'