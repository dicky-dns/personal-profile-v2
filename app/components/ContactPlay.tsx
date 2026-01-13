"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export default function ContactPlay() {
  const armsRef = useRef<HTMLDivElement[]>([]);
  const totalArms = 15;
  const arcStart = 330;
  const arcSpan = 240;
  const arms = [
    {
      class: "arm-one",
      imgClass: "image-0",
      imgSrc: "/images/hand-1.png",
    },
    {
      class: "arm-two",
      imgClass: "image-0",
      imgSrc: "/images/hand-1.png",
    },
    {
      class: "arm-three",
      imgClass: "image-0",
      imgSrc: "/images/hand-1.png",
    },
    {
      class: "arm-four",
      imgClass: "image-0",
      imgSrc: "/images/hand-1.png",
    },
    {
      class: "arm-five",
      imgClass: "image-0",
      imgSrc: "/images/hand-1.png",
    },
    {
      class: "arm-six",
      imgClass: "image-0",
      imgSrc: "/images/hand-1.png",
    },
    {
      class: "arm-seven",
      imgClass: "image-0",
      imgSrc: "/images/hand-1.png",
    },
    {
      class: "arm-eight",
      imgClass: "image-0",
      imgSrc: "/images/hand-1.png",
    },
    {
      class: "arm-nine",
      imgClass: "image-23",
      imgSrc: "/images/hand-2.png",
    },
    {
      class: "arm-ten",
      imgClass: "image-24",
      imgSrc: "/images/hand-2.png",
    },
    {
      class: "arm-eleven",
      imgClass: "image-25",
      imgSrc: "/images/hand-2.png",
    },
    {
      class: "arm-twelve",
      imgClass: "image-26",
      imgSrc: "/images/hand-2.png",
    },
    {
      class: "arm-thirteen",
      imgClass: "image-27",
      imgSrc: "/images/hand-2.png",
    },
    {
      class: "arm-fourteen",
      imgClass: "image-28",
      imgSrc: "/images/hand-2.png",
    },
    {
      class: "arm-fifteen",
      imgClass: "image-29",
      imgSrc: "/images/hand-2.png",
    },
  ];

  useEffect(() => {
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousTouchAction = body.style.touchAction;
    body.style.overflow = "hidden";
    body.style.touchAction = "none";

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const smoothing = 0.12;
    const maxRotateZ = 13;
    const maxRotateX = 13;
    let rafId: number | null = null;

    const animate = () => {
      armsRef.current.forEach((arm) => {
        if (!arm) return;

        const rect = arm.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouse.x - centerX;
        const dy = mouse.y - centerY;

        const distanceX = dx / window.innerWidth;
        const distanceY = dy / window.innerHeight;

        const targetZ = distanceX * maxRotateZ;
        const targetX = -distanceY * maxRotateX;

        const currentZ = parseFloat(arm.dataset.currentZ || "0");
        const currentX = parseFloat(arm.dataset.currentX || "0");
        const nextZ = currentZ + (targetZ - currentZ) * smoothing;
        const nextX = currentX + (targetX - currentX) * smoothing;

        arm.dataset.currentZ = nextZ.toString();
        arm.dataset.currentX = nextX.toString();

        if (!arm.dataset.baseTransform) {
          const style = getComputedStyle(arm);
          arm.dataset.baseTransform =
            style.transform === "none" ? "" : style.transform;
        }

        arm.style.transform = `${arm.dataset.baseTransform} rotateZ(${nextZ}deg) rotateX(${nextX}deg)`;
      });

      rafId = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 991) return;

      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);
    rafId = window.requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      body.style.overflow = previousOverflow;
      body.style.touchAction = previousTouchAction;
    };
  }, []);

  return (
    <div className="play-area">
      <div className="play-details">
        <div className="email-address">
          Stay in touch
        </div>
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
          or <br />
        </div>

        <div className="play-mail">
          <a
            href="mailto:dickydns1@gmail.com"
            className="button mailto-button"
          >
            Say Hello
          </a>
        </div>
      </div>

      <div className="arms">
        {arms.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) armsRef.current[i] = el;
            }}
            className={`arm-size ${item.class}`}
            style={
              {
                "--arm-angle": `${arcStart + (arcSpan / (totalArms - 1)) * i}deg`,
              } as CSSProperties
            }
          >
            <img
              src={item.imgSrc}
              className={item.imgClass}
              alt={`Hand ${i + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
