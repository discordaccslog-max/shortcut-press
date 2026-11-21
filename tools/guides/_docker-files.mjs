// Practice files for Containers with Docker.
export const APP_PY = `"""A tiny web app for the Docker guide. Uses only Python's standard library.

GET /        -> a greeting and a visit counter (stored in COUNT_FILE)
GET /health  -> "ok"
"""
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os
import socket

COUNT_FILE = os.environ.get("COUNT_FILE", "visits.txt")
GREETING = os.environ.get("GREETING", "Hello from a container")
PORT = int(os.environ.get("PORT", "8000"))


def next_visit():
    try:
        with open(COUNT_FILE) as f:
            count = int(f.read().strip() or 0)
    except FileNotFoundError:
        count = 0
    count += 1
    os.makedirs(os.path.dirname(COUNT_FILE) or ".", exist_ok=True)
    with open(COUNT_FILE, "w") as f:
        f.write(str(count))
    return count


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/health":
            body, kind = b"ok", "text/plain"
        else:
            data = {"message": GREETING, "visits": next_visit(), "host": socket.gethostname()}
            body, kind = json.dumps(data).encode(), "application/json"
        self.send_response(200)
        self.send_header("Content-Type", kind)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        print("request:", self.path, flush=True)


if __name__ == "__main__":
    print(f"Listening on port {PORT}", flush=True)
    HTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
`;

export const DOCKERFILE = `# Image for the practice app in the Docker guide.
FROM python:3.12-slim

WORKDIR /app
COPY app.py .

ENV COUNT_FILE=/data/visits.txt
RUN mkdir -p /data

EXPOSE 8000
CMD ["python", "app.py"]
`;

export const COMPOSE = `# Two services for the Docker Compose lesson.
services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      GREETING: "Hello from Compose"
    volumes:
      - visits:/data

  docs:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./site:/usr/share/nginx/html:ro

volumes:
  visits:
`;

export const DOCS_HTML = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Practice app docs</title></head>
<body style="font-family: system-ui, sans-serif; max-width: 36rem; margin: 2rem auto;">
  <h1>Practice app</h1>
  <p>This page is served by the <code>docs</code> service (nginx) in compose.yaml.</p>
  <p>The app itself runs at <a href="http://localhost:8000/">localhost:8000</a>.</p>
</body>
</html>
`;
