import fs from "node:fs";
import path from "node:path";

const WEB_IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;
const DESTINATIONS_ROOT = path.join(process.cwd(), "public/images/destinations");

export function listDestinationWebImages(relativeFolder: string): string[] {
  const absoluteFolder = path.join(DESTINATIONS_ROOT, relativeFolder);
  if (!fs.existsSync(absoluteFolder)) return [];

  const results: string[] = [];
  const walk = (directory: string) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(absolutePath);
      else if (WEB_IMAGE_PATTERN.test(entry.name)) {
        results.push(
          absolutePath
            .replace(path.join(process.cwd(), "public"), "")
            .split(path.sep)
            .join("/"),
        );
      }
    }
  };
  walk(absoluteFolder);
  return results.sort((a, b) => a.localeCompare(b, "es"));
}

export function listDestinationSubfolderImages(
  relativeFolder: string,
  subfolderMatcher: (name: string) => boolean,
): string[] {
  const absoluteFolder = path.join(DESTINATIONS_ROOT, relativeFolder);
  if (!fs.existsSync(absoluteFolder)) return [];
  const matched = fs
    .readdirSync(absoluteFolder, { withFileTypes: true })
    .find((entry) => entry.isDirectory() && subfolderMatcher(entry.name));
  if (!matched) return [];
  return listDestinationWebImages(path.join(relativeFolder, matched.name));
}
