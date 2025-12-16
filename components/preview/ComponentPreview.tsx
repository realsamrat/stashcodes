"use client";

import { useMemo, useState } from "react";
import { ComponentItem, TweakControl } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  item: ComponentItem;
  controls: Record<string, TweakControl>;
};

export function ComponentPreview({ item, controls }: Props) {
  const [sliderValue, setSliderValue] = useState(50);

  const content = useMemo(() => {
    if (item.slug === "custom-slider") {
      const accentColor = (controls["Accent Color"]?.value as string) ?? "#F46066";
      const labelColor = (controls["Label Color"]?.value as string) ?? "#AD5256";
      const trackColor = (controls["Track Color"]?.value as string) ?? "#52525b";
      const thumbColor = (controls["Thumb Color"]?.value as string) ?? "#c9c9c9";
      const trackHeight = (controls["Track Height"]?.value as number) ?? 10;
      const thumbWidth = (controls["Thumb Width"]?.value as number) ?? 4;
      const thumbHeight = (controls["Thumb Height"]?.value as number) ?? 14;
      const gap = (controls["Gap"]?.value as number) ?? 6;

      const percentage = ((sliderValue - 0) / (100 - 0)) * 100;
      const trackGap = thumbWidth / 2 + gap;

      return (
        <div className="w-full max-w-xs">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-sm">
              <span style={{ color: labelColor }}>Volume: </span>
              <span style={{ color: accentColor }}>{sliderValue}</span>
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
                  left: `calc(${percentage}% - ${thumbWidth / 2}px)`,
                  width: thumbWidth,
                  height: thumbHeight,
                  backgroundColor: thumbColor,
                  transition: "left 0.08s ease-out",
                }}
              />
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="absolute inset-0 w-full cursor-grab opacity-0 active:cursor-grabbing"
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-lg border border-white/10 bg-white/5 px-6 py-5 text-white/80">
        Preview coming soon.
      </div>
    );
  }, [item.slug, controls, sliderValue]);

  return (
    <div
      className={cn(
        "preview-page-grid grid min-h-screen w-full place-items-center p-8",
      )}
    >
      {content}
    </div>
  );
}

