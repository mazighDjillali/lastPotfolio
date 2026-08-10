import { Geist, Geist_Mono } from "next/font/google";
import { person, skills } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/* The site is served from a GitHub Pages sub-path, so every absolute URL in
   the metadata (canonical, OG, JSON-LD) must include it. Both come from the
   one env var the build already sets. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = `https://mazighdjillali.github.io${basePath}`;
const ogImage = `${siteUrl}/portrait.jpeg`;

const description =
  "AI & Software Engineer specializing in computer vision, monitoring pipelines, and intelligent tooling for public services. Production systems at Algérie Poste, built with Next.js, React, Python and TensorFlow.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DJILLALI Mazigh — AI & Software Engineer",
    template: "%s · DJILLALI Mazigh",
  },
  description,
  keywords: [
    "DJILLALI Mazigh",
    "AI Engineer",
    "Software Engineer",
    "Computer Vision",
    "Machine Learning",
    "Next.js developer",
    "React developer",
    "Python",
    "TensorFlow",
    "Algeria",
    "Algiers",
  ],
  authors: [{ name: person.name, url: person.github }],
  creator: person.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/`,
    siteName: "DJILLALI Mazigh — Portfolio",
    title: "DJILLALI Mazigh — AI & Software Engineer",
    description,
    locale: "en_US",
    images: [
      { url: ogImage, width: 800, height: 800, alt: `Portrait of ${person.name}` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJILLALI Mazigh — AI & Software Engineer",
    description,
    images: [ogImage],
  },
};

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

/* Person structured data — lets search engines model the page as a person,
   not just a document, which is what drives a rich name/role result. Built
   from lib/data so it can't drift from the visible content. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.headline,
  description: person.about,
  url: `${siteUrl}/`,
  image: ogImage,
  email: `mailto:${person.email}`,
  sameAs: [person.github, person.linkedin],
  knowsLanguage: person.languages,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Algiers",
    addressCountry: "DZ",
  },
  worksFor: { "@type": "Organization", name: "Algérie Poste" },
  knowsAbout: skills.flatMap((g) => g.items),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
