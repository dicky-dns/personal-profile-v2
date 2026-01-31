"use client";
import { useEffect } from "react";

export default function DisableZoom() {
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const isZoomKey =
        (e.ctrlKey || e.metaKey) && ["+", "-", "=", "0"].includes(e.key);
      if (isZoomKey) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}