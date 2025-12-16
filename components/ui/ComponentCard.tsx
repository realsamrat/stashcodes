"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ComponentItem } from "@/lib/types";

type Props = {
  item: ComponentItem;
  view?: "gallery" | "list";
};

export function ComponentCard({ item, view = "gallery" }: Props) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  if (view === "list") {
    return (
      <>
        <Link
          href={`/components/${item.slug}`}
          className="group flex w-full cursor-pointer items-center gap-3 rounded-lg border border-[#424242] bg-[#0a0a0a] px-3 py-2 transition-colors hover:border-white/20 hover:bg-white/5"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Content */}
          <div className="flex flex-1 items-center gap-3">
            <h3 className="font-mono text-sm font-medium text-white">{item.name}</h3>
            <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/50">
              {item.category}
            </span>
            <p className="line-clamp-1 flex-1 text-xs text-white/40">{item.description}</p>
          </div>
        </Link>

        {/* Hover Preview Card - follows cursor */}
        {item.previewImage && isHovering && (
          <div
            className="pointer-events-none fixed z-50"
            style={{
              left: mousePos.x + 16,
              top: mousePos.y - 180,
            }}
          >
            <div className="w-[240px] overflow-hidden rounded-lg border border-[#424242] bg-[#0a0a0a] shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="relative h-[140px] w-full">
                <Image
                  src={item.previewImage}
                  alt={item.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="border-t border-[#424242] bg-[#0a0a0a] px-3 py-2">
                <p className="font-mono text-xs text-white/70">{item.name}</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <Link
      href={`/components/${item.slug}`}
      className="group relative h-[232px] w-full max-w-[280px] cursor-pointer overflow-hidden rounded-lg border border-[#424242] bg-[#0a0a0a] shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-1"
    >
      {/* Thumbnail */}
      {item.previewImage && (
        <div className="absolute inset-x-0 top-0 h-[140px] overflow-hidden">
          <Image
            src={item.previewImage}
            alt={item.name}
            fill
            className="object-cover object-center"
          />
        </div>
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end gap-2 p-4">
        <span className="w-fit rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/50">
          {item.category}
        </span>
        <h3 className="font-mono text-sm font-medium text-white">{item.name}</h3>
        <p className="line-clamp-2 text-xs text-white/50">{item.description}</p>
      </div>
    </Link>
  );
}
