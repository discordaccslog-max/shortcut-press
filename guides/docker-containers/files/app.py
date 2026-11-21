"""A tiny web app for the Docker guide. Uses only Python's standard library.

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
