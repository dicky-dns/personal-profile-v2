import BookmarkCard from "../components/BookmarkCard";
import { bookmarks } from "@/lib/bookmarkData";

export default function Contact() {
  return (
    <div className="container">
        <div className="row bookmark-section">
          <div className="bookmark-heading">
            <img src="/images/bookmarks.png" alt="Bookmark Heading" />    
          </div>
          <div className="bookmark-tagline">
            A curated collection of links, videos, or other resources to level up skills, learning, inspiration, and future reference.
          </div>
          <div className="bookmark-content">
            {bookmarks.map((bookmark, index) => (
              <BookmarkCard
                key={`${bookmark.title}-${index}`}
                title={bookmark.title}
                describtion={bookmark.describtion}
                url={bookmark.url}
              />
            ))}
          </div>
        </div>
    </div>
  );
}
