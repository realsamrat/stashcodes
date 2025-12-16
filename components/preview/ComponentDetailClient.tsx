"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { ComponentItem, TweakControl } from "@/lib/types";
import { ComponentPreview } from "./ComponentPreview";
import { TweakpanePanel } from "./TweakpanePanel";
import { CodeBlock } from "../ui/CodeBlock";
import { cn } from "@/lib/utils";

type Props = {
  item: ComponentItem;
};

export function ComponentDetailClient({ item }: Props) {
  const [controls, setControls] = useState<Record<string, TweakControl>>(() =>
    (item.tweakpaneConfig ?? []).reduce((acc, control) => {
      acc[control.label] = control;
      return acc;
    }, {} as Record<string, TweakControl>),
  );

  const hasReact = Boolean(item.reactCode);
  const hasVanilla = Boolean(item.vanillaCode);
  const [tab, setTab] = useState<"react" | "vanilla">(
    hasReact ? "react" : "vanilla",
  );
  const [codeTab, setCodeTab] = useState<"install" | "usage" | "source">(
    "install",
  );
  const [showCode, setShowCode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const vanillaCombined = useMemo(() => {
    if (!item.vanillaCode) return "";
    const { html, css, js } = item.vanillaCode;
    return `${html}\n\n<style>\n${css ?? ""}\n</style>\n${
      js ? `<script>\n${js}\n</script>` : ""
    }`;
  }, [item.vanillaCode]);

  useEffect(() => {
    if (!showCode) return;
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        setShowCode(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showCode]);

  return (
    <section className="relative text-white">
      {item.tweakpaneConfig && item.tweakpaneConfig.length > 0 && (
        <TweakpanePanel
          controls={item.tweakpaneConfig}
          onChange={setControls}
          className="fixed right-6 top-6 z-50 w-72"
        />
      )}

      <ComponentPreview item={item} controls={controls} />

      {/* Code Panel Container - Fixed at bottom center */}
      <motion.div
        initial={false}
        animate={{
          width: isExpanded ? "min(90vw, 580px)" : 120,
        }}
        transition={{
          width: isExpanded 
            ? { type: "spring", stiffness: 300, damping: 28 }
            : { duration: 0.15, ease: [0.32, 0.72, 0, 1] },
        }}
        className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col overflow-hidden border border-[#393739] bg-[#121012] shadow-[0px_1px_0px_0px_#d61f1f]"
      >
        {/* Expanded Content - Tab Bar & Content Area */}
        <AnimatePresence 
          initial={false}
        >
          {showCode && (
            <motion.div
              key="code-content"
              initial={{ height: 0, opacity: 0, filter: "blur(8px)" }}
              animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
              exit={{ 
                height: 0, 
                opacity: 0, 
                filter: "blur(8px)",
                transition: {
                  height: { duration: 0.15, ease: [0.32, 0.72, 0, 1] },
                  opacity: { duration: 0.1 },
                  filter: { duration: 0.15 },
                },
              }}
              transition={{
                height: { type: "spring", stiffness: 300, damping: 28 },
                opacity: { duration: 0.15 },
                filter: { duration: 0.2 },
              }}
              style={{ minWidth: 0 }}
              className="flex flex-col overflow-hidden"
            >
              {/* Tab Bar */}
              <div className="flex shrink-0 items-center gap-3 bg-[#0a0a0a] p-3">
                {(["install", "usage", "source"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setCodeTab(key)}
                    className={cn(
                      "w-20 border px-2 py-2 font-mono text-xs font-bold uppercase tracking-[0.48px] text-[#c9c9c9] transition-colors",
                      codeTab === key
                        ? "border-[#d61f1f] bg-[#121012]"
                        : "border-[#393739] bg-[#1f1c1f] hover:border-[#d61f1f]",
                    )}
                  >
                    {key}
                  </button>
                ))}
                <div className="ml-auto flex items-center gap-1">
                  {item.githubUrl && (
                    <Link
                      href={item.githubUrl}
                      target="_blank"
                      className="rounded p-2 text-[#c9c9c9]/60 transition-colors hover:bg-white/10 hover:text-[#c9c9c9]"
                      title="View on GitHub"
                    >
                      <Icon icon="tabler:brand-github" className="h-4 w-4" />
                    </Link>
                  )}
                  {item.codepenUrl && (
                    <Link
                      href={item.codepenUrl}
                      target="_blank"
                      className="rounded p-2 text-[#c9c9c9]/60 transition-colors hover:bg-white/10 hover:text-[#c9c9c9]"
                      title="View on CodePen"
                    >
                      <Icon icon="tabler:brand-codepen" className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="max-h-[50vh] flex-1 overflow-y-auto p-4">
                {codeTab === "install" && (
                  <div className="space-y-2">
                    <CodeBlock
                      title="Install UI package"
                      code="npm install @stashcode/ui"
                      language="bash"
                    />
                    <CodeBlock
                      title="CLI (copy to your project)"
                      code={`npx stashcode add ${item.slug}`}
                      language="bash"
                    />
                  </div>
                )}

                {codeTab === "usage" && (
                  <CodeBlock
                    title="Usage"
                    code={
                      item.usageCode ??
                      `import { ${item.name.replace(/\s+/g, "")} } from "@stashcode/ui";\n\n// Add your props and render the component`
                    }
                    language="tsx"
                  />
                )}

                {codeTab === "source" && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      {hasReact && (
                        <button
                          onClick={() => setTab("react")}
                          className={cn(
                            "border px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.48px] text-[#c9c9c9] transition-colors",
                            tab === "react"
                              ? "border-[#d61f1f] bg-[#121012]"
                              : "border-[#393739] bg-[#1f1c1f] hover:border-[#d61f1f]",
                          )}
                        >
                          React
                        </button>
                      )}
                      {hasVanilla && (
                        <button
                          onClick={() => setTab("vanilla")}
                          className={cn(
                            "border px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.48px] text-[#c9c9c9] transition-colors",
                            tab === "vanilla"
                              ? "border-[#d61f1f] bg-[#121012]"
                              : "border-[#393739] bg-[#1f1c1f] hover:border-[#d61f1f]",
                          )}
                        >
                          Vanilla
                        </button>
                      )}
                    </div>

                    {tab === "react" && item.reactCode && (
                      <CodeBlock title="React" code={item.reactCode} language="tsx" />
                    )}
                    {tab === "vanilla" && item.vanillaCode && (
                      <CodeBlock
                        title="Vanilla"
                        code={vanillaCombined}
                        language="html"
                      />
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button - Always visible at bottom */}
        <button
          onClick={() => {
            const newShowCode = !showCode;
            setIsExpanded(newShowCode);
            setShowCode(newShowCode);
          }}
          className={cn(
            "flex w-full shrink-0 items-center justify-center gap-3 border-t px-3 py-3 font-mono text-xs font-bold uppercase tracking-[0.48px] text-[#c9c9c9] transition-all hover:bg-white/5",
            showCode ? "border-[#393739]" : "border-transparent"
          )}
        >
          <span className="flex items-center gap-[0.35em]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={showCode ? "hide" : "show"}
                initial={{ filter: "blur(4px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                exit={{ filter: "blur(4px)", opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              >
                {showCode ? "HIDE" : "SHOW"}
              </motion.span>
            </AnimatePresence>
            <span>CODE</span>
          </span>
          <motion.span
            animate={{ rotate: showCode ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <Icon
              icon="tabler:chevron-up"
              className="h-4 w-4"
            />
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
}
