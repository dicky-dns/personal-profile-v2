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
    {
    wrapperClassName: "mb-4",
      text: isMobile
        ? `Hello! 👋🏼 I’m Dicky, a web developer based in Surakarta, Indonesia, with solid hands-on experience working across frontend, backend, and database systems. I enjoy turning ideas into clean, functional, and user-friendly web experiences through real-world projects. As a self-taught developer, I believe the best way to grow is by building things, solving real problems, and constantly refining how things work behind the scenes. Currently, I’m focused on building web projects and sharpening my skills and I’m open to new opportunities and collaborations, so feel free to reach out to me! 🚀`
        : `Hello! 👋🏼 I’m Dicky, and I currently live in Surakarta, Indonesia. I’m a Web Developer who works across frontend, backend, and database layers, focusing on building well-structured, reliable, and maintainable web applications. As a self-taught developer, I’m driven by curiosity and a strong interest in how systems connect end to end—from user interactions on the surface to data handling behind the scenes. I’m not just someone who writes code, but someone who enjoys analyzing problems, improving workflows, and learning continuously through hands-on experience. Taking an unconventional learning path through real-world projects has helped me stay adaptable and resilient in my approach. Currently, I’m focused on building web projects and sharpening my skills, and I’m always open to new opportunities and collaborations, so feel free to reach out to me! 🚀`
    },
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
    const end = isMobile ? "top 1%" : "bottom 50%";
    const opacity = isMobile ? 0.1 : 0.2;

    const ctx = gsap.context(() => {
      const words = paragraphRef.current?.querySelectorAll(".text-about, a") ?? [];
      if (!words.length) {
        return;
      }

      gsap.fromTo(
        words,
        { opacity: opacity, textShadow: "none" },
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
