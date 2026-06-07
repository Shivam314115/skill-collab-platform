import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Logo({ size = "large", className = "" }) {
  const initial = "/common/logo.png"; // served from client/public/common/logo.png
  const altSvg = "/common/logo.svg"; // optional secondary file
  const [src, setSrc] = useState(initial);
  const [triedSvg, setTriedSvg] = useState(false);

  const handleError = () => {
    if (!triedSvg) {
      setSrc(altSvg);
      setTriedSvg(true);
      console.warn("Logo.png failed to load — trying logo.svg");
      return;
    }
    // final fallback -> render inline SVG/text by clearing src
    setSrc(null);
    console.warn("Both public logo variants failed — using inline fallback");
  };

  const imgClass = size === "large" ? "w-50 h-50 md:w-28 md:h-28" : "w-40 h-40";

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      {src ? (
        <img
          src={src}
          alt="AgileAtlas"
          onError={handleError}
          className={imgClass}
        />
      ) : (
        // Inline SVG fallback so UI never shows broken-image icon
        <svg
          className={imgClass}
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="AgileAtlas"
        >
          <rect width="64" height="64" rx="12" fill="#0f172a" />
          <text
            x="50%"
            y="55%"
            fill="#10b981"
            fontSize="20"
            fontFamily="sans-serif"
            fontWeight="700"
            textAnchor="middle"
          >
            AA
          </text>
        </svg>
      )}
      <span className="ml-3 font-bold text-white">AgileAtlas</span>
    </Link>
  );
}