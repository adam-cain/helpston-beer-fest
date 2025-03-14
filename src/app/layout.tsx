import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Helpston Charity Beer Festival",
  description: "Join us at the Helpston Beer Festival for a day of fun, drinks, and entertainment. All proceeds go to local charities, supporting families of children with additional needs.",
  keywords: ["Helpston Beer Festival", "charity fundraiser", "beer festival", "local events", "family fun", "live music", "food stalls", "england", "cambridshire", "peterborough"],
  authors: [{ name: "Adam Cain" }],
  generator: "Next.js",
  applicationName: "Helpston Beer Festival",
  robots: "index, follow",
  creator: "Helpston Beer Festival Team",
  publisher: "Helpston Beer Festival Committee",
  metadataBase: new URL('https://helpstonbeerfestival.com'),
  openGraph: {
    title: "Helpston Charity Beer Festival",
    description: "Enjoy local beers, live music, and great food while supporting a worthy cause. Join us for a memorable day at the Helpston Beer Festival!",
    url: "https://helpstonbeerfestival.com",
    type: "website",
    images: [
      {
        url: "images/frontpage/SignOutsideFestival.jpg",
        width: 800,
        height: 600,
        alt: "Helpston Beer Festival"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Helpston Beer Festival - Charity Fundraiser for Little Miracles",
    description: "Join us for beer, music, and fun while supporting Little Miracles at the Helpston Beer Festival.",
    images: [
      {
        url: "images/frontpage/SignOutsideFestival.jpg",
        alt: "Helpston Beer Festival"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/logo/logo2.svg" type="image/svg+xml" />
      </head>      
      <body className="font-twkEverett bg-black text-white">
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
