"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

type BookmarkCardProps = {
  title: string;
  describtion: string;
  url: string[];
};

export default function BookmarkCard({
  title,
  describtion,
  url,
}: BookmarkCardProps) {
  return (
    <div className="bookmark-card">
      <div className="bookmark-card-title">{title}</div>
      <div className="bookmark-card-description">{describtion}</div>
      <div className="bookmark-card-links">
        {url.map((link, index) => (
          <a
            key={`${link}-${index}`}
            href={link}
            target="_blank"
            rel="noreferrer"
            className="bookmark-card-link"
          >
            <FontAwesomeIcon icon={faPaperclip} className="text-xs opacity-[.9]" />
            <span className="bookmark-card-link-text">{link}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
