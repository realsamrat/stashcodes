"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { ComponentItem } from "@/lib/types";
import { ComponentCard } from "./ComponentCard";
import { cn } from "@/lib/utils";

type ViewMode = "gallery" | "list";

type Props = {
  components: ComponentItem[];
};

export function ComponentList({ components }: Props) {
  const [view, setView] = useState<ViewMode>("gallery");

  return (
    <div className="flex w-full flex-col gap-6">
      {/* View Toggle */}
      <div className="flex items-center justify-end gap-1">
        <button
          onClick={() => setView("gallery")}
          className={cn(
            "rounded p-2 transition-colors",
            view === "gallery"
              ? "bg-white/10 text-white"
              : "text-white/40 hover:text-white/60"
          )}
          title="Gallery view"
        >
          <Icon icon="tabler:layout-grid" className="h-4 w-4" />
        </button>
        <button
          onClick={() => setView("list")}
          className={cn(
            "rounded p-2 transition-colors",
            view === "list"
              ? "bg-white/10 text-white"
              : "text-white/40 hover:text-white/60"
          )}
          title="List view"
        >
          <Icon icon="tabler:list" className="h-4 w-4" />
        </button>
      </div>

      {/* Components Grid/List */}
      <div
        className={cn(
          "w-full",
          view === "gallery"
            ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-3"
        )}
      >
        {components.map((item) => (
          <ComponentCard key={item.id} item={item} view={view} />
        ))}
      </div>
    </div>
  );
}
