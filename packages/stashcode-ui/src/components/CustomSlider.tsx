"use client";

import * as React from "react";

export interface CustomSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  label: string;
  valueLabel: string;
  accentColor?: string;
  labelColor?: string;
  trackColor?: string;
  thumbColor?: string;
  thumbActiveColor?: string;
  trackHeight?: number;
  thumbWidth?: number;
  thumbWidthActive?: number;
  thumbHeight?: number;
  gap?: number;
}

export function CustomSlider({
  value,
  min,
  max,
  step,
  onChange,
  label,
  valueLabel,
  accentColor = "#F46066",
  labelColor = "#AD5256",
  trackColor = "#52525b",
  thumbColor = "#c9c9c9",
  thumbActiveColor = "#ffffff",
  trackHeight = 10,
  thumbWidth = 4,
  thumbWidthActive = 6,
  thumbHeight = 14,
  gap = 6,
}: CustomSliderProps) {
  const [isGrabbing, setIsGrabbing] = React.useState(false);
  const percentage = ((value - min) / (max - min)) * 100;
  const currentThumbWidth = isGrabbing ? thumbWidthActive : thumbWidth;
  const trackGap = currentThumbWidth / 2 + gap;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-mono">
        <span style={{ color: labelColor }}>{label}</span>{" "}
        <span style={{ color: accentColor }}>{valueLabel}</span>
      </label>
      <div className="relative flex h-5 items-center">
        <div
          className="absolute left-0 rounded-[2px]"
          style={{
            width: `calc(${percentage}% - ${trackGap}px)`,
            height: trackHeight,
            backgroundColor: accentColor,
            transition: "width 0.35s cubic-bezier(0.18, 1.4, 0.3, 1)",
          }}
        />
        <div
          className="absolute right-0 rounded-[2px]"
          style={{
            width: `calc(${100 - percentage}% - ${trackGap}px)`,
            height: trackHeight,
            backgroundColor: trackColor,
            transition: "width 0.4s cubic-bezier(0.2, 1.5, 0.32, 1)",
          }}
        />
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `calc(${percentage}% - ${currentThumbWidth / 2}px)`,
            width: currentThumbWidth,
            height: thumbHeight,
            backgroundColor: isGrabbing ? thumbActiveColor : thumbColor,
            transform: isGrabbing ? "scaleY(1.1)" : "scaleY(1)",
            transition:
              "left 0.08s ease-out, width 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.1s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsGrabbing(true)}
          onMouseUp={() => setIsGrabbing(false)}
          onMouseLeave={() => setIsGrabbing(false)}
          onTouchStart={() => setIsGrabbing(true)}
          onTouchEnd={() => setIsGrabbing(false)}
          className="absolute inset-0 w-full cursor-grab opacity-0 active:cursor-grabbing"
        />
      </div>
    </div>
  );
}
