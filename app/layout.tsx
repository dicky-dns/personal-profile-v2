import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css'
import "@splidejs/splide/dist/css/splide.min.css";
import "material-icons/iconfont/material-icons.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import Navbar from "./components/Navbar";
import RightClickWarning from "./components/RightClickWarning";

config.autoAddCss = false;


export const metadata: Metadata = {
  title: "Dicky Dns",
  description: "web developer portfolio",
  colorScheme: "light",
  themeColor: "#ffffff",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Dicky Dns",
    description: "web developer portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dicky Dns",
    description: "web developer portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <RightClickWarning />
        
        {children}
      </body>
    </html>
  );
}
