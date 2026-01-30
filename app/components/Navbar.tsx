"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "scrollTarget";
const greetings = [
  "Hello!",
  "Hola!",
  "Bonjour!",
  "Nǐ hǎo!",
  "안녕하세요!",
  "Olá!",
  "Xin chào!",
  "こんにちは!",
  "Привет!",
  "!مرحبا",
  "नमस्ते!",
  "Ciao!",
];

export default function Navbar(){
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [greetingIndex, setGreetingIndex] = useState(0);
    const prevPathnameRef = useRef(pathname);
    const setMenuOpen = (next: boolean) => {
      setIsMenuOpen(next);
      if (next) {
        setGreetingIndex(0);
      }
    };
    const scrollToSection = (id: string | null) => (event: React.MouseEvent) => {
      if (pathname !== "/") {
        if (id) {
          sessionStorage.setItem(STORAGE_KEY, id);
        } else {
          sessionStorage.removeItem(STORAGE_KEY);
        }
        return;
      }

      event.preventDefault();

      if (!id) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const isHome = pathname === "/";
    const greeting = greetings[greetingIndex] ?? "Hello";

    useEffect(() => {
      if (prevPathnameRef.current !== pathname) {
        const timeoutId = window.setTimeout(() => setMenuOpen(false), 0);
        prevPathnameRef.current = pathname;
        return () => window.clearTimeout(timeoutId);
      }
      return undefined;
    }, [pathname]);

    useEffect(() => {
      const interval = window.setInterval(() => {
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
      }, 2900);

      return () => window.clearInterval(interval);
    }, []);

    const handleMobileNavClick = (sectionId: string | null) => (event: React.MouseEvent) => {
      if (isHome) {
        setMenuOpen(false);
      }

      scrollToSection(sectionId)(event);
    };

    return ( 
        <div className="container">
          <div className="navbar-header ">
            <div className="row">
                <div className="col-4">
                    <div className="navbar-navigate">
                        <div className="navbar-menu">
                              {[
                                { label: "Home", Image: "/images/menu-home.png", sectionId: null },
                                { label: "About", Image: "/images/menu-about.png", sectionId: "about" },
                                { label: "Project", Image: "/images/menu-project.png", sectionId: "project" },
                                { label: "Contact", Image: "/images/menu-contact.png", sectionId: "contact" },
                              ].map((item) => (
                                <Link
                                  key={item.label}
                                  href={
                                    item.sectionId && isHome
                                      ? `/#${item.sectionId}`
                                      : "/"
                                  }
                                  className="text-dark text-decoration-none"
                                  onClick={scrollToSection(item.sectionId)}
                                >
                                  <span className="text-menu">{item.label}</span>
                                  <span className="logo-menu">
                                    <Image fill src={item.Image} alt={item.label}/>
                                  </span>
                                </Link>
                              ))}
                        </div>
                        <button
                          type="button"
                          className="button-hamburger"
                          aria-label="Open menu"
                          onClick={() => setMenuOpen(true)}
                        />
                    </div>
                </div>

                <div className="col-4">
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <Link href="/" className="navbar-brand navbar-image"
                            style={{ backgroundImage: "url('/images/logo.png')"}}></Link>
                    </div>
                </div>


                <div className="col-4">
                    <div className="d-flex align-items-center justify-content-end h-100">
                        <Link href="/contact" className="button-dark-play greeting-button">{greeting}</Link>
                        <button
                          type="button"
                          className="button-hamburger"
                          aria-label="Open menu"
                          onClick={() => setMenuOpen(true)}
                        />
                    </div>
                </div>
              </div>
              <div className={`nav-menu-mobile ${isMenuOpen ? "show" : ""}`}>
                <button
                  type="button"
                  className="button-close-mobile"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image src="images/close-white.svg" alt="Close Menu" fill/>
                </button>
                
                <div className="navbar-menu-mobile">
                    <Link
                      href="/"
                      className="navbar-menu-mobile text-dark text-decoration-none"
                      onClick={handleMobileNavClick(null)}
                    >
                      <b className="text-menu">Home</b>
                    </Link>
                    <Link
                      href={isHome ? "/#about" : "/"}
                      className="navbar-menu-mobile text-dark text-decoration-none"
                      onClick={handleMobileNavClick("about")}
                    >
                      <b className="text-menu">About</b>
                    </Link>
                    <Link
                      href={isHome ? "/#project" : "/"}
                      className="navbar-menu-mobile text-dark text-decoration-none"
                      onClick={handleMobileNavClick("project")}
                    >
                      <b className="text-menu">Project</b>
                    </Link>
                    <Link
                      href={isHome ? "/#contact" : "/"}
                      className="navbar-menu-mobile text-dark text-decoration-none"
                      onClick={handleMobileNavClick("contact")}
                    >
                      <b className="text-menu">Contact</b>
                    </Link>
                    <div className="navbar-menu-mobile-footer">
                        <Link href="/contact" className="button-dark-play greeting-button d-block">{greeting}</Link>
                    </div>
                </div>
              </div>
          </div>
        </div>
    );
};
