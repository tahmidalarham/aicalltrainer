import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "./components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Cold Calling Trainer",
  description:
    "AI-powered cold calling training platform with realistic role-play simulations and actionable feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    {
      href: "/platform",
      label: "Platform",
      dropdown: [
        {
          href: "/platform/adaptive-simulation-engine",
          label: "Adaptive Simulation Engine",
          description: "Live-fire voice training with AI buyers that react to your tone and confidence.",
        },
        {
          href: "/platform/conversation-intelligence",
          label: "Conversation Intelligence",
          description: "Visualized call analytics that pinpoint exactly why you won or lost the lead.",
        },
        {
          href: "/platform/revenue-readiness-lab",
          label: "Revenue Readiness Lab",
          description: "Data-driven performance tracking to prove you’re ready for high-value prospects.",
        },
      ],
    },
    { href: "/solutions", label: "Solutions",
      dropdown: [{href: "/solutions/rapid-onboarding",
        label: "Rapid Onboarding",
        description: "Cut ramp-up time by training new hires in a safe, high-intensity environment.",},
        {href: "/solutions/lead-protection",
          label: "Lead Protection",
          description: "Stop burning expensive prospects by mastering the pitch before you go live.",},
          {href: "/solutions/performance-scaling",
            label: "Performance Scaling",
            description: "Turn middle-of-the-pack callers into top closers with objective, data-driven coaching.",},
      ],
    },
    { href: "/pricing", label: "Pricing" },
    { href: "/sign-in", label: "Sign in" },
  ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-black">
        <SiteHeader navItems={navItems} />
        {children}
      </body>
    </html>
  );
}