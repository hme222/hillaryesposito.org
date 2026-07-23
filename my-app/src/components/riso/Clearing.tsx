import React from "react";

/**
 * A "reading clearing" — the semi-opaque bone panel that guarantees text meets
 * AA contrast no matter how busy the riso collage is behind it. Everything
 * text-bearing on a riso section sits inside one of these.
 */
export default function Clearing({
  children,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}) {
  return <Tag className={`riso-clearing ${className}`}>{children}</Tag>;
}
