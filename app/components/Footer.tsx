import Link from "next/link";
export default function Footer() {
  return (
    <footer className="footer">
        <div className="p-4 text-center ">
            <p>© {new Date().getFullYear()} Dickydns. Made with care</p>
        </div>
    </footer>
  );
}
