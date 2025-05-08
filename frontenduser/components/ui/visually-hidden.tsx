// components/ui/visually-hidden.tsx
"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import classNames from "classnames";

interface VisuallyHiddenProps extends ComponentPropsWithoutRef<"span"> {
  asChild?: boolean; // Add asChild prop here
}

export const VisuallyHidden = forwardRef<
  ElementRef<"span">,
  VisuallyHiddenProps
>(({ className, children, asChild, ...props }, ref) => {
  if (asChild) {
    // If asChild is true, render children as is (no span wrapper)
    return <>{children}</>;
  }

  // Otherwise, render with the span wrapper
  return (
    <span
      ref={ref}
      className={classNames(
        "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

VisuallyHidden.displayName = "VisuallyHidden";
