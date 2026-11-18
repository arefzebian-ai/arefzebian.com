const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const srcDir = String.raw`W:\Halv Process`;
const outDir = String.raw`W:\arefzebian.com\public\halv\process`;

/**
 * Process order. `crop` is a 0–1 zoom factor (1 = full frame).
 * Lower values crop in toward the center — used for the CAD models sheet.
 */
const files = [
  { name: "106_1954.JPG" },
  { name: "DSC_0212.jpg" },
  { name: "HALV PROCESS.57 2.jpg", crop: 0.62 }, // gray CAD models — crop in
  { name: "Fabric TV 1.41.JPG" },
  { name: "IMG_2233 2.jpg" },
  { name: "IMG_2735.jpg" },
  { name: "IMG_2840 9.jpg" },
  { name: "IMG_2840 10.jpg" },
  { name: "IMG_2840 11.jpg" },
  { name: "IMG_2844.jpeg" },
  { name: "IMG_7379 6.jpg" },
];

const MAX = 1600;
const QUALITY = 82;

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  // Clear previous webps so numbering stays clean
  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith(".webp") || f === "manifest.json") fs.unlinkSync(path.join(outDir, f));
  }

  const manifest = [];
  for (let i = 0; i < files.length; i++) {
    const { name, crop = 1 } = files[i];
    const input = path.join(srcDir, name);
    const outName = `halv-process-${String(i + 1).padStart(2, "0")}.webp`;
    const output = path.join(outDir, outName);

    let pipeline = sharp(input).rotate();
    const meta = await pipeline.metadata();
    const width = meta.width || 0;
    const height = meta.height || 0;

    if (crop < 1 && width && height) {
      const w = Math.round(width * crop);
      const h = Math.round(height * crop);
      const left = Math.round((width - w) / 2);
      const top = Math.round((height - h) / 2);
      pipeline = sharp(input).rotate().extract({ left, top, width: w, height: h });
    } else {
      pipeline = sharp(input).rotate();
    }

    const resized = await pipeline
      .resize({
        width: MAX,
        height: MAX,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(output);

    const stat = fs.statSync(output);
    manifest.push({
      id: `halv-process-${i + 1}`,
      src: `/halv/process/${outName}`,
      alt: `Halv process ${i + 1}`,
      width: resized.width,
      height: resized.height,
      kb: Math.round(stat.size / 1024),
      from: name,
      crop,
    });
    console.log(
      `${outName}: ${resized.width}x${resized.height} ${Math.round(stat.size / 1024)}KB (from ${name}${crop < 1 ? `, crop ${crop}` : ""})`,
    );
  }
  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log("done", manifest.length);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
