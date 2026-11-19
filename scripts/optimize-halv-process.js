/**
 * Crop + optimize Halv process slides to Playground's three ratios
 * (4x5, 1x1, 4x3), picking the closest match for each base image.
 *
 * Usage:
 *   node scripts/optimize-halv-process.js
 *   SRC_DIR=/path/to/originals node scripts/optimize-halv-process.js
 *
 * Defaults to re-cropping the existing webps in public/halv/process.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "halv", "process");
const srcDir = process.env.SRC_DIR || outDir;

/** PlaygroundItem variants — width/height. */
const RATIOS = {
  "4x5": 4 / 5,
  "1x1": 1,
  "4x3": 4 / 3,
};

/**
 * Ordered slide list. `from` is the preferred original filename when SRC_DIR
 * has originals; otherwise the matching webp is used. Optional `ratio` locks
 * the Playground variant; otherwise the closest match is chosen from the
 * base image. Optional `position` biases the cover crop (sharp gravity).
 */
const files = [
  { from: "106_1954.JPG", webp: "halv-process-01.webp", alt: "Halv process — fabrication" },
  { from: "DSC_0212.jpg", webp: "halv-process-02.webp", alt: "Halv process — detailing", position: "left" },
  // Wide CAD sheet: lock 4x3 so empty top/bottom falls away (1x1 left too much void).
  { from: "HALV PROCESS.57 2.jpg", webp: "halv-process-03.webp", alt: "Halv process — CAD form studies", zoom: 0.62, ratio: "4x3", position: "centre" },
  { from: "Fabric TV 1.41.JPG", webp: "halv-process-04.webp", alt: "Halv process — fabric TV study", position: "attention" },
  { from: "IMG_2233 2.jpg", webp: "halv-process-05.webp", alt: "Halv process — assembly" },
  { from: "IMG_2735.jpg", webp: "halv-process-06.webp", alt: "Halv process — workshop" },
  { from: "IMG_2840 9.jpg", webp: "halv-process-07.webp", alt: "Halv process — finish work" },
  { from: "IMG_2840 10.jpg", webp: "halv-process-08.webp", alt: "Halv process — fitting" },
  { from: "IMG_2840 11.jpg", webp: "halv-process-09.webp", alt: "Halv process — prototype" },
  { from: "IMG_2844.jpeg", webp: "halv-process-10.webp", alt: "Halv process — build detail" },
  { from: "IMG_7379 6.jpg", webp: "halv-process-11.webp", alt: "Halv process — build" },
];

const MAX = 1600;
const QUALITY = 82;

function closestRatio(width, height) {
  const r = width / height;
  let best = "1x1";
  let bestDelta = Number.POSITIVE_INFINITY;
  for (const [name, value] of Object.entries(RATIOS)) {
    const delta = Math.abs(value - r);
    if (delta < bestDelta) {
      bestDelta = delta;
      best = name;
    }
  }
  return { name: best, value: RATIOS[best], delta: bestDelta, source: r };
}

function resolveInput(entry) {
  const original = path.join(srcDir, entry.from);
  if (fs.existsSync(original) && path.resolve(srcDir) !== path.resolve(outDir)) {
    return { input: original, isOriginal: true };
  }
  // Prefer an untouched original even when SRC_DIR === outDir (Windows path case).
  if (fs.existsSync(original) && !entry.from.endsWith(".webp")) {
    return { input: original, isOriginal: true };
  }
  const webp = path.join(outDir, entry.webp);
  if (fs.existsSync(webp)) return { input: webp, isOriginal: false };
  throw new Error(`Missing source for ${entry.webp} (looked for ${entry.from} and existing webp)`);
}

async function loadOriented(input) {
  // Buffer so we can re-open after metadata without re-reading path quirks.
  const buffer = await sharp(input).rotate().toBuffer();
  const meta = await sharp(buffer).metadata();
  return { buffer, width: meta.width || 0, height: meta.height || 0 };
}

async function maybeZoom(buffer, width, height, zoom = 1) {
  if (!(zoom < 1) || !width || !height) return { buffer, width, height };
  const w = Math.round(width * zoom);
  const h = Math.round(height * zoom);
  const left = Math.round((width - w) / 2);
  const top = Math.round((height - h) / 2);
  const next = await sharp(buffer).extract({ left, top, width: w, height: h }).toBuffer();
  return { buffer: next, width: w, height: h };
}

/** Extract max cover rect for the target ratio, then fit inside MAX. */
async function cropToRatioClean(buffer, width, height, ratioValue, position = "centre") {
  let cropW;
  let cropH;
  if (width / height > ratioValue) {
    cropH = height;
    cropW = Math.round(height * ratioValue);
  } else {
    cropW = width;
    cropH = Math.round(width / ratioValue);
  }

  // Gravity-style extract for simple positions; attention/entropy use sharp cover.
  const useGravity = position === "attention" || position === "entropy";
  let cropped;
  if (useGravity) {
    cropped = await sharp(buffer)
      .resize({ width: cropW, height: cropH, fit: "cover", position })
      .toBuffer();
  } else {
    let left = Math.round((width - cropW) / 2);
    let top = Math.round((height - cropH) / 2);
    if (position === "left") left = Math.max(0, Math.round((width - cropW) * 0.2));
    if (position === "right") left = Math.max(0, Math.round((width - cropW) * 0.8));
    if (position === "top") top = Math.max(0, Math.round((height - cropH) * 0.2));
    if (position === "bottom") top = Math.max(0, Math.round((height - cropH) * 0.8));
    left = Math.min(Math.max(0, left), Math.max(0, width - cropW));
    top = Math.min(Math.max(0, top), Math.max(0, height - cropH));
    cropped = await sharp(buffer).extract({ left, top, width: cropW, height: cropH }).toBuffer();
  }

  const out = await sharp(cropped)
    .resize({
      width: MAX,
      height: MAX,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer({ resolveWithObject: true });

  return out;
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });

  // Work into a temp folder so we can read existing webps as sources safely.
  const tmpDir = fs.mkdtempSync(path.join(require("os").tmpdir(), "halv-process-"));
  const manifest = [];

  for (let i = 0; i < files.length; i++) {
    const entry = files[i];
    const { input, isOriginal } = resolveInput(entry);
    const outName = `halv-process-${String(i + 1).padStart(2, "0")}.webp`;
    const output = path.join(tmpDir, outName);

    let { buffer, width, height } = await loadOriented(input);
    // Zoom (CAD sheet crop-in) only applies to originals — webps are already zoomed.
    const zoom = isOriginal ? entry.zoom ?? 1 : 1;
    ({ buffer, width, height } = await maybeZoom(buffer, width, height, zoom));

    const picked = entry.ratio
      ? { name: entry.ratio, value: RATIOS[entry.ratio], delta: null, source: width / height }
      : closestRatio(width, height);

    const position = entry.position ?? (Math.abs(picked.source - picked.value) > 0.08 ? "attention" : "centre");
    const { data, info } = await cropToRatioClean(buffer, width, height, picked.value, position);
    fs.writeFileSync(output, data);

    manifest.push({
      id: `halv-process-${i + 1}`,
      src: `/halv/process/${outName}`,
      alt: entry.alt,
      width: info.width,
      height: info.height,
      kb: Math.round(info.size / 1024),
      from: path.basename(input),
      ratio: picked.name,
      sourceRatio: Number(picked.source.toFixed(3)),
      position,
      zoom: entry.zoom ?? 1,
    });

    console.log(
      `${outName}: ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB ` +
        `ratio=${picked.name} (src ${picked.source.toFixed(3)} → ${picked.value.toFixed(3)}, ${position})`,
    );
  }

  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith(".webp") || f === "manifest.json") fs.unlinkSync(path.join(outDir, f));
  }
  for (const f of fs.readdirSync(tmpDir)) {
    fs.renameSync(path.join(tmpDir, f), path.join(outDir, f));
  }
  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log("done", manifest.length);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
