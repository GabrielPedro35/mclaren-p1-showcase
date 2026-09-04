import { createRequire } from "module";
import { mkdir, readdir } from "fs/promises";
import path from "path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const ROOT = process.cwd();
const JOBS = [
  {
    srcDir: path.join(ROOT, "public", "frames"),
    destDir: path.join(ROOT, "public", "frames-webp"),
    ext: ".png",
  },
  {
    srcDir: path.join(ROOT, "public", "frames2"),
    destDir: path.join(ROOT, "public", "frames2-webp"),
    ext: ".jpg",
  },
];

const CONCURRENCY = 4;

async function convertDir({ srcDir, destDir, ext }) {
  await mkdir(destDir, { recursive: true });
  const files = (await readdir(srcDir))
    .filter((f) => f.toLowerCase().endsWith(ext))
    .sort();

  let done = 0;
  let inBytes = 0;
  let outBytes = 0;
  let i = 0;

  async function worker() {
    while (i < files.length) {
      const file = files[i++];
      const input = path.join(srcDir, file);
      const output = path.join(destDir, file.replace(ext, ".webp"));
      const info = await sharp(input)
        .webp({ quality: 90, effort: 4 })
        .toFile(output);
      const srcStat = await sharp(input).metadata();
      inBytes += Number(srcStat.size || 0);
      // sharp metadata size is unreliable for file size; use info.size for out
      outBytes += info.size;
      done++;
      if (done % 20 === 0 || done === files.length) {
        console.log(`${path.basename(srcDir)}: ${done}/${files.length}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  return { count: files.length, outBytes };
}

for (const job of JOBS) {
  const result = await convertDir(job);
  console.log(
    `done ${path.basename(job.srcDir)} → ${path.basename(job.destDir)}: ${result.count} files, ${(result.outBytes / 1024 / 1024).toFixed(1)} MB`
  );
}
