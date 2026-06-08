import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function ButtonColorful({
  className,
  label = "Explore Components",
  ...props
}: ButtonColorfulProps) {
  return (
    <Button
      className={cn(
        "relative h-11 px-6 overflow-hidden rounded-md",
        "bg-[#0b0f14] dark:bg-[#0b0f14]",
        "transition-all duration-200",
        "group",
        className
      )}
      {...props}
    >
      {/* Gradient background effect — coral-led to stay on brand */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-r from-[#ff553d] via-[#ff7a4d] to-[#ff553d]",
          "opacity-50 group-hover:opacity-90",
          "blur transition-opacity duration-500"
        )}
      />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        <span className="text-white">{label}</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/90 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Button>
  );
}
