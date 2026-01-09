import Link from "next/link";
export default function Footer() {
  return (
    <footer className="footer">
        <div className="p-4 text-center ">
            <p>© 2026 Built with <Link href="https://nextjs.org/" target="_blank" className="text">Next.js</Link></p>
        </div>
    </footer>
  );
}
