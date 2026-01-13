"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "scrollTarget";

export default function Navbar(){
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                          onClick={() => setIsMenuOpen(true)}
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
                        <Link href="/contact" className="button-dark-play">{"Let's Play!"}</Link>
                        <button
                          type="button"
                          className="button-hamburger"
                          aria-label="Open menu"
                          onClick={() => setIsMenuOpen(true)}
                        />
                    </div>
                </div>
              </div>
              <div className={`nav-menu-mobile ${isMenuOpen ? "show" : ""}`}>
                <button
                  type="button"
                  className="button-close-mobile"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image src="images/close-white.svg" alt="Close Menu" fill/>
                </button>
                
                <div className="navbar-menu-mobile">
                    <Link
                      href="/"
                      className="navbar-menu-mobile text-dark text-decoration-none"
                      onClick={(event) => {
                        setIsMenuOpen(false);
                        scrollToSection(null)(event);
                      }}
                    >
                      <span className="text-menu">Home</span>
                      <span className="logo-menu">
                          <Image width={125} height={120} alt="Menu" src="/images/menu-home.png" />
                      </span>
                    </Link>
                    <Link
                      href={isHome ? "/#about" : "/"}
                      className="navbar-menu-mobile text-dark text-decoration-none"
                      onClick={(event) => {
                        setIsMenuOpen(false);
                        scrollToSection("about")(event);
                      }}
                    >
                      <span className="text-menu">About</span>
                      <span className="logo-menu">
                        <Image width={50} height={50} alt="Menu" src="/images/menu-about.png" />
                      </span>
                    </Link>
                    <Link
                      href={isHome ? "/#project" : "/"}
                      className="navbar-menu-mobile text-dark text-decoration-none"
                      onClick={(event) => {
                        setIsMenuOpen(false);
                        scrollToSection("project")(event);
                      }}
                    >
                      <span className="text-menu">Project</span>
                      <span className="logo-menu">
                        <Image width={50} height={50} alt="Menu" src="/images/menu-project.png" />
                      </span>
                    </Link>
                    <Link
                      href={isHome ? "/#contact" : "/"}
                      className="navbar-menu-mobile text-dark text-decoration-none"
                      onClick={(event) => {
                        setIsMenuOpen(false);
                        scrollToSection("contact")(event);
                      }}
                    >
                      <span className="text-menu">Contact</span>
                      <span className="logo-menu">
                        <Image width={40} height={40} alt="Menu" src="/images/menu-contact.png" />
                      </span>
                    </Link>
                    <div className="navbar-menu-mobile-footer">
                        <Link href="{{ route('contact" className="button-dark-play d-block">{"Let's Play!"}</Link>
                    </div>
                </div>
              </div>
          </div>
        </div>
    );
};
