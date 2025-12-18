"use client";

import { useEffect, useState } from "react";
import { gql, GraphQLClient } from "graphql-request";
import { parseISO, format } from "date-fns";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN!;
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME!;

const QUERY = gql`
{
  user(login: "${USERNAME}") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

interface Day {
  date: string | null;
  contributionCount: number;
}

interface Week {
  contributionDays: Day[];
}

export default function Contribution() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const client = new GraphQLClient(GITHUB_GRAPHQL_URL, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });

      const res = await client.request(QUERY);
      const calendar =
        res.user.contributionsCollection.contributionCalendar;

      const normalized = calendar.weeks.map((week: Week) => {
        const days = [...week.contributionDays];
        while (days.length < 7) {
          days.unshift({ date: null, contributionCount: 0 });
        }
        return { contributionDays: days };
      });

      setWeeks(normalized);
      setTotal(calendar.totalContributions);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const containers = document.querySelectorAll(".contribution-body");

    containers.forEach((container) => {
      const tooltip = document.createElement("div");
      tooltip.className = "custom-tooltip";
      tooltip.style.opacity = "0";
      tooltip.style.position = "absolute";
      container.appendChild(tooltip);

      const outline = container.querySelector(".contribute-outline") as HTMLElement;
      if (!outline) return;

      container.querySelectorAll(".contribute-rounded").forEach((box) => {
        box.addEventListener("mouseenter", () => {
          tooltip.textContent = box.getAttribute("data-tooltip") || "";
          tooltip.style.opacity = "1";
        });

        box.addEventListener("mousemove", (e) => {
            const evt = e as MouseEvent;

            const r = outline.getBoundingClientRect();
            const t = tooltip.getBoundingClientRect();
            const x = evt.clientX - r.left;
            const y = evt.clientY - r.top;
            const pad = 10;

            tooltip.style.left = `${Math.min(x + pad, r.width - t.width)}px`;
            tooltip.style.top = `${
                y - t.height - pad < 0 ? y + pad : y - t.height - pad
            }px`;
        });

        box.addEventListener("mouseleave", () => {
          tooltip.style.opacity = "0";
        });
      });
    });
  }, [weeks]);

  const getColor = (count: number) => {
    if (count === 0) return "#1d1d1d";
    if (count < 4) return "#1a8b0b";
    if (count < 6) return "#07aa28";
    if (count < 10) return "#00c72b";
    return "#1eff00";
  };

  if (loading) {
    return (
      <div className="container">
        <div className="contribution-heading">
          <img src="/images/contribution.png" />
        </div>
        <div className="contribution-loading">
          <img src="/images/loading.gif" />
          <br />
          <span>fetching contribution data ...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
        <div className="contribution-heading">
            <img src="/images/contribution.png" alt="Contribution Heading" />    
        </div>
        <div className="row contribution-section">
            <div className="contribution-left">
            <div className="contribution">
                <div className="contribution-body">
                <div className="contribute-outline">

                    <div className="contribute-months">
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(
                        (m) => (
                        <div key={m} className="contribute-month" style={{ width: 16 }}>
                            {m}
                        </div>
                        )
                    )}
                    </div>

                    <div className="contribute-boxes">

                    <div className="contribute-days" style={{ height: 110 }}>
                        <div className="contribute-day">Mon</div>
                        <div className="contribute-day">Wed</div>
                        <div className="contribute-day">Fri</div>
                    </div>

                    <div className="contribute-box">
                        {weeks.map((week, wIdx) => (
                        <div key={wIdx} className="d-flex flex-column me-1">
                            {week.contributionDays.map((day, dIdx) => (
                            <div
                                key={dIdx}
                                className="contribute-rounded position-relative"
                                style={{
                                backgroundColor: getColor(day.contributionCount),
                                }}
                                data-tooltip={
                                day.date
                                    ? `${day.contributionCount} contributions on ${format(
                                        parseISO(day.date),
                                        "EEEE, MMM d yyyy"
                                    )}`
                                    : "No contributions"
                                }
                            />
                            ))}
                        </div>
                        ))}
                    </div>
                    </div>
                </div>

                <div className="contribution-footer">
                    <span>{total} contributions in the last year</span>

                    <div className="d-flex align-items-center gap-1">
                    <span className="me-1">Less</span>
                    <div className="sample-rounded" style={{ background: "#1d1d1d" }} />
                    <div className="sample-rounded" style={{ background: "#1a8b0b" }} />
                    <div className="sample-rounded" style={{ background: "#07aa28" }} />
                    <div className="sample-rounded" style={{ background: "#00c72b" }} />
                    <div className="sample-rounded" style={{ background: "#1eff00" }} />
                    <span className="ms-1">More</span>
                    </div>
                </div>

                </div>
            </div>
            </div>

            <div className="contribution-right">
                <div className="github-account">
                    <div className="github-heading">
                        <img src="{{ $githubInfo['avatar_url'] }}" alt="Github Heading" />
                    </div>
                    <div className="github-content">
                        <div className="github-name">
                            <div className="github-username">username</div>
                        </div>
                        <div className="github-activity">
                                <span>Followers 3</span>
                            <span>Following 0</span>
                        </div>  
                        <div className="wakatime-activity">
                            21 hrs 45mins coding <br/>in last week 
                            <a className="material-icons" target="_blank" href="https://wakatime.com/@dickydns">open_in_new</a>
                        </div>  
                    </div>
                    <div className="github-button">
                        <a className="view-button" target="_blank" href="https://github.com/dicky-dns">
                            <img src="/images/octocat.svg" />
                            View on Github
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
