"use client";

import { ComponentPropsWithoutRef } from "react";

type IconProps = ComponentPropsWithoutRef<"svg">;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Search = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Icon>
);
export const Home = (props: IconProps) => <Icon {...props}><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></Icon>;
export const Sparkles = (props: IconProps) => <Icon {...props}><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8zM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8z" /></Icon>;
export const CalendarDays = (props: IconProps) => <Icon {...props}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></Icon>;
export const Compass = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" /></Icon>;
export const Clapperboard = (props: IconProps) => <Icon {...props}><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M3 11h18M7 7l3 4M12 7l3 4M17 7l3 4" /></Icon>;
export const Tv2 = (props: IconProps) => <Icon {...props}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M8 21h8M12 18v3" /></Icon>;
export const UserCircle2 = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="9" r="3" /><path d="M6.5 18c1.4-2.5 3-3.5 5.5-3.5S16.1 15.5 17.5 18" /></Icon>;
export const Play = (props: IconProps) => <Icon {...props}><path d="m9 7 9 5-9 5z" /></Icon>;
export const Plus = (props: IconProps) => <Icon {...props}><path d="M12 5v14M5 12h14" /></Icon>;
export const Star = (props: IconProps) => <Icon {...props}><path d="m12 3 2.8 5.7L21 9.6l-4.5 4.2L17.6 21 12 18.1 6.4 21l1.1-7.2L3 9.6l6.2-.9z" /></Icon>;
export const Clock3 = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
export const Heart = (props: IconProps) => <Icon {...props}><path d="M20.5 8.2c0 5.8-8.5 11-8.5 11s-8.5-5.2-8.5-11A4.7 4.7 0 0 1 12 5a4.7 4.7 0 0 1 8.5 3.2z" /></Icon>;
export const Share2 = (props: IconProps) => <Icon {...props}><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="M8.2 11 15.8 6.1M8.2 13 15.8 17.9" /></Icon>;
export const FastForward = (props: IconProps) => <Icon {...props}><path d="m4 6 8 6-8 6zM12 6l8 6-8 6z" /></Icon>;
export const Maximize = (props: IconProps) => <Icon {...props}><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5" /></Icon>;
export const Minimize = (props: IconProps) => <Icon {...props}><path d="M8 3v5H3M21 8h-5V3M3 16h5v5M16 21v-5h5" /></Icon>;
export const SkipBack = (props: IconProps) => <Icon {...props}><path d="M19 18 9 12l10-6zM5 6v12" /></Icon>;
export const SkipForward = (props: IconProps) => <Icon {...props}><path d="m5 18 10-6L5 6zM19 6v12" /></Icon>;
export const Subtitles = (props: IconProps) => <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M6 12h5M14 12h4M6 15h4M12 15h6" /></Icon>;
export const Volume2 = (props: IconProps) => <Icon {...props}><path d="M11 5 7 9H4v6h3l4 4zM16 9c1.2 1 1.8 1.9 1.8 3s-.6 2-1.8 3M18.8 6.5c2 1.7 3.2 3.5 3.2 5.5s-1.2 3.8-3.2 5.5" /></Icon>;
