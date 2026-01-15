"use client"

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function AboutText() {
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const paragraphs = [
    {wrapperClassName: "mb-4", text: isMobile ? `Hello! 👋🏼 I’m Dicky, a web developer based in Surakarta, Indonesia, with over 3 years of experience across frontend and backend development. I focus on building clean, functional, and user-friendly web experiences through real-world projects. As a self-taught developer, I believe in learning by doing, solving problems, and continuously improving my skills. Currently, I work as a Web Developer in Surakarta and I’m open to new opportunities and collaborations, so feel free to reach out to me! 🚀` : `Hello! 👋🏼 I’m Dicky, and I currently live in Surakarta, Indonesia. I'm a programmer with over 3 years of experience, I’m a versatile Web Developer skilled in designing, developing, and managing websites, with a particular focus on PHP and JavaScript. As a self-taught developer, I’m passionate about creating engaging and interactive websites. I’m not just a coder, but also a problem solver, and a lifelong learner—constantly eager to explore new things. Taking an unconventional route, I chose hands-on learning and real-world applications which has helped me build resilience and adaptability in my approach. Currently, I work as a Web Developer at a company in Surakarta. I’m always open to new opportunities and collaborations, so feel free to reach out to me! 🚀`},
    {text: `Looking for ways to grow?`},
    {wrapperClassName: "mb-5", text: `Check out my Bookmark — a curated collection of links, videos, and other resources to help you level up your skills.`},
  ]

  const splitText = (text: string) => {
    return text.split(" ").map((word, index) => {
      if (word.includes("Bookmark")) {
        return (
          <Link key={index} href="/bookmarks" className="text-about text-blue">
            {word}{" "}
            <FontAwesomeIcon icon={faPaperclip} className="text-xs opacity-[.9]" />
          </Link>
        );
      }
      return (
        <span key={index} className="text-about text-foreground">
          {word}{" "}
        </span>
      );
    });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 575px)");

    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateIsMobile);
      return () => mediaQuery.removeEventListener("change", updateIsMobile);
    }

    mediaQuery.addListener(updateIsMobile);
    return () => mediaQuery.removeListener(updateIsMobile);
  }, []);

  useEffect(() => {
    if (!paragraphRef.current) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);
    const staggerValue = isMobile ? 0.09 : 0.04;
    const start = isMobile ? "top 75%" : "top 80%";
    const end = isMobile ? "top 20%" : "bottom 20%";

    const ctx = gsap.context(() => {
      const words = paragraphRef.current?.querySelectorAll(".text-about, a") ?? [];
      if (!words.length) {
        return;
      }

      gsap.fromTo(
        words,
        { opacity: 0.2, textShadow: "none" },
        {
          opacity: 1,
          stagger: staggerValue,
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: start,
            end: end,
            scrub: true,
            toggleActions: "play none none none",
          },
        }
      );
    }, paragraphRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={paragraphRef}>
      {paragraphs.map((paragraph, index) => (
        <div key={index} className={`paragraph-block ${paragraph.wrapperClassName ?? ""}`}>
          <p className="paragraph-about">
            {splitText(paragraph.text)}
          </p>
        </div>
      ))}
    </div>
  );
}
