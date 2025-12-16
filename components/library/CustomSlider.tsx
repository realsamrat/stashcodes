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
  /** Main accent color for the filled track */
  accentColor?: string;
  /** Label accent color (lighter shade) */
  labelColor?: string;
  /** Unfilled track color */
  trackColor?: string;
  /** Thumb color when idle */
  thumbColor?: string;
  /** Thumb color when grabbed */
  thumbActiveColor?: string;
  /** Track height in pixels */
  trackHeight?: number;
  /** Thumb width when idle */
  thumbWidth?: number;
  /** Thumb width when grabbed */
  thumbWidthActive?: number;
  /** Thumb height in pixels */
  thumbHeight?: number;
  /** Gap between thumb and track ends */
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
        <span style={{ color: labelColor }}>{label}</span>
        <span style={{ color: accentColor }}>{valueLabel}</span>
      </label>
      <div className="relative h-5 flex items-center">
        {/* Filled track (left of thumb, with gap) */}
        <div
          className="absolute left-0 rounded-[2px]"
          style={{
            width: `calc(${percentage}% - ${trackGap}px)`,
            height: trackHeight,
            backgroundColor: accentColor,
            transition: "width 0.35s cubic-bezier(0.18, 1.4, 0.3, 1)",
          }}
        />

        {/* Unfilled track (right of thumb, with gap) */}
        <div
          className="absolute right-0 rounded-[2px]"
          style={{
            width: `calc(${100 - percentage}% - ${trackGap}px)`,
            height: trackHeight,
            backgroundColor: trackColor,
            transition: "width 0.4s cubic-bezier(0.2, 1.5, 0.32, 1)",
          }}
        />

        {/* Thumb */}
        <div
          className="absolute rounded-full pointer-events-none"
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

        {/* Invisible input for interaction */}
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
          className="absolute inset-0 w-full opacity-0 cursor-grab active:cursor-grabbing"
        />
      </div>
    </div>
  );
}

export default CustomSlider;

