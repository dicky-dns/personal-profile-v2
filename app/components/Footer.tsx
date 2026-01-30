import Link from "next/link";
export default function Footer() {
  return (
    <footer className="footer">
        <div className="p-4 text-center ">
            <p>© {new Date().getFullYear()} No shortcuts. Just solid work.</p>
        </div>
    </footer>
  );
}
