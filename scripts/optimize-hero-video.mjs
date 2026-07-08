/**
 * Optimiza hero.mp4, hero2…heroN para web (desktop / mobile / 720).
 * Recorta a 11s solo los clips más largos; los cortos conservan su duración.
 *
 * Fuentes (hero.mp4, hero2.mp4 …): solo desarrollo local. En producción
 * se sirven las variantes *-desktop / *-mobile-* generadas por este script.
 * Ejecutar: npm run videos:optimize-hero
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIDEOS_DIR = path.join(__dirname, "../public/videos");

/** Fuentes activas del carrusel (ver orden en lib/hero-video.ts). */
const SOURCES = ["hero2", "hero3", "hero4", "hero6", "hero7", "hero8", "hero9"];

/** Máximo por clip; los más cortos conservan su duración original. */
const MAX_CLIP_SECONDS = 11;

/** Overrides por clip (mantener hero9 acotado como el resto). */
const CLIP_MAX_OVERRIDES = {};

/** Segundos máximos para un stem dado (con override opcional). */
function maxSecondsFor(stem) {
  return CLIP_MAX_OVERRIDES[stem] ?? MAX_CLIP_SECONDS;
}

const VARIANTS = [
  {
    suffix: "desktop",
    scale: "1920:1080",
    crf: 22,
    maxrate: "9500k",
    bufsize: "19000k",
    label: "desktop 1080p",
  },
  {
    suffix: "mobile-1080",
    scale: "1920:1080",
    crf: 23,
    maxrate: "4800k",
    bufsize: "9600k",
    label: "mobile 1080p",
  },
  {
    suffix: "mobile-720",
    scale: "1280:720",
    crf: 23,
    maxrate: "2300k",
    bufsize: "4600k",
    label: "mobile 720p",
  },
];

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

function getDurationSeconds(filePath) {
  const result = spawnSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      filePath,
    ],
    { encoding: "utf8" },
  );
  if (result.status !== 0) return null;
  const value = Number.parseFloat(result.stdout.trim());
  return Number.isFinite(value) ? value : null;
}

function needsEncode(input, output) {
  if (!fs.existsSync(output)) return true;
  const outputStat = fs.statSync(output);
  if (outputStat.size < 50_000) return true;

  const inputDuration = getDurationSeconds(input);
  const outputDuration = getDurationSeconds(output);
  if (
    inputDuration != null &&
    outputDuration != null &&
    Math.abs(inputDuration - outputDuration) > 0.15
  ) {
    return true;
  }

  return fs.statSync(input).mtimeMs > outputStat.mtimeMs;
}

function trimSourceToMax(inputPath, maxSeconds) {
  const tmpPath = `${inputPath}.trim.tmp.mp4`;
  const args = [
    "-y",
    "-i",
    inputPath,
    "-t",
    String(maxSeconds),
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    "18",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    tmpPath,
  ];

  const result = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (result.status !== 0) {
    fs.rmSync(tmpPath, { force: true });
    throw new Error(`ffmpeg falló al recortar ${path.basename(inputPath)}`);
  }

  fs.renameSync(tmpPath, inputPath);
}

function prepareSource(stem) {
  const inputPath = path.join(VIDEOS_DIR, `${stem}.mp4`);
  if (!fs.existsSync(inputPath)) {
    console.warn(`↷ omitido ${stem}.mp4 (no existe)`);
    return null;
  }

  const duration = getDurationSeconds(inputPath);
  if (duration == null) {
    throw new Error(`No se pudo leer la duración de ${stem}.mp4`);
  }

  const maxSeconds = maxSecondsFor(stem);
  if (duration > maxSeconds + 0.05) {
    console.log(
      `→ ${stem}.mp4 (${duration.toFixed(2)}s) — recorta a ${maxSeconds}s`,
    );
    trimSourceToMax(inputPath, maxSeconds);
    const trimmed = getDurationSeconds(inputPath);
    console.log(`  recortado: ${trimmed?.toFixed(2) ?? "?"}s\n`);
    return trimmed ?? maxSeconds;
  }

  console.log(`↷ ${stem}.mp4: ${duration.toFixed(2)}s (sin recorte)\n`);
  return duration;
}

function runFfmpeg({ input, output, scale, crf, maxrate, bufsize, maxSeconds }) {
  const args = ["-y", "-i", input, "-an"];

  if (maxSeconds != null) {
    args.push("-t", String(maxSeconds));
  }

  args.push(
    "-vf",
    `fps=30000/1001,scale=${scale}:flags=lanczos`,
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    String(crf),
    "-maxrate",
    maxrate,
    "-bufsize",
    bufsize,
    "-profile:v",
    "main",
    "-pix_fmt",
    "yuv420p",
    "-g",
    "30",
    "-keyint_min",
    "30",
    "-sc_threshold",
    "0",
    "-movflags",
    "+faststart",
    output,
  );

  const result = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`ffmpeg falló al generar ${path.basename(output)}`);
  }
}

function optimizeSource(stem, clipSeconds) {
  const input = path.join(VIDEOS_DIR, `${stem}.mp4`);
  if (!fs.existsSync(input)) return;

  const sourceSize = fs.statSync(input).size;
  console.log(
    `━━ ${stem}.mp4 (${formatBytes(sourceSize)}, ${clipSeconds.toFixed(2)}s) ━━`,
  );

  const maxSeconds = maxSecondsFor(stem);
  const encodeMax = clipSeconds > maxSeconds + 0.05 ? maxSeconds : null;

  for (const variant of VARIANTS) {
    const outputName = `${stem}-${variant.suffix}.mp4`;
    const outputPath = path.join(VIDEOS_DIR, outputName);

    if (!needsEncode(input, outputPath)) {
      console.log(
        `↷ ${outputName} ya está al día (${formatBytes(fs.statSync(outputPath).size)})\n`,
      );
      continue;
    }

    console.log(
      `→ ${variant.label} → ${outputName} (CRF ${variant.crf}, max ${variant.maxrate})`,
    );
    runFfmpeg({
      input,
      output: outputPath,
      scale: variant.scale,
      crf: variant.crf,
      maxrate: variant.maxrate,
      bufsize: variant.bufsize,
      maxSeconds: encodeMax,
    });
    console.log(`  listo: ${formatBytes(fs.statSync(outputPath).size)}\n`);
  }
}

function main() {
  const present = SOURCES.filter((stem) =>
    fs.existsSync(path.join(VIDEOS_DIR, `${stem}.mp4`)),
  );
  if (present.length === 0) {
    console.error("No hay hero.mp4 / hero2.mp4 … en public/videos/");
    process.exit(1);
  }

  console.log(
    `Recortando (máx ${MAX_CLIP_SECONDS}s) y optimizando ${present.length} videos hero (${present.join(" → ")})…\n`,
  );

  const durations = new Map();
  for (const stem of SOURCES) {
    const duration = prepareSource(stem);
    if (duration != null) durations.set(stem, duration);
  }

  for (const stem of SOURCES) {
    const duration = durations.get(stem);
    if (duration == null) continue;
    optimizeSource(stem, duration);
  }

  console.log("Listo. Carrusel: hero → hero2 → … en lib/hero-video.ts");
}

main();
