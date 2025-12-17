"use client";

import { useEffect, useRef } from "react";

export default function ContactPlay() {
  const armsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 991) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      armsRef.current.forEach((arm) => {
        if (!arm) return;

        const rect = arm.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;

        const distanceX = dx / window.innerWidth;
        const distanceY = dy / window.innerHeight;

        const maxRotateZ = 13;
        const maxRotateX = 13;

        if (!arm.dataset.baseTransform) {
          const style = getComputedStyle(arm);
          arm.dataset.baseTransform =
            style.transform === "none" ? "" : style.transform;
        }

        const rotateZ = distanceX * maxRotateZ;
        const rotateX = -distanceY * maxRotateX;

        arm.style.transform = `${arm.dataset.baseTransform} rotateZ(${rotateZ}deg) rotateX(${rotateX}deg)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="play-area">
      <div className="play-details">
        <div className="play-icons">
          {[
            { img: "/images/linkedin.svg", alt: "LinkedIn" },
            { img: "/images/instagram.svg", alt: "Instagram" },
            { img: "/images/whatsapp.svg", alt: "Whatsapp" },
            { img: "/images/github.svg", alt: "Github" },
          ].map((item) => (
            <img
              key={item.alt}
              src={item.img}
              alt={item.alt}
              title={item.alt}
              className="icon"
              loading="lazy"
            />
          ))}
        </div>

        <div className="email-address">
          Say hello <br />
        </div>

        <div className="play-mail">
          <a
            href="mailto:dickydns1@gmail.com"
            className="button mailto-button"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="arms">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) armsRef.current[i] = el;
            }}
            className={`arm-size arm-${i + 1}`}
          >
            <img
              src={`/images/hand${i + 1}.svg`}
              alt={`Hand ${i + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
