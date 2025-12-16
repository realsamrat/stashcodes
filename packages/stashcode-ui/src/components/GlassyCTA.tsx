"use client";

import * as React from "react";

export type GlassyCTAProps = {
  label?: string;
  tone?: string;
  radius?: number;
  padding?: string;
};

export function GlassyCTA({
  label = "Get Started",
  tone = "#9a2323",
  radius = 12,
  padding = "14px 20px",
}: GlassyCTAProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.08)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: radius,
        padding,
        boxShadow: hovered
          ? `0 18px 60px ${tone}55`
          : `0 10px 45px ${tone}33`,
        transition: "transform 120ms ease, box-shadow 160ms ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      {label}
    </button>
  );
}
