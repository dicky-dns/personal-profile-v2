"use client";

import { useEffect } from "react";

const STORAGE_KEY = "scrollTarget";

export default function ScrollToSection() {
  useEffect(() => {
    const targetId = sessionStorage.getItem(STORAGE_KEY);
    if (!targetId) {
      return;
    }

    sessionStorage.removeItem(STORAGE_KEY);

    const scroll = () => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (scroll()) {
      return;
    }

    let attempts = 0;
    const maxAttempts = 20;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (scroll() || attempts >= maxAttempts) {
        window.clearInterval(timer);
      }
    }, 100);

    return () => window.clearInterval(timer);
  }, []);

  return null;
}
