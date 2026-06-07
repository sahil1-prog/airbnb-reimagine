import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Airbnb — Reimagined with AI | Anywhere Door",
  description:
    "Experience the future of travel planning. Our AI companion eliminates all search friction — one prompt generates curated listings, itineraries, and cost splits instantly.",
  keywords: "Airbnb, AI travel, GenAI, anywhere door, travel planner, itinerary, India",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Airbnb Reimagined — Anywhere Door AI",
    description: "One prompt. Perfect trip. No filters needed.",
    type: "website",
  },
};

/**
 * Inline script injected into <head> before any JS loads.
 * Reads localStorage and sets data-theme on <html> immediately,
 * preventing any Flash Of Unstyled Content (FOUC).
 */
const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('airbnb-theme-preference');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
      return;
    }
  } catch(e) {}
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* FOUC prevention — runs synchronously before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
