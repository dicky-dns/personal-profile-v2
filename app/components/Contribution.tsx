"use client";

import { useEffect, useMemo } from "react";
import { parseISO, format } from "date-fns";
import { useGetGithubData } from "@/hooks/useGetGithubData";

interface Day {
  date: string | null;
  contributionCount: number;
}

interface Week {
  contributionDays: Day[];
}

export default function Contribution() {
  const { data, isLoading, isReady } = useGetGithubData();
  const user = data?.user || null;
  const calendar = data?.user?.contributionsCollection.contributionCalendar;
  const total = calendar?.totalContributions ?? 0;
  const publicRepos = data?.publicRepos ?? 0;
  const totalStars = data?.totalStars ?? 0;
  const topLanguages = data?.topLanguages ?? [];
  const months = data?.months ?? [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weeks = useMemo<Week[]>(() => {
    if (!calendar?.weeks) return [];

    return calendar.weeks.map((week: Week) => {
      const days = [...week.contributionDays];
      while (days.length < 7) {
        days.unshift({ date: null, contributionCount: 0 });
      }
      return { contributionDays: days };
    });
  }, [calendar]);

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

  if (isLoading || !isReady) {
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
                    {months.map((monthLabel, index) => (
                      <div key={`${monthLabel}-${index}`} className="contribute-month" style={{ width: 16 }}>
                        {monthLabel}
                      </div>
                    ))}
                    </div>

                    <div className="contribute-boxes">

                    <div className="contribute-days" style={{ height: 110 }}>
                        <div className="contribute-day">Mon</div>
                        <div className="contribute-day">Wed</div>
                        <div className="contribute-day">Fri</div>
                    </div>

                    <div className="contribute-box">
                        {weeks.map((week, wIdx) => (
                        <div key={wIdx} className="d-flex flex-column contribute-column">
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
                        <img src={user?.avatarUrl || ""} alt="Github Heading" />
                    </div>
                    <div className="github-content">
                        <div className="github-name">
                            <div className="github-username">{user?.login || ""}</div>
                        </div>
                        <div className="github-activity">
                            <span>{user?.followers?.totalCount ?? 0} Followers</span>
                            <span>{user?.following?.totalCount ?? 0} Following</span>
                        </div>  
                        <div className="github-location">
                          {user?.location || "—"}
                        </div>
                
                        <div className="github-repo-activity">
                            <span className="github-desktop">
                              {publicRepos} public repositories from GitHub 
                              <a className="material-icons" target="_blank" href="https://github.com/dicky-dns">open_in_new</a>
                            </span>
                            <span className="github-mobile">
                              Currently with {publicRepos} public repositories, mostly written in {topLanguages ? topLanguages.join(", ") : ""}.
                            </span>
                        </div>  
                    </div>
                    <div className="github-button">
                        <a className="view-button" target="_blank" href="https://github.com/dicky-dns">
                            <img src="/images/octocat.svg" />
                            View on Github
                        </a>
                        <a className="star-button" target="_blank" href="https://github.com/dicky-dns?tab=stars">
                           <img src="/images/star.svg" />
                            Star
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
