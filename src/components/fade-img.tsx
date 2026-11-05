import { useCallback, type ImgHTMLAttributes } from "react";

/** Image that decodes off the main thread and fades in once ready (handles cached images too). */
export function FadeImg({ className = "", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (!img) return;
    const show = () => img.classList.add("is-loaded");
    if (img.complete && img.naturalWidth > 0) {
      show();
      return;
    }
    img.addEventListener("load", () => {
      if (typeof img.decode === "function") img.decode().then(show, show);
      else show();
    }, { once: true });
    img.addEventListener("error", show, { once: true });
  }, []);

  return <img ref={ref} decoding="async" {...props} className={`photo-img ${className}`} />;
}
