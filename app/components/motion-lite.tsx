"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";

type MotionDivProps = ComponentPropsWithoutRef<"div"> & {
  whileHover?: unknown;
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  transition?: unknown;
};

function MotionDiv({ children, ...props }: MotionDivProps) {
  return <div {...props}>{children}</div>;
}

type AnimatePresenceProps = {
  children: ReactNode;
};

export function AnimatePresence({ children }: AnimatePresenceProps) {
  return <>{children}</>;
}

export const motion = {
  div: MotionDiv,
};
