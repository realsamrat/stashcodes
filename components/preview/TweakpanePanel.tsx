"use client";

import { useEffect, useRef } from "react";
import { Pane } from "tweakpane";
import { TweakControl } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  controls?: TweakControl[];
  onChange: (next: Record<string, TweakControl>) => void;
  className?: string;
};

export function TweakpanePanel({ controls, onChange, className }: Props) {
  const paneRef = useRef<Pane | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!controls || controls.length === 0) return;
    if (!containerRef.current) return;

    const pane = new Pane({
      title: "Adjust Props",
      expanded: true,
      container: containerRef.current,
    });
    paneRef.current = pane;

    const controlMap: Record<string, TweakControl> = {};
    controls.forEach((control) => {
      const key = control.label;
      let input;

      if (control.type === "number") {
        input = pane.addBinding(control, "value", {
          min: control.min,
          max: control.max,
          step: control.step,
          label: control.label,
        });
      } else if (control.type === "boolean") {
        input = pane.addBinding(control, "value", { label: control.label });
      } else if (control.type === "color") {
        input = pane.addBinding(control, "value", {
          label: control.label,
          view: "color",
          expanded: false,
        });
      } else if (control.type === "string") {
        input = pane.addBinding(control, "value", {
          label: control.label,
          options:
            control.options?.reduce<Record<string, string>>((acc, option) => {
              acc[option] = option;
              return acc;
            }, {}) ?? undefined,
        });
      }

      controlMap[key] = control;

      input?.on("change", (ev) => {
        controlMap[key] = { ...controlMap[key], value: ev.value } as TweakControl;
        onChange({ ...controlMap });
      });
    });

    return () => {
      pane.dispose();
      paneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);

  if (!controls || controls.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "text-white",
        className,
      )}
    />
  );
}

