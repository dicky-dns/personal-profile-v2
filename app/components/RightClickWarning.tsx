"use client";

import { useEffect, useRef, useState } from "react";

const MESSAGE = "Oops! Cannot right click here.";

type ToastState = {
  visible: boolean;
  x: number;
  y: number;
};

export default function RightClickWarning() {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    x: 0,
    y: 0,
  });
  const timeoutRef = useRef<number | null>(null);
  const isDesktopRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updateDevice = () => {
      isDesktopRef.current = mediaQuery.matches;
    };

    updateDevice();
    mediaQuery.addEventListener?.("change", updateDevice);

    const handleContextMenu = (event: MouseEvent) => {
      if (!isDesktopRef.current) return;

      event.preventDefault();

      const nextX = Math.min(event.clientX, window.innerWidth - 220);
      const nextY = Math.min(event.clientY, window.innerHeight - 80);

      setToast({
        visible: true,
        x: Math.max(12, nextX),
        y: Math.max(12, nextY),
      });

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setToast((current) => ({ ...current, visible: false }));
      }, 400);
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      mediaQuery.removeEventListener?.("change", updateDevice);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!toast.visible) return null;

  return (
    <div
      className="right-click-toast"
      style={{ left: toast.x, top: toast.y }}
    >
      {MESSAGE}
    </div>
  );
}
