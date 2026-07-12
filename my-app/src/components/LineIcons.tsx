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

/** Mobbin — client work / UX flow documentation */
export const MobbinIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.75" y="4.25" width="16.5" height="15.5" rx="4" />
    <path d="M7.5 16v-5.5" />
    <path d="M7.5 11.8c.7-1.1 1.65-1.7 2.85-1.7 1.45 0 2.25 1 2.25 2.75V16" />
    <path d="M12.6 11.9c.7-1.15 1.7-1.8 2.95-1.8 1.55 0 2.45 1.05 2.45 2.9V16" />
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

/** Document with lines — resume / download (replaces 📄) */
export const FileTextIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13 3.5H7A1.8 1.8 0 0 0 5.2 5.3v13.4A1.8 1.8 0 0 0 7 20.5h10a1.8 1.8 0 0 0 1.8-1.8V9.3z" />
    <path d="M13 3.5v6h5.8" />
    <path d="M8.5 13h7" />
    <path d="M8.5 16.3h7" />
  </Svg>
);

/** Envelope — email (replaces ✉️) */
export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
    <path d="M4.3 7.2l7.7 5.6 7.7-5.6" />
  </Svg>
);

/** Briefcase — LinkedIn / professional profile (replaces 💼) */
export const BriefcaseIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="7.5" width="17" height="12" rx="2.2" />
    <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
    <path d="M3.5 12.5h17" />
  </Svg>
);

/** Person — about me / profile (replaces 👤) */
export const UserIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
  </Svg>
);

/** Padlock — password-protected (replaces 🔒) */
export const LockIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    <path d="M12 14.4v2.6" />
  </Svg>
);

/** Hamburger — open menu (replaces ☰) */
export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Svg>
);

/** X — close (replaces ✕) */
export const XIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </Svg>
);

/** Bloom — flowering plant / bouquet (replaces 🌸) */
export const FlowerIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="9" r="2.1" />
    <path d="M12 6.9C12 4.7 10.7 3.5 9.2 3.9 8 4.2 7.9 6 9.3 7.4" />
    <path d="M12 6.9C12 4.7 13.3 3.5 14.8 3.9 16 4.2 16.1 6 14.7 7.4" />
    <path d="M9.9 10.4C8 11.4 6.4 10.9 6.2 9.4 6 8.2 7.5 7.3 9.3 7.9" />
    <path d="M14.1 10.4C16 11.4 17.6 10.9 17.8 9.4 18 8.2 16.5 7.3 14.7 7.9" />
    <path d="M12 11v10" />
    <path d="M12 16c-1.6-1.2-3.2-1.1-3.9.2" />
  </Svg>
);
