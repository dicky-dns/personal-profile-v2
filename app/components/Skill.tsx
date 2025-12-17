"use client";

import { useState } from "react";

const powerItems = [
  { id: "dev-stack", label: "Dev Stack", icon: "/images/dev.svg" },
  { id: "database", label: "Database", icon: "/images/security.svg" },
  { id: "uses", label: "Uses", icon: "/images/tools.svg" },
  { id: "technical", label: "Technical", icon: "/images/testing.svg" },
  { id: "interpersonal", label: "Interpersonal", icon: "/images/design.svg" },
  { id: "interest", label: "Interest", icon: "/images/db.svg" },
];

const characters = [
  { id: "default", img: "/images/default.png" },
  { id: "dev-stack", img: "/images/uses2.png" },
  { id: "database", img: "/images/database.png" },
  { id: "uses", img: "/images/uses.png" },
  { id: "technical", img: "/images/technical.png" },
  { id: "interpersonal", img: "/images/interpersonal.png" },
  { id: "interest", img: "/images/interest.png" },
];

const project_types = [
    { id: "default",},
    { id: "dev-stack",},
    { id: "database",},
    { id: "uses",},
    { id: "technical",},
    { id: "interpersonal",},
    { id: "interest",},
]

export default function Skill() {
  const [active, setActive] = useState<string>("default");

  return (
    <div className="page-wrapper">
      <div className="power-up">

        {/* POWER SELECT */}
        <div className="power-up-selection">
          <div className="power-heading">
            <img src="/images/power-heading.gif" alt="Select your power-up" />
          </div>

          <div className="power-list">
            {powerItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`power-item ${
                  active === item.id ? "active" : ""
                }`}
              >
                <div className="power-box">
                  <img src={item.icon} className="power-img" alt={item.label} />
                </div>
                <div className="power-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="character-select">
          {characters.map((char) => (
            <img
              key={char.id}
              src={char.img}
              className={`character-image ${
                active === char.id ? "d-block" : "d-none"
              }`}
              alt={char.id}
            />
          ))}
        </div>

        <div className="project-types">
          {project_types.map((type) => (
            <div
              key={type.id}
              className={`project-list-box ${
                active === type.id ? "show" : "hidden"
              }`}
            >
              <ul className="project-lists">
                <li>
                  <b>{type.id.replace("-", " ").toUpperCase()} :</b>
                </li>
                <li>Can build a f*cking website</li>
                <li>Has loads of ideas</li>
                <li>Best problem solver... in the details</li>
                <li>Can multi-task</li>
                <li>Great music taste</li>
                <li>Fully services</li>
              </ul>
            </div>
          ))}

          <div className="cta">
            <div className="project-cta-copy">
              Need help for build a website?
            </div>
            <a href="/contact" className="button-dark-play">
              Let&apos;s Play!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
