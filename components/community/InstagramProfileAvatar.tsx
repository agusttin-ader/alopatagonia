import { AppImage } from "@/components/media/AppImage";

import { SITE } from "@/lib/site";
import { IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

const INSTAGRAM_RING =
  "rounded-full bg-[conic-gradient(from_210deg,#833ab4_0%,#fd1d1d_28%,#fcb045_55%,#833ab4_100%)]";

const SIZE_CLASS = {
  sm: {
    outer: "size-8",
    ring: "p-[2px]",
    pad: "p-[3px]",
  },
  md: {
    outer: "size-20 sm:size-[5.25rem]",
    ring: "p-[2.5px]",
    pad: "p-1.5 sm:p-2",
  },
  lg: {
    outer: "size-[5.75rem] sm:size-[6.75rem] lg:size-[7.25rem]",
    ring: "p-[3px] sm:p-1",
    pad: "p-2 sm:p-2.5",
  },
} as const;

type InstagramProfileAvatarProps = {
  size?: keyof typeof SIZE_CLASS;
  className?: string;
  linked?: boolean;
};

export function InstagramProfileAvatar({
  size = "md",
  className,
  linked = false,
}: InstagramProfileAvatarProps) {
  const scale = SIZE_CLASS[size];

  const avatar = (
    <div className={cn(INSTAGRAM_RING, scale.outer, scale.ring, className)}>
      <div className="size-full overflow-hidden rounded-full bg-white">
        <div className={cn("flex size-full items-center justify-center", scale.pad)}>
          <AppImage
            src={SITE.logoOnLight}
            alt={SITE.name}
            width={591}
            height={586}
            sizes={IMAGE_SIZES.avatar}
            withBlur={false}
            loadingPulse={false}
            className="size-full object-contain"
          />
        </div>
      </div>
    </div>
  );

  if (!linked) return avatar;

  return (
    <a
      href={SITE.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-footer-lake"
      aria-label={`Perfil de Instagram @${SITE.instagramHandle}`}
    >
      {avatar}
    </a>
  );
}
