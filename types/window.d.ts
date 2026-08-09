export {};

declare global {
  interface Window {
    __aloIntroReveal?: boolean;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
