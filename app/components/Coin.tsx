"use client";

import { useEffect, useRef } from "react";

export default function Coin() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const coinRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !coinRef.current) return;

      const section = sectionRef.current;
      const coin = coinRef.current;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const speed = 1.5; 
        const scrollProgress =
          (1 - rect.bottom / (rect.height + windowHeight)) * speed;

        const clamped = Math.min(Math.max(scrollProgress, 0), 1);

        const minLeft = 0;
        const maxLeft = 70;

        const coinLeft = minLeft + (maxLeft - minLeft) * clamped;

        coin.style.left = `${coinLeft}%`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container">
      <div ref={sectionRef} className="play-section">
        <div className="pay-to-play relative w-full">
          <div
            ref={coinRef}
            className="coin absolute left-0 transition-[left] duration-75"
          >
            <img
              src="https://cdn.prod.website-files.com/66571606dab8bb52242a2bce/66dec5862dc16a7f48086cc1_Coin.svg"
              loading="lazy"
              alt=""
            />
          </div>

          <div className="slot-one">
            <img
              src="https://cdn.prod.website-files.com/66571606dab8bb52242a2bce/67701395886e8eeaa42aef6f_Slot1.svg"
              loading="lazy"
              alt=""
            />
          </div>

          <div className="slot-two">
            <img
              src="https://cdn.prod.website-files.com/66571606dab8bb52242a2bce/677013951afc87377bc6cc93_Slot2.svg"
              loading="lazy"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
