/*
  Runs inside headless Edge/Chrome during `npm run files`.
  Draws original abstract motion graphics frame by frame, synthesizes audio,
  encodes H.264 + AAC with WebCodecs at a constant 30 fps, and packages an MP4
  with mp4-muxer (MIT). Returns the file as base64.
*/
(function () {
  "use strict";

  var W = 1280, H = 720, FPS = 30, SR = 48000;

  function draw(kind, ctx, t, dur) {
    if (kind === "orbits") {
      ctx.fillStyle = "#101418";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 2;
      for (var r = 80; r <= 320; r += 80) {
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      var colors = ["#C8FF3D", "#4DB6F2", "#F2A65A", "#E8E8E8"];
      for (var i = 0; i < 4; i++) {
        var rad = 80 + i * 80;
        var a = t * (1.2 - i * 0.22) + i;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(W / 2 + Math.cos(a) * rad, H / 2 + Math.sin(a) * rad, 18 - i * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#F4F4F1";
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, 26, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === "waves") {
      ctx.fillStyle = "#0D1B2A";
      ctx.fillRect(0, 0, W, H);
      for (var k = 0; k < 7; k++) {
        ctx.strokeStyle = k === 3 ? "#C8FF3D" : "rgba(160,200,240," + (0.25 + k * 0.08) + ")";
        ctx.lineWidth = k === 3 ? 6 : 3;
        ctx.beginPath();
        for (var x = 0; x <= W; x += 8) {
          var y = H / 2 + (k - 3) * 70 + Math.sin(x / 90 + t * 3 + k * 0.6) * (30 + k * 4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    } else if (kind === "grid") {
      ctx.fillStyle = "#15171A";
      ctx.fillRect(0, 0, W, H);
      var cols = 12, rows = 6, gap = 14;
      var cw = (W - 160 - gap * (cols - 1)) / cols;
      var ch = (H - 160 - gap * (rows - 1)) / rows;
      var step = Math.floor(t * 4);
      for (var rr = 0; rr < rows; rr++) {
        for (var cc = 0; cc < cols; cc++) {
          var idx = rr * cols + cc;
          var on = (idx + rr * 3) % 9 === step % 9;
          ctx.fillStyle = on ? "#C8FF3D" : "#2A2E34";
          ctx.fillRect(80 + cc * (cw + gap), 80 + rr * (ch + gap), cw, ch);
        }
      }
    } else if (kind === "warm-dark") {
      // A neutral gray scene recorded too dark and too warm, for the color correction lesson.
      var warm = function (g) {
        return "rgb(" + Math.round(g * 0.62 + 18) + "," + Math.round(g * 0.5 + 8) + "," + Math.round(g * 0.34) + ")";
      };
      ctx.fillStyle = warm(150);
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = warm(210);
      ctx.fillRect(140, 420, 1000, 160);
      ctx.fillStyle = warm(235);
      ctx.fillRect(560 + Math.sin(t) * 200, 180, 160, 160);
      ctx.fillStyle = warm(60);
      ctx.beginPath();
      ctx.arc(320, 260 + Math.cos(t * 1.3) * 30, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = warm(120);
      ctx.fillRect(900, 200 + Math.sin(t * 0.8) * 40, 120, 120);
    }
    // Small fade at the head and tail of every clip.
    var fade = Math.min(1, t / 0.3, (dur - t) / 0.3);
    if (fade < 1) {
      ctx.fillStyle = "rgba(0,0,0," + (1 - fade).toFixed(3) + ")";
      ctx.fillRect(0, 0, W, H);
    }
  }

  function sample(kind, t, dur) {
    var env = Math.min(1, t / 0.2, (dur - t) / 0.2);
    if (kind === "orbits") return Math.sin(2 * Math.PI * 220 * t) * 0.25 * (0.75 + 0.25 * Math.sin(2 * Math.PI * 0.5 * t)) * env;
    if (kind === "waves") {
      var f = 200 + (300 * t) / dur;
      return Math.sin(2 * Math.PI * (200 * t + (150 * t * t) / dur)) * 0.22 * env + Math.sin(2 * Math.PI * f * 1.5 * t) * 0.04 * env;
    }
    if (kind === "grid") {
      var ph = (t * 4) % 1;
      return ph < 0.12 ? Math.sin(2 * Math.PI * 660 * t) * 0.3 * (1 - ph / 0.12) : 0;
    }
    return Math.sin(2 * Math.PI * 165 * t) * 0.18 * env;
  }

  window.makeClip = async function (kind, seconds) {
    var M = window.Mp4Muxer;
    var target = new M.ArrayBufferTarget();
    var muxer = new M.Muxer({
      target: target,
      video: { codec: "avc", width: W, height: H, frameRate: FPS },
      audio: { codec: "aac", sampleRate: SR, numberOfChannels: 2 },
      fastStart: "in-memory",
      firstTimestampBehavior: "offset"
    });

    var failed = null;
    var ve = new VideoEncoder({
      output: function (chunk, meta) {
        muxer.addVideoChunk(chunk, meta);
      },
      error: function (e) {
        failed = e;
      }
    });
    ve.configure({ codec: "avc1.4d0028", width: W, height: H, bitrate: 4000000, framerate: FPS, avc: { format: "avc" } });

    var canvas = new OffscreenCanvas(W, H);
    var ctx = canvas.getContext("2d");
    var frames = seconds * FPS;
    for (var i = 0; i < frames; i++) {
      draw(kind, ctx, i / FPS, seconds);
      var frame = new VideoFrame(canvas, { timestamp: Math.round((i * 1e6) / FPS), duration: Math.round(1e6 / FPS) });
      ve.encode(frame, { keyFrame: i % FPS === 0 });
      frame.close();
      while (ve.encodeQueueSize > 8) await new Promise(function (r) { setTimeout(r, 5); });
      if (failed) throw failed;
    }
    await ve.flush();

    var ae = new AudioEncoder({
      output: function (chunk, meta) {
        muxer.addAudioChunk(chunk, meta);
      },
      error: function (e) {
        failed = e;
      }
    });
    ae.configure({ codec: "mp4a.40.2", sampleRate: SR, numberOfChannels: 2, bitrate: 128000 });
    var total = seconds * SR;
    var block = 4800;
    for (var start = 0; start < total; start += block) {
      var n = Math.min(block, total - start);
      var data = new Float32Array(n * 2);
      for (var s = 0; s < n; s++) {
        var v = sample(kind, (start + s) / SR, seconds);
        data[s] = v;
        data[n + s] = v;
      }
      var ad = new AudioData({ format: "f32-planar", sampleRate: SR, numberOfFrames: n, numberOfChannels: 2, timestamp: Math.round((start * 1e6) / SR), data: data });
      ae.encode(ad);
      ad.close();
    }
    await ae.flush();
    if (failed) throw failed;

    muxer.finalize();
    var bytes = new Uint8Array(target.buffer);
    var bin = "";
    for (var j = 0; j < bytes.length; j += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(j, j + 0x8000));
    return btoa(bin);
  };
})();
