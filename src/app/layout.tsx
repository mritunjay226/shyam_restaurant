import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shyam Hotel & Restaurant | Luxury Stay & Fine Dining in Prayagraj",
  description: "Experience the art of hospitality at Shyam Hotel & Restaurant, Prayagraj. Luxury rooms, fine dining, artisanal cafe, and elegant banquet halls in the heart of Civil Lines.",
  keywords: [
    "Shyam Hotel",
    "Shyam Restaurant",
    "Luxury Hotel Prayagraj",
    "Fine Dining Civil Lines",
    "Banquet Halls Prayagraj",
    "Hotel near High Court Prayagraj",
    "Artisanal Cafe Prayagraj",
    "Best Restaurant in Civil Lines",
    "Hotel Booking Prayagraj",
    "Shyam Hotel & Restaurant"
  ],
  authors: [{ name: "Shyam Hotel & Restaurant" }],
  creator: "Shyam Hotel & Restaurant Team",
  publisher: "Shyam Hotel & Restaurant",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Shyam Hotel & Restaurant | Luxury Stay & Fine Dining in Prayagraj",
    description: "Discover a haven of luxury and a world of taste. 17 premium rooms, multi-cuisine restaurant, and thematic cafe in Prayagraj.",
    url: "https://shyamhotel.com",
    siteName: "Shyam Hotel & Restaurant",
    images: [
      {
        url: "https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776095845/ChatGPT_Image_Apr_13_2026_09_19_41_PM_1_1_lgr5fv.png",
        width: 1200,
        height: 630,
        alt: "Shyam Hotel & Restaurant Exterior",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shyam Hotel & Restaurant | Luxury Stay & Fine Dining in Prayagraj",
    description: "Premium accommodations and exquisite dining experience in the heart of Prayagraj.",
    images: ["https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776095845/ChatGPT_Image_Apr_13_2026_09_19_41_PM_1_1_lgr5fv.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Shyam Hotel",
  },
  
};

export const viewport: import("next").Viewport = {
  themeColor: "#3A1C1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConvexClientProvider>
          <Layout>{children}</Layout>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
