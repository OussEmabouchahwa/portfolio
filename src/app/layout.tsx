import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import AmbientGlow from "@/frontend/components/ui/AmbientGlow";
import CustomCursor from "@/frontend/components/ui/CustomCursor";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Oussema Bouchahwa — Software Engineer & Creative Technologist",
  description:
    "Portfolio of Oussema Bouchahwa: Software Engineering Student, Full-Stack Developer, and Creative Technologist from Sfax, Tunisia. Specializing in high-performance web applications, system architecture, data systems, and visual storytelling.",
  keywords: [
    "Oussema Bouchahwa",
    "Software Engineer",
    "Creative Technologist",
    "Full-Stack Developer",
    "Tunisia",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Data Analytics",
    "Photography"
  ],
  authors: [{ name: "Oussema Bouchahwa" }],
  openGraph: {
    title: "Oussema Bouchahwa — Software Engineer & Creative Technologist",
    description: "Bridging low-level architecture, high-level web systems, and visual storytelling.",
    type: "website",
    locale: "en_US",
    siteName: "Oussema Bouchahwa Portfolio",
    images: [
      {
        url: "/my photos/my photo.jpg",
        width: 1200,
        height: 630,
        alt: "Oussema Bouchahwa — Software Engineer & Creative Technologist"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Oussema Bouchahwa — Software Engineer & Creative Technologist",
    description: "Bridging low-level architecture, high-level web systems, and visual storytelling.",
    images: ["/my photos/my photo.jpg"]
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oussema Bouchahwa",
  jobTitle: "Software Engineer & Creative Technologist",
  image: "https://oussema-bouchahwa.dev/my%20photos/my%20photo.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sfax",
    addressCountry: "Tunisia"
  },
  knowsAbout: [
    "Software Engineering",
    "Web Development",
    "System Architecture",
    "SQL & Databases",
    "Data Analytics",
    "Photography",
    "Videography",
    "Artificial Intelligence"
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-neutral-800 selection:text-white">
        <div className="grain-overlay" />
        <AmbientGlow />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
