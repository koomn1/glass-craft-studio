import { useEffect, useState } from "react";

/** Conservative until hydration; reacts to resizing and accessibility changes. */
export function useSpatialMotion() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return enabled;
}