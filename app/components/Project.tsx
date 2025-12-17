"use client";

import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

export default function Project() {
  const splideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!splideRef.current) return;

    const splide = new Splide(splideRef.current, {
      type: "loop",
      perPage: 2,
      gap: 0,
      updateOnMove: true,
      drag: true,
      autoplay: false,
      interval: 5000,
      throttle: 1,
      breakpoints: {
        991: {
          perPage: 1,
          wheel: true,
        },
      },
    });

    splide.mount();

    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <div className="container" id="project">
      <div className="row">
        <div className="project-heading">
          <img src="/images/project-heading.png" alt="Project" />
        </div>

        <div
          ref={splideRef}
          className="splide project-section projects"
          aria-label="Projects Slider"
        >
          <div className="splide__track">
            <ul className="splide__list">
              <li className="splide__slide">
                <div className="project-window">
                  <div className="project-window-top">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="project-content">
                    <h1 className="project-title">Company Profile</h1>
                    <div className="project-description">
                      This is a simple CSS Browser window
                    </div>
                    <div className="project-tech">
                      <span>#Laravel</span>
                      <span>#Blade</span>
                      <span>#MySQL</span>
                    </div>
                  </div>

                  <div className="project-image">
                    <img src="/images/projects/1.png" alt="Project 1" />
                  </div>
                </div>
              </li>

              <li className="splide__slide">
                <div className="project-window">
                  <div className="project-window-top">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="project-content">
                    <h1 className="project-title">Movie Web</h1>
                    <div className="project-description">
                      This is a simple CSS Browser window
                    </div>
                    <div className="project-tech">
                      <span>#Laravel</span>
                      <span>#Vue</span>
                      <span>#MySQL</span>
                    </div>
                  </div>

                  <div className="project-image">
                    <img src="/images/projects/2.png" alt="Project 2" />
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev">
              <img src="/images/arrow-left.svg" alt="Previous" />
            </button>
            <button className="splide__arrow splide__arrow--next">
              <img src="/images/arrow-right.svg" alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
