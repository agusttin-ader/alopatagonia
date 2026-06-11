export function canRenderInlineVideo() {
  if (typeof document === "undefined") return false;

  try {
    const video = document.createElement("video");
    const h264 = video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    const generic = video.canPlayType("video/mp4");
    return h264 === "probably" || h264 === "maybe" || generic === "probably" || generic === "maybe";
  } catch {
    return false;
  }
}

export function prefersStaticMedia() {
  if (typeof navigator === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData === true;
}

export function canPlayInlineVideo(reduceMotion: boolean | null) {
  if (reduceMotion) return false;
  return canRenderInlineVideo() && !prefersStaticMedia();
}
