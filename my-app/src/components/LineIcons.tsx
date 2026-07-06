// src/components/LineIcons.tsx
// Small hand-drawn-style line icons matching the site's existing stroke family
// (see the padlock in PasswordGate/Home, the replay icon in Home, the MoreWork
// arrows): ~1.6px stroke, currentColor, round caps/joins, 24x24 viewBox.
// Sized at 1em so they inherit the font-size of the emoji slots they replace.
import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

function Svg({ children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Terminal window — AI coding tools (replaces 🤖 / 💻) */
export const TerminalIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4.5" width="18" height="15" rx="2.4" />
    <path d="M7 9.5l2.6 2.5L7 14.5" />
    <path d="M12.5 14.5H17" />
  </Svg>
);

/** Pencil — editors / Cursor (replaces ✏️) */
export const PencilIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M17 3.8a2.3 2.3 0 0 1 3.2 3.2L7.6 19.6 3 21l1.4-4.6L17 3.8z" />
    <path d="M14.8 6l3.2 3.2" />
  </Svg>
);

/** Up-right arrow — launch / deploy (replaces 🚀) */
export const LaunchIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17L17 7" />
    <path d="M9 7h8v8" />
  </Svg>
);

/** Frame / crop marks — design tools, Figma (replaces 🎨) */
export const FrameIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 4v16" />
    <path d="M15 4v16" />
    <path d="M4 9h16" />
    <path d="M4 15h16" />
  </Svg>
);

/** Flask — testing / Maze (replaces 🧪) */
export const FlaskIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9.5 3.5v5.2L4.8 17a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3l-4.7-8.3V3.5" />
    <path d="M8 3.5h8" />
    <path d="M7.4 14.5h9.2" />
  </Svg>
);

/** Folder — organizing / taxonomy / FigJam (replaces 🗂️) */
export const FolderIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 7.2A2.2 2.2 0 0 1 5.7 5h3.9l2 2.4h6.7a2.2 2.2 0 0 1 2.2 2.2v7.2a2.2 2.2 0 0 1-2.2 2.2H5.7a2.2 2.2 0 0 1-2.2-2.2V7.2z" />
  </Svg>
);

/** Phone — mobile apps / Mobbin (replaces 📱) */
export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="7" y="3" width="10" height="18" rx="2.4" />
    <path d="M11 17.8h2" />
  </Svg>
);

/** Magnifier — search / live-app research (replaces 🔍) */
export const MagnifierIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.2" />
    <path d="M15.6 15.6L20 20" />
  </Svg>
);

/** Medical cross — MSK / healthcare (replaces 🏥) */
export const MedicalCrossIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="4" width="16" height="16" rx="3.2" />
    <path d="M12 8.2v7.6" />
    <path d="M8.2 12h7.6" />
  </Svg>
);

/** Sprout — Grove (replaces 🌱) */
export const SproutIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21v-8" />
    <path d="M12 13c0-3.5-2.6-5.8-6.2-5.8 0 3.5 2.6 5.8 6.2 5.8z" />
    <path d="M12 11.5c0-2.9 2.2-4.9 5.3-4.9 0 2.9-2.2 4.9-5.3 4.9z" />
  </Svg>
);

/** Leaf — Good Harvest (replaces 🌿) */
export const LeafIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M18.5 5.5C10.5 5.5 6 11.5 6 19c7.5 0 12.5-6 12.5-13.5z" />
    <path d="M6 19c2.8-4.6 5.8-7.9 9.7-10.4" />
  </Svg>
);

/** Raised hand — "where I pushed back" (replaces ✋) */
export const HandIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M18 11V6a2 2 0 0 0-4 0v5" />
    <path d="M14 10V4a2 2 0 0 0-4 0v2" />
    <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </Svg>
);

/** Newspaper — press links (replaces 📰) */
export const NewsIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="14.5" rx="2.2" />
    <path d="M7.5 9.2h5" />
    <path d="M7.5 12.5h9" />
    <path d="M7.5 15.8h9" />
    <path d="M15 9.2h1.5" />
  </Svg>
);
