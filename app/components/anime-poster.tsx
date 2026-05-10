"use client";

import { useEffect, useState } from "react";
import { fetchAnimePoster } from "./anime-utils";

type AnimePosterProps = {
  alt: string;
  src?: string;
  title?: string;
  className?: string;
};

export default function AnimePoster({ alt, src, title, className }: AnimePosterProps) {
  const [loaded, setLoaded] = useState(false);
  const [finalSrc, setFinalSrc] = useState<string>(src ?? "");

  useEffect(() => {
    if (title && !src) {
      fetchAnimePoster(title).then(setFinalSrc);
    } else if (src) {
      setFinalSrc(src);
    }
  }, [src, title]);

  return (
    <div className={`relative overflow-hidden bg-slate-900/50 ${className ?? ""}`}>
      {(!loaded || !finalSrc) ? <div className="absolute inset-0 skeleton" /> : null}
      {finalSrc && (
        <img
          src={finalSrc}
          alt={alt}
          loading="lazy"
          className={`h-full w-full object-cover transition duration-500 ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
