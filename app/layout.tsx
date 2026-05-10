import type { Metadata } from "next";
import { Rajdhani, Nunito } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AniStream - Premium Anime Streaming",
  description: "A cinematic anime streaming platform experience with modern aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay noise-bg"></div>
        {children}
      </body>
    </html>
  );
}
