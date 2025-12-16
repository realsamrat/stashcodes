"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  title: string;
  code: string;
  language?: string;
  className?: string;
};

export function CodeBlock({
  title,
  code,
  language,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for older browsers or insecure contexts
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 800);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      try {
        const html = await codeToHtml(code, {
          lang: language ?? "tsx",
          theme: "vitesse-dark",
        });
        if (isMounted) setHighlighted(html);
      } catch {
        if (isMounted) setHighlighted(null);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [code, language]);

  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-[#0f0e0f] p-4 text-white shadow-inner",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between text-sm text-white/70">
        <span>{title}</span>
        <div className="flex items-center gap-2">
          {language && (
            <span className="rounded bg-white/10 px-2 py-1 text-xs">
              {language}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            title="Copy code"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.6, opacity: 0, filter: "blur(3px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  exit={{ scale: 0.6, opacity: 0, filter: "blur(3px)" }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                >
                  <Icon icon="tabler:check" className="h-4 w-4 text-green-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.6, opacity: 0, filter: "blur(3px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  exit={{ scale: 0.6, opacity: 0, filter: "blur(3px)" }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                >
                  <Icon icon="tabler:copy" className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
      {highlighted ? (
        <div
          className="shiki overflow-x-auto rounded-md text-xs leading-6 text-white/90"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      ) : (
        <pre className="overflow-x-auto rounded-md bg-white/5 px-3 py-2 text-xs leading-6 text-white/90">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

