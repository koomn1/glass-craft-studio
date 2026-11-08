import { useEffect, useState } from "react";

/** Client-side QR rendered as inline SVG (dark modules use currentColor). */
export function QrCode({ value, className = "" }: { value: string; className?: string }) {
  const [svg, setSvg] = useState("");
  useEffect(() => {
    let alive = true;
    import("qrcode").then((QR) =>
      QR.toString(value, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#000000", light: "#0000" } })
        .then((s) => alive && setSvg(s.replace(/#000000/g, "currentColor"))),
    );
    return () => { alive = false; };
  }, [value]);
  return <div role="img" aria-label="QR code" className={className} dangerouslySetInnerHTML={{ __html: svg }} />;
}
