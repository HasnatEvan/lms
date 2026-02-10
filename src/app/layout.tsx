import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import "plyr/dist/plyr.css";
import Providers from "@/components/Providers";
import { getWebsiteContent } from "@/lib/website-content";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await getWebsiteContent();
    const title = content?.metaTitle?.trim() || "CodeZyne - Online Learning Platform";
    const faviconUrl = content?.branding?.faviconUrl?.trim();

    return {
      title,
      description: "Online learning platform",
      icons: faviconUrl
        ? {
            icon: faviconUrl,
            shortcut: faviconUrl,
            apple: faviconUrl,
          }
        : undefined,
    };
  } catch {
    return {
      title: "CodeZyne - Online Learning Platform",
      description: "Online learning platform",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansBengali.variable} antialiased`}
      >
          <Providers>
          {children}


          </Providers>
      </body>
    </html>
  );
}
