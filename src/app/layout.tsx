import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SkipLink from "@/components/accessibility/SkipLink";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Hyuu | Software Engineer & Vibe Coder",
  description: "Portfolio of Hyuu, a System Architect and Bot Creator building high-performance web applications with Next.js and AI.",
  keywords: ["Software Engineer", "Next.js", "React", "Portfolio", "Vibe Coder", "Backend Developer"],
  authors: [{ name: "Hyuu" }],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Hyuu | Software Engineer & Vibe Coder",
    description: "Portfolio of Hyuu, a Systems Architect and Bot Creator building high-performance web applications with Next.js and AI.",
    url: "https://hyuu.tech",
    siteName: "Hyuu's Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 630,
        alt: "Hyuu - Software Engineer & Vibe Coder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyuu | Software Engineer & Vibe Coder",
    description: "Portfolio of Hyuu, a Systems Architect and Bot Creator building high-performance web applications with Next.js and AI.",
    images: ["/avatar.png"],
  },
  metadataBase: new URL("https://hyuu.tech"),
  alternates: {
    canonical: "https://hyuu.tech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#09090b',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-zinc-950 text-zinc-100`}
      >
        <SkipLink />
        
        {/* Premium Noise Texture - Optimized */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.02] z-50" 
          aria-hidden="true"
        >
          <div 
            className="absolute inset-0 bg-repeat" 
            style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" /%3E%3CfeColorMatrix type=\"saturate\" values=\"0\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"1\"/%3E%3C/svg%3E')"
            }}
          />
        </div>
        
        {children}
        <Toaster />
      </body>
    </html>
  );
}
