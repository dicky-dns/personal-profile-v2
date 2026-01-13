"use client";

import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import { projects } from "@/lib/projectData";

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
          wheel: false,
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
              {projects.map((project) => (
                <li className="splide__slide" key={project.id}>
                  <div className="project-window">
                    <div className="project-window-top">
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className="project-content">
                      <h1 className="project-title">{project.title}</h1>
                      <div className="project-description">
                        {project.description}
                      </div>
                      <div className="project-tech">
                        {project.tech.map((item) => (
                          <span key={item}>#{item}</span>
                        ))}
                      </div>
                    </div>

                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev">
              <img src="/images/arrow-left.png" alt="Previous" />
            </button>
            <button className="splide__arrow splide__arrow--next">
              <img src="/images/arrow-right.png" alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
