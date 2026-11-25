import React from 'react';

// Cloudinary Hosted Logo URL for FANFUN
export const BRAND_LOGO_URL = "https://res.cloudinary.com/dpfy23tda/image/upload/v1795491999/qccne0kbalqvdzbprjpf.jpg";

export default function BrandLogo({
  size = "md",
  showSubtitle = true,
  subtitle = "Art of Air",
  theme = "light",
}) {
  const sizeMap = {
    sm: { img: "w-8 h-8 rounded-md", title: "text-base", sub: "text-[9px]" },
    md: { img: "w-9 h-9 rounded-lg", title: "text-lg", sub: "text-[10px]" },
    lg: { img: "w-11 h-11 rounded-xl", title: "text-xl", sub: "text-[11px]" },
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const titleColor = theme === "dark" ? "text-[#f9efe4]" : "text-on-surface";
  const subColor = theme === "dark" ? "text-[#d5c3b6]" : "text-on-surface-variant";

  return (
    <div className="flex items-center gap-2.5">
      <img
        src={BRAND_LOGO_URL}
        alt="FANFUN Smart Living Logo"
        className={`${currentSize.img} object-contain transition-opacity duration-200 group-hover:opacity-90`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/logo.jpg';
        }}
      />
      <div className="flex flex-col">
        <span className={`${currentSize.title} font-bold tracking-tight ${titleColor} leading-tight`}>
          FANFUN
        </span>
        {showSubtitle && (
          <span className={`${currentSize.sub} ${subColor} uppercase tracking-[0.14em] font-medium`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
