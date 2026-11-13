// Minimal static file server for local preview and tests (supports Range requests for video).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".mp4": "video/mp4",
  ".wav": "audio/wav",
  ".obj": "text/plain; charset=utf-8",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export function startServer(root, port = 8765, { prefix = "" } = {}) {
  const server = http.createServer((req, res) => {
    let url = decodeURIComponent(req.url.split("?")[0]);
    if (prefix) {
      if (!url.startsWith(prefix)) {
        res.writeHead(302, { Location: prefix + "/" });
        return res.end();
      }
      url = url.slice(prefix.length) || "/";
    }
    let file = path.join(root, url);
    if (url.endsWith("/")) file = path.join(file, "index.html");
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      if (fs.existsSync(file) && fs.statSync(file).isDirectory() && fs.existsSync(path.join(file, "index.html"))) {
        res.writeHead(301, { Location: (prefix + url).replace(/\/?$/, "/") });
        return res.end();
      }
      res.writeHead(404, { "Content-Type": TYPES[".html"], "Cache-Control": "no-store" });
      const nf = path.join(root, "404.html");
      return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : "Not found");
    }
    const stat = fs.statSync(file);
    const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
    const range = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
    if (range) {
      const start = range[1] ? parseInt(range[1], 10) : 0;
      const end = range[2] ? parseInt(range[2], 10) : stat.size - 1;
      res.writeHead(206, { "Content-Type": type, "Content-Range": `bytes ${start}-${end}/${stat.size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1, "Cache-Control": "no-store" });
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(200, { "Content-Type": type, "Content-Length": stat.size, "Accept-Ranges": "bytes", "Cache-Control": "no-store" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) =>
    server.listen(port, "127.0.0.1", () =>
      resolve({
        port: server.address().port,
        close: () => new Promise((r) => server.close(r)),
      })
    )
  );
}
