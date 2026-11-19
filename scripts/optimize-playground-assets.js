const sharp = require("sharp");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const srcDir = String.raw`W:\pLAYGROUND PICS`;
const outDir = path.join(__dirname, "..", "public", "playground");

fs.mkdirSync(outDir, { recursive: true });

function ffmpeg(...args) {
  execFileSync("ffmpeg", args, { stdio: "inherit" });
}

function ffprobeJson(input) {
  const out = execFileSync(
    "ffprobe",
    ["-v", "error", "-print_format", "json", "-show_format", "-show_streams", input],
    { encoding: "utf8" },
  );
  return JSON.parse(out);
}

function pickAspect(w, h) {
  const r = w / h;
  if (Math.abs(r - 1) < 0.08) return "1x1";
  if (r > 1.2) return "4x3";
  return "4x5";
}

function displaySize(video) {
  // Prefer coded size; apply QuickTime display-matrix rotation when present.
  let w = Number(video.width || 0);
  let h = Number(video.height || 0);
  const side = video.side_data_list?.find((s) => s.rotation != null);
  const rot = Math.abs(Number(side?.rotation || 0));
  if (rot === 90 || rot === 270) [w, h] = [h, w];
  return { width: w, height: h };
}

async function optimizePhoto() {
  const input = path.join(srcDir, "IMG_8116.jpeg");
  const outName = "rivited-01.webp";
  const output = path.join(outDir, outName);
  const resized = await sharp(input)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(output);
  const kb = Math.round(fs.statSync(output).size / 1024);
  console.log(`${outName}: ${resized.width}x${resized.height} ${kb}KB`);
  return {
    id: "rivited-01",
    kind: "image",
    caption: "RIVITED_01.JPG",
    src: `/playground/${outName}`,
    width: resized.width,
    height: resized.height,
    variant: pickAspect(resized.width, resized.height),
    kb,
  };
}

function optimizeVideo({ inputName, outBase, caption, maxSeconds = 15 }) {
  const input = path.join(srcDir, inputName);
  const mp4Name = `${outBase}.mp4`;
  const posterPng = path.join(outDir, `${outBase}-poster.png`);
  const posterName = `${outBase}-poster.webp`;
  const mp4Out = path.join(outDir, mp4Name);
  const posterOut = path.join(outDir, posterName);

  const info = ffprobeJson(input);
  const video = info.streams.find((s) => s.codec_type === "video");
  const duration = Number(video?.duration || info.format?.duration || 0);
  const { width, height } = displaySize(video);
  const clipTo = Math.min(duration || maxSeconds, maxSeconds);

  // Autodetect rotation from phone MOV metadata; long edge capped at 1080; muted for grid loops.
  ffmpeg(
    "-y",
    "-i",
    input,
    "-t",
    String(clipTo),
    "-vf",
    "scale='min(1080,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-profile:v",
    "high",
    "-level",
    "4.0",
    "-crf",
    "28",
    "-preset",
    "medium",
    "-movflags",
    "+faststart",
    "-an",
    mp4Out,
  );

  const posterAt = Math.min(0.5, Math.max(0, clipTo * 0.1));
  ffmpeg("-y", "-ss", String(posterAt), "-i", mp4Out, "-frames:v", "1", posterPng);

  const mp4Kb = Math.round(fs.statSync(mp4Out).size / 1024);
  console.log(
    `${mp4Name}: display ${width}x${height} ${duration.toFixed(1)}s → ${clipTo.toFixed(1)}s, ${mp4Kb}KB`,
  );

  return {
    id: outBase,
    kind: "video",
    caption,
    src: `/playground/${mp4Name}`,
    poster: `/playground/${posterName}`,
    posterPng,
    posterOut,
    sourceWidth: width,
    sourceHeight: height,
    durationSec: clipTo,
    variant: pickAspect(width, height),
    kb: mp4Kb,
  };
}

async function refinePoster(entry) {
  if (entry.kind !== "video") return entry;
  const meta = await sharp(entry.posterPng)
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(entry.posterOut);
  fs.unlinkSync(entry.posterPng);
  delete entry.posterPng;
  delete entry.posterOut;
  entry.width = meta.width;
  entry.height = meta.height;
  entry.variant = pickAspect(meta.width, meta.height);
  entry.posterKb = Math.round(fs.statSync(path.join(outDir, path.basename(entry.poster))).size / 1024);
  console.log(`poster ${path.basename(entry.poster)}: ${entry.width}x${entry.height} ${entry.posterKb}KB`);
  return entry;
}

(async () => {
  const manifest = [];

  manifest.push(await optimizePhoto());

  const videos = [
    {
      inputName: "IMG_8191.MOV",
      outBase: "rivited-02",
      caption: "RIVITED_02.MP4",
      maxSeconds: 12,
    },
    {
      inputName: "RIVETED60secs 2 2 2.MOV",
      outBase: "rivited-03",
      caption: "RIVITED_03.MP4",
      maxSeconds: 15,
    },
  ];

  for (const v of videos) {
    const entry = optimizeVideo(v);
    manifest.push(await refinePoster(entry));
  }

  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log("\nDone.");
  console.log(JSON.stringify(manifest, null, 2));
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
