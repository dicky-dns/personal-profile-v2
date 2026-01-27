"use client";

import { useMemo, useState } from "react";
import BookmarkCard from "../components/BookmarkCard";
import { bookmarks } from "@/lib/bookmarkData";

export default function Contact() {
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(bookmarks.length / itemsPerPage));

  const pageItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return bookmarks.slice(start, start + itemsPerPage);
  }, [page]);

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(totalPages, Math.max(1, nextPage));
    setPage(clamped);
  };

  return (
    <div className="container">
        <div className="row bookmark-section">
          <div className="bookmark-heading">
            <img src="/images/bookmarks.png" alt="Bookmark Heading" />    
          </div>
          <div className="bookmark-tagline">
            Collection of links, videos, or other resources to level up skills, learning, inspiration, and future reference.
          </div>
          <div className="bookmark-content">
            {pageItems.map((bookmark, index) => (
              <BookmarkCard
                key={`${bookmark.title}-${index}`}
                title={bookmark.title}
                describtion={bookmark.describtion}
                url={bookmark.url}
              />
            ))}
          </div>
          {totalPages > 1 && (
          <div className="bookmark-pagination">
            <button
              type="button"
              className="bookmark-page-btn"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="bookmark-page-info">
              Page {page} / {totalPages}
            </span>
            <button
              type="button"
              className="bookmark-page-btn"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
          )}
        </div>
    </div>
  );
}
