"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function AboutText() {
  const paragraphRef = useRef<HTMLDivElement | null>(null);

  const paragraphs = [
    {className: "mb-4", text: `Hello! 👋🏼 I’m Dicky, and I currently live in Surakarta, Indonesia. I'm a programmer with over 3 years of experience, I’m a versatile Web Developer skilled in designing, developing, and managing websites, with a particular focus on PHP and JavaScript. As a self-taught developer, I’m passionate about creating engaging and interactive websites. I’m not just a coder, but also a problem solver, and a lifelong learner—constantly eager to explore new things. Taking an unconventional route, I chose hands-on learning and real-world applications which has helped me build resilience and adaptability in my approach. Currently, I work as a Web Developer at a company in Surakarta (Solo). I’m always open to new opportunities and collaborations, so feel free to reach out to me! 🚀`},
    {className: "", text: `Looking for ways to grow?`},
    {className: "mb-5", text: `Check out my Bookmark — a curated collection of links, videos, and other resources to help you level up your skills.`},
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
    if (paragraphRef.current) {
      const words = paragraphRef.current.querySelectorAll(".text-about, a");

      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        words,
        { opacity: 0.2, textShadow: "none" },
        {
          opacity: 1,
          stagger: 0.04,
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={paragraphRef}>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={`paragraph-about select-none flex flex-wrap text-justify text-base md:text-lg leading-relaxed tracking-wide ${
            paragraph.className ?? ""
          }`}
        >
          {splitText(paragraph.text)}
        </p>
      ))}
    </div>
  );
}
