"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { experiences } from "@/lib/experienceData";
import Image from "next/image";

gsap.registerPlugin(Draggable);

export default function Experience() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  const x = useRef<number>(0);
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
    <section className="experience-section">
      <div className="experience-heading">
        <Image src="/images/dev-journey.png" alt="Logo" width={400} height={100} />
      </div>
      <div className="experience-subheading">
        The path I’ve taken, the things I’ve built, and the skills I’ve leveled up.
      </div>

      <div className="w-full overflow-hidden">
        <div
          ref={marqueeRef}
          className="experience-boxes flex w-max cursor-grab active:cursor-grabbing"
        >
          {experiences.map((exp, i) => (
            <div key={i} className="experience-box">
              <div className="experience-header">
                <span />
                <span />
                <span />
              </div>
              <div className="experience-content">
                <div className="experience-title">{exp.title}</div>
                <div className="experience-company">{exp.company}</div>
                <div className="experience-period">{exp.period}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
