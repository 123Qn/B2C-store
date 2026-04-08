import "@repo/ui/styles.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Full stack Blog Admin",
  description: "Administration of Full Stack Blog",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            const observer = new MutationObserver(() => {
              const el = document.getElementById('__next-route-announcer__');
              if (el) { el.remove(); observer.disconnect(); }
            });
            observer.observe(document.body, { childList: true, subtree: true });
          `
        }} />
      </body>
    </html>
  );
}
