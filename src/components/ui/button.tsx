import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        white:
          "bg-white text-black font-semibold hover:bg-white/90 hover:shadow-lg hover:shadow-white/10",
        glass:
          "border border-white/30 bg-white/5 font-semibold text-white backdrop-blur-sm hover:bg-white/15",
        icon: "bg-transparent text-white/60 hover:bg-white/10 hover:text-white",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "px-6 sm:py-3 py-2.5 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Enable the slide-reveal hover effect on any variant */
    slideReveal?: boolean;
    /** Custom icon shown during the slide-reveal effect (defaults to ArrowRight) */
    slideIcon?: React.ReactNode;
  };

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  slideReveal = false,
  slideIcon,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  if (slideReveal) {
    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(
          buttonVariants({ variant, size, className }),
          "group relative overflow-hidden",
        )}
        {...props}
      >
        <span className="transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2.5">
          {children}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center opacity-0 translate-x-3 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0">
          {slideIcon ?? <ArrowRight className="size-4!" />}
        </span>
      </Comp>
    );
  }

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
