"use client";

import { List } from "lucide-react";
import { title } from "process";
import { useState } from "react";

const powerItems = [
  { id: "dev-stack", label: "Dev Stack", icon: "/images/dev.svg" },
  { id: "database", label: "Database", icon: "/images/security.svg" },
  { id: "uses", label: "Uses", icon: "/images/tools.svg" },
  { id: "technical", label: "Technical", icon: "/images/testing.svg" },
  { id: "self", label: "Self", icon: "/images/design.svg" },
  { id: "interest", label: "Interest", icon: "/images/db.svg" },
];

const project_types = [
    { id: "default",
      img: "/images/default.png",
      title: "Introduce My Profile",
      list: [
        "Web dev  —  frontend & backend",
        "Clean & scalable builds",
        "Strong problem solver",
        "Performance-minded dev",
        "Fast learner & adapter",
        "Solo or team player",
        "Product-driven coder"
      ]
    },
    { id: "dev-stack",
      img: "/images/uses2.png",
      title: "Dev Stack",
      list: [
        "HTML5, CSS",
        "Tailwind CSS, Bootstrap",
        "JavaScript", 
        "jQuery",
        "Vue.js, Next.js",
        "PHP, Laravel, CodeIgniter"
      ]
    },
    { id: "database",
      img: "/images/database.png",
      title: "Database Tech",
      list: [
        "MariaDB / MySQL",
        "PostgreSQL",
        "SQLite",
      ]
    },
    { id: "uses",
      img: "/images/uses.png",
      title: "Uses Tools & Utilities",
      list: [
        "Linux (Ubuntu) & Windows",
        "VS Code as code editor",
        "Git & GitHub",
        "Swagger documentation code",
        "Postman as API tester", 
        "Navicat database manager", 
        "Zsh-rc shell terminal", 
        "Adobe Photoshop for graphics",
      ]
    },
    { id: "technical",
      img: "/images/technical.png",
      title: "Technical Skills",
      list: [
        "Optimize Query Management",
        "UI Development",
        "Git Command",
        "RESTful API Development",
        "Unit & Feature Testing (Pest)",
        "Clean & Reusable Code",
        "Domain Driven Architecture",
        "OOP Pattern or MVC Pattern",
        "Graphic Design"
      ]
    },
    { id: "self",
      img: "/images/interpersonal.png",
      title: "Interpersonal Skills",
      list: [
        "Team-collaborative",
        "Good time management",
        "Critical thinker",
        "Fast adapter",
        "Problem-focused mindset",
        "Positive vibes",
      ]
    },
    { id: "interest",
      img: "/images/interest.png",
      title: "Areas of Interest",
      list: [
        "Web dev & tools",
        "System & architecture",
        "Database stuff",
        "API & integrations",
        "Debugging & problem solving",
        "Learning new tech",
      ]
    },
]

export default function Skill() {
  const [active, setActive] = useState<string>("default");

  return (
    <div className="page-wrapper">
      <div className="power-up">

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
          {project_types.map((char) => (
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
                <div className="mb-3">
                  <b>{type.title.toUpperCase()} :</b>
                </div>
                {type.list && type.list.map((point, index) => (
                <li className="mb-1" key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="cta">
            <div className="project-cta-copy">
              Need help for something?
            </div>
            <a href="/contact" className="button-dark-play">
              Let&apos;s Talk!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
