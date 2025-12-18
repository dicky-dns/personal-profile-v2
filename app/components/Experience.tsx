"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { experiences } from "@/lib/experienceData";

export default function Experience() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef(null);

  useEffect(() => {
      const marquee = marqueeRef.current;
      if (!marquee) return;

      const items = Array.from(marquee.children);
      items.forEach((item) => {
        marquee.appendChild(item.cloneNode(true));
      });

      const totalWidth = marquee.scrollWidth / 2;

      gsap.to(marquee, {
        x: -totalWidth,
        duration: 150, 
        repeat: -1, 
        ease: "linear",
      });
  }, []);

  return (
    <div className="experience-section">
            <div className="experience-heading">
         Dev Journey
      </div>
      <div className="experience-subheading">
        The path I’ve taken, the things I’ve built, and the skills I’ve leveled up along the way.
      </div>
      <div className="w-100 overflow-x-hidden">
        <div ref={marqueeRef} className="experience-boxes">
          {experiences.map((experience, index) => (
            <div key={index} className="experience-box">
              <div className="inline-block relative">
                <div className="experience-header">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="experience-content">
                  <div className="experience-title">
                    {experience.title}
                  </div>
                    <div className="experience-company">
                    {experience.company}
                  </div>
                  <div className="experience-period">
                    {experience.period}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
