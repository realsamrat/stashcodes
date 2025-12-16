import { ComponentProps, ReactNode, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "ghost" | "primary" | "accent";
  asChild?: boolean;
  children: ReactNode;
};

export function Button({
  className,
  variant = "ghost",
  asChild,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-white/60";
  const variants: Record<typeof variant, string> = {
    ghost: "bg-[#3c3540] border border-white/10 text-white px-3 py-2",
    primary:
      "bg-white text-black px-4 py-2 hover:bg-zinc-200 focus-visible:ring-black",
    accent: "bg-[#9a2323] text-white px-4 py-2 hover:bg-[#b62a2a]",
  };

  if (asChild && isValidElement(props.children)) {
    return cloneElement(props.children, {
      className: cn(base, variants[variant], props.children.props.className, className),
    });
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}

