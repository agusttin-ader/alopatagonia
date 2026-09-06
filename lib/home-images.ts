import { DEFAULT_IMAGE_FALLBACK } from "@/lib/image-fallbacks";
import generated from "@/lib/generated/home-images.json";

export type HomeImagesManifest = {
  generatedAt: string;
  home: string[];
  instagram: string[];
  hero: string;
  experience: string;
};

const manifest = generated as HomeImagesManifest;

const FALLBACK = DEFAULT_IMAGE_FALLBACK;

export function getHomeImagePaths(): string[] {
  return manifest.home.length > 0 ? manifest.home : [FALLBACK];
}

export function getInstagramImagePaths(): string[] {
  return manifest.instagram.length > 0 ? manifest.instagram : getHomeImagePaths();
}

export function getHomeHeroImagePath(): string {
  return manifest.hero || FALLBACK;
}

export function getHomeExperienceImagePath(): string {
  return manifest.experience || manifest.hero || FALLBACK;
}
