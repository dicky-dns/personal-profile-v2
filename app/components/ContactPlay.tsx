"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export default function ContactPlay() {
  const armsRef = useRef<HTMLDivElement[]>([]);
  const totalArms = 15;
  const arcStart = 330;
  const arcSpan = 240;
  const armClassNames = [
    "arm-one",
    "arm-two",
    "arm-three",
    "arm-four",
    "arm-five",
    "arm-six",
    "arm-seven",
    "arm-eight",
    "arm-nine",
    "arm-ten",
    "arm-eleven",
    "arm-twelve",
    "arm-thirteen",
    "arm-fourteen",
    "arm-fifteen",
  ];

    const imglassNames = [
    "image-0",
    "image-0",
    "image-0",
    "image-0",
    "image-0",
    "image-0",
    "image-0",
    "image-0",
    "image-23",
    "image-24",
    "image-25",
    "image-26",
    "image-27",
    "image-28",
    "image-29",
  ];

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
        {Array.from({ length: totalArms }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) armsRef.current[i] = el;
            }}
            className={`arm-size ${armClassNames[i]}`}
            style={
              {
                "--arm-angle": `${arcStart + (arcSpan / (totalArms - 1)) * i}deg`,
              } as CSSProperties
            }
          >
            <img
              src={`/images/hand${i + 1}.svg`}
              className={imglassNames[i]}
              alt={`Hand ${i + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
