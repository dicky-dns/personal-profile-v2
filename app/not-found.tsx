"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-card">
        <div className="not-found-code">404</div>
        <h1>Oops, page not found</h1>
        <p>
          That page bounced. It might’ve moved, got deleted, or the URL’s just off.
        </p>
        <div className="not-found-actions">
          <Link className="not-found-btn" href="/">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
