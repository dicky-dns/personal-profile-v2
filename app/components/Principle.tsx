"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";

gsap.registerPlugin(Draggable);

export default function Principle() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const principles = [
  {
    title: "Maintainability",
    description: "Code that stays readable and easy to change over time."
  },
  {
    title: "Performance",
    description: "Fast for real users and stays efficient without wasted complexity."
  },
  {
    title: "Clarity",
    description: "Easy to read and easy to understand without extra explanation."
  },
  {
    title: "Consistency",
    description: "Same patterns everywhere and predictable behavior."
  },
  {
    title: "Simplicity",
    description: "Solve the problem cleanly and avoid new complications."
  },
  {
    title: "Reliability",
    description: "Built to stay solid and dependable in real usage."
  }
];

  const x = useRef<number>(0);3
  const speed = useRef<number>(0.3);
  const rafId = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const items = Array.from(marquee.children);
    items.forEach((item) => {
      marquee.appendChild(item.cloneNode(true));
    });

    const totalWidth = marquee.scrollWidth / 2;

    const render = () => {
      if (!isDragging.current) {
        x.current -= speed.current;
      }

      if (x.current <= -totalWidth) x.current = 0;
      if (x.current > 0) x.current = -totalWidth;

      marquee.style.transform = `translateX(${x.current}px)`;
      rafId.current = requestAnimationFrame(render);
    };

    render();


    const draggable = Draggable.create(marquee, {
      type: "x",
      inertia: true,

      onPress() {
        isDragging.current = true;
        if (rafId.current !== null) {
          cancelAnimationFrame(rafId.current);
        }
      },

      onDrag() {
        x.current += this.deltaX;
        marquee.style.transform = `translateX(${x.current}px)`;
      },

      onThrowUpdate() {
        x.current += this.deltaX;
        marquee.style.transform = `translateX(${x.current}px)`;
      },

      onRelease() {
        isDragging.current = false;

        // 🔥 PENTING: HAPUS TRANSFORM GSAP
        gsap.set(marquee, { clearProps: "transform" });

        render();
      },
    })[0];

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      draggable.kill();
    };
  }, []);

  return (
    <section className="principle-section">
      <div className="principle-heading">
        <Image src="/images/focused.png" alt="Logo" width={400} height={100} />
      </div>
      <div className="principle-subheading">
        The way I think, the way I build, and the standards I stick to.
      </div>

      <div className="w-full overflow-hidden">
        <div
          ref={marqueeRef}
          className="principle-boxes flex w-max cursor-grab active:cursor-grabbing"
        >
          {principles.map((principle, i) => (
            <div key={i} className="principle-box">
                <div className="principle-title">{principle.title}</div>
                <div className="principle-description">{principle.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
